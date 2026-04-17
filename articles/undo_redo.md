# [Implementing an Undo/Redo System in a Complex Visual Application](https://mlacast.com/projects/undo-redo)

[作者的开发文章](https://mlacast.com/dev)上有很多可借鉴和思考的地方。

网页免费使用的Alkemion Studio富文本编辑器的人员写的文章

- every undoable action also doubles as a structured autosave event--making reliability event more critical.
- Undo/redo must be intuitive and context-aware. Users should not be allowed to undo something they can't see
- users shouldn't be able to undo something they can't see
- 构建一个用户可见的上下文，更改一处，其他处就需要事件来通知做出对应的更新，传统的做法依赖单个堆栈，但在多上下文中，切换上下文时，会影响看不见的部分，导致迷惑或错误

## Action
抽象对象
```ts
abstract class Action {
  private _id: string;
  private _globalIndex: number;
  private _isPushPrevented: boolean;  
  protected abstract _name: ActionName;
  protected abstract _historyName: ActionHistoryName;
  protected _savePayload: ISavePayload = {
    saveItems: [],
  };
  // ...additional properties for specific implementations... //
  
  protected constructor(
    settings: ActionGenericSettingsAbstract,
    options?: IActionOptions
  ) {
    this._id = settings.id;
    this._globalIndex = settings.globalIndex;
    this._isPushPrevented = settings.preventPush;

    // ...additional setup for specific implementations... //
  }
  
  // ---------- GETTERS ---------- //
  
  public get id(): string {
    return this._id;
  }

  public get globalIndex(): number {
    return this._globalIndex;
  }

  public get isPushPrevented(): boolean {
    return this._isPushPrevented;
  }

  public get name(): ActionName {
    return this._name;
  }

  public get historyName(): string {
    return this._historyName;
  }
  
  // ---------- SETTERS ---------- //

  public set globalIndex(newIndex: number) {
    this._globalIndex = newIndex;
  }

  public setPayLoad(payload: ISavePayload): void {
    this._savePayload = payload;
    
    // ...additional save-specific processing... //
  }
  
  // ---------- METHODS ---------- //

  public abstract undo(...args: any[]): Promise<any>;

  public abstract redo(...args: any[]): Promise<any>;
  
  // ...additional methods for specific implementations... //
}
```
作者在系统的实现中，还区分了两类命令ActionSingle和ActionGroup
```ts
export abstract class ActionSingle extends Action {
  constructor(
    settings: ActionGenericSettingsAbstract,
    options?: IActionOptions
  ) {
    super(settings, options);

    this.undo = this.wrapWithSaveRequirement(this.undo);
    this.redo = this.wrapWithSaveRequirement(this.redo);
  }

  // -------- METHODS -------- //

	// This function is a higher order function
	// to trigger auto-save whenever an action
	// is instantiated or undone/redone
  private wrapWithSaveRequirement(
    method: (...args: any[]) => any
  ): (...args: any[]) => any {
    return async (...args: any[]) => {
      const result = await method.apply(this, args);

      // ...additional processing to trigger auto-save
      // when instantiated/undone/redone...

      return result;
    };
  }
}
  
abstract class ActionGroup extends Action {
  private _actions: ActionSingle[] = [];

  constructor(
    actionGenericSettings: ActionGenericSettingsAbstract,
    actions: ActionSingle[]
  ) {
    super(actionGenericSettings);
    this._actions = actions;
  }

  // ---------- GETTERS ---------- //

  public get actions(): ActionSingle[] {
    return this._actions;
  }

  // ---------- METHODS ---------- //

  public async undo(): Promise<void> {
    for (const action of this._actions) {
      await action.undo();
    }
  }

  public async redo(): Promise<void> {
    for (const action of this._actions) {
      await action.redo();
    }
  }
}
```
所有其他命令必须继承这两个命令之一，这样同一了接口，把单个或多个的接口都统一成一致的，调用时就会无感。
在设计上，可继续严格限制
- 全局的使用ActionSingle，
- 非全局的，全部继承ActionGroup
这样的架构设计非常灵活，不存储全局的应用状态，近存储它之间的和特定的数据，在action中wrapWithSaveRequirement很容易实现side-effect处理
这种封装的细粒度实现支持了很好undo/redo授权控制，清晰的分离关注点，和更容易的测试

## Action Instantiation and Storage

在命令实例化后，需要central hub来管理它们。单例实例化模式是很好的实现，避免重复的命令，命名为ActionStore，它是state management store，
- handle global operation，管理全局操作
- register 注册
- storage 存储
- trigger 触发器
- dispose 清理

ActionStore管理的Action分类形成一个Volumnes-term,就是相同的Action在一个Volume中，多个Volume形成了一个container，这样需要两套容器
- Done Actions 管理执行完成的action
- Undo Actions 管理可撤销的action
为了关注分离和授权的实现，也是context中的内容组成部分，作者的编辑器逻辑如下
```ts
type ActionContext =
  | 'LOBBY'
  | 'BOARD'
  | 'PAGE_EDITOR'
  | 'NODE_TABLE'
  | 'BOARD_AND_PAGE_EDITOR'
  | 'CONTAINER'
  | 'LIBRARY';

get context(): ActionContext {
	// ...additional code to get data for the following conditions... //

    if (this._loadedContainer.id !== 'host') {
      return 'CONTAINER';
    } else if (router.currentRoute.path === '/lobby') {
      return 'LOBBY';
    } else if (editorWindow && editorWindow.isFullscreen) {
      return 'PAGE_EDITOR';
    } else if (editorWindow && !editorWindow.isFullscreen) {
      return 'BOARD_AND_PAGE_EDITOR';
    } else if (nodeTableWindow && nodeTableWindow.isFullscreen) {
      return 'NODE_TABLE';
    } else if (nodeTableWindow && !nodeTableWindow.isFullscreen) {
      return 'BOARD_AND_PAGE_EDITOR';
    } else {
      return 'BOARD';
    }
}
```
继续业务层面的区分，这里把每个UI区域的事件分类打包成一个全局值
```ts
const BOARD: ActionName[] = [
  'MOVE_TOKEN',
  'RESIZE_TOKEN',
  'ADD_NODE',
  // ... //
  'SET_NLT_DIRECTION_SYNC',
  'EDIT_NLT_LABEL',
];

const PAGE_EDITOR: ActionName[] = [
  'SET_NODE_FEATURED_IMAGE',
  'SET_GROUP_FEATURED_IMAGE',
	// ... //
  'ROLL_ALL_NODE_RANDOM_TABLE',
  'IMPORT_COMPONENT_TEMPLATE',
];

const NODE_TABLE: ActionName[] = [
  'SET_NODE_FEATURED_IMAGE',
  'SET_GROUP_FEATURED_IMAGE',
	// ... //
  'ROLL_ALL_NODE_RANDOM_TABLE',
  'IMPORT_COMPONENT_TEMPLATE',
];

const allowedActionsPerContext: Readonly<{
  [key in ActionContext]: Readonly<ActionName[]>;
}> = {
  LOBBY: [],
  BOARD,
  PAGE_EDITOR,
  NODE_TABLE,
  BOARD_AND_PAGE_EDITOR: _.uniq([...BOARD, ...PAGE_EDITOR]),
  CONTAINER: [],
  LIBRARY: [],
};
```
由上面的分类去获取对应的action，拿到对应可以支持的action后，用globalIndex来排序，这个是重要的，对那些改先执行后执行是非常重要的保障，也会提现在
UI层来，数据更新后的变化应该是一个对用户来说，是很丝滑的变化，
```ts
private _actions = newVolume(); // init done actions
private _undoneActions = newVolume(); // init undone actions

get undoableActions() {
  const result: StructStack<Action> = new StructStack<Action>();
	
  const buffer: Action[] = [];

  for (const actionName in this._actions) {
    if (allowedActionsPerContext[context].includes(actionName as ActionName)) {
      const arr = this._actions[actionName as ActionName];
      buffer.push(...arr);
    }
  }

  buffer.sort((a, b) => a.globalIndex - b.globalIndex);

  for (const action of buffer) {
    result.push(action);
  }

  return result;
}

get redoableActions() {
    const result: StructStack<Action> = new StructStack<Action>();

    const buffer: Action[] = [];

    for (const actionName in this._undoneActions) {
      if (allowedActionsPerContext[context].includes(actionName as ActionName)) {
        const arr = this._undoneActions[actionName as ActionName];
        buffer.push(...arr);
      }
    }

    buffer.sort((a, b) => b.globalIndex - a.globalIndex);

    for (const action of buffer) {
      result.push(action);
    }

    return result;
}

newVolume(): ActionVolume {
	const ACTION_NAMES = [
		'MOVE_TOKEN',
	  'RESIZE_TOKEN',
	  // ... //
	] as const;

  const result: ActionVolume = {} as ActionVolume;

  for (const actionName of ACTION_NAMES) {
    result[actionName] = [];
  }

  return result;
}
```

## Triggering Undo/Redo

- instantiated an Action and stored in the undoeActions volume in ActionStore singleton
- when ctrl+Z trigger, ActionStore handle the event
```ts
class ActionStore {
    undoLastAction() {}
    redNextAction() {}
}
```
- when undo event trigger, call undoLastAction 
    - check the current context
    - make sure no global prevent undo operation
    - call the last authorized action in the undoableActions stack and call its undo
    - when doned, move action from done action volume to undone action volume, 这是很有挑战的一步，跟踪并保持正确的索引
- do event trigger, is the opposite direction

## Containers and Isolation

```ts
```
```ts
```
```ts
```
```ts
```