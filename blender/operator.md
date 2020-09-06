# 操作类型

在splash中有一个函数WM_operator_name_call，全局搜索它， 在intern/wm_event_system.c中实现了它

```c
int WM_operator_name_call(bContext *C, const char *opstring, short context, PointerRNA *properties)
{
  wmOperatorType *ot = WM_operatortype_find(opstring, 0);
  if (ot) {
    return WM_operator_name_call_ptr(C, ot, context, properties);
  }

  return 0;
}
```

对splash重要的是两个参数WM_OT_splash和WM_OP_INVOKE_DEFAULT， 字符串转换为内部的类型，在文件WM_types.h中

```c
typedef struct wmOperatorType {
  /** Text for UI, undo. */
  const char *name;
  /** Unique identifier. */
  const char *idname;
  const char *translation_context;
  /** Use for tool-tips and Python docs. */
  const char *description;
  /** Identifier to group operators together. */
  const char *undo_group;

  /**
   * This callback executes the operator without any interactive input,
   * parameters may be provided through operator properties. cannot use
   * any interface code or input device state.
   * See defines below for return values.
   */
  int (*exec)(struct bContext *, struct wmOperator *) ATTR_WARN_UNUSED_RESULT;

  /**
   * This callback executes on a running operator whenever as property
   * is changed. It can correct its own properties or report errors for
   * invalid settings in exceptional cases.
   * Boolean return value, True denotes a change has been made and to redraw.
   */
  bool (*check)(struct bContext *, struct wmOperator *);

  /**
   * For modal temporary operators, initially invoke is called. then
   * any further events are handled in modal. if the operation is
   * canceled due to some external reason, cancel is called
   * See defines below for return values.
   */
  int (*invoke)(struct bContext *,
                struct wmOperator *,
                const struct wmEvent *) ATTR_WARN_UNUSED_RESULT;

  /**
   * Called when a modal operator is canceled (not used often).
   * Internal cleanup can be done here if needed.
   */
  void (*cancel)(struct bContext *, struct wmOperator *);

  /**
   * Modal is used for operators which continuously run, eg:
   * fly mode, knife tool, circle select are all examples of modal operators.
   * Modal operators can handle events which would normally access other operators,
   * they keep running until they don't return `OPERATOR_RUNNING_MODAL`.
   */
  int (*modal)(struct bContext *,
               struct wmOperator *,
               const struct wmEvent *) ATTR_WARN_UNUSED_RESULT;

  /**
   * Verify if the operator can be executed in the current context, note
   * that the operator might still fail to execute even if this return true.
   */
  bool (*poll)(struct bContext *) ATTR_WARN_UNUSED_RESULT;

  /**
   * Use to check if properties should be displayed in auto-generated UI.
   * Use 'check' callback to enforce refreshing.
   */
  bool (*poll_property)(const struct bContext *C,
                        struct wmOperator *op,
                        const PropertyRNA *prop) ATTR_WARN_UNUSED_RESULT;

  /** Optional panel for redo and repeat, auto-generated if not set. */
  void (*ui)(struct bContext *, struct wmOperator *);

  /**
   * Return a different name to use in the user interface, based on property values.
   * The returned string does not need to be freed.
   */
  const char *(*get_name)(struct wmOperatorType *, struct PointerRNA *);

  /**
   * Return a different description to use in the user interface, based on property values.
   * The returned string must be freed by the caller, unless NULL.
   */
  char *(*get_description)(struct bContext *C, struct wmOperatorType *, struct PointerRNA *);

  /** rna for properties */
  struct StructRNA *srna;

  /** previous settings - for initializing on re-use */
  struct IDProperty *last_properties;

  /**
   * Default rna property to use for generic invoke functions.
   * menus, enum search... etc. Example: Enum 'type' for a Delete menu.
   *
   * When assigned a string/number property,
   * immediately edit the value when used in a popup. see: #UI_BUT_ACTIVATE_ON_INIT.
   */
  PropertyRNA *prop;

  /** struct wmOperatorTypeMacro */
  ListBase macro;

  /** pointer to modal keymap, do not free! */
  struct wmKeyMap *modalkeymap;

  /** python needs the operator type as well */
  bool (*pyop_poll)(struct bContext *, struct wmOperatorType *ot) ATTR_WARN_UNUSED_RESULT;

  /** RNA integration */
  ExtensionRNA ext;

  /** Flag last for padding */
  short flag;

} wmOperatorType;
/**
 * Context to call operator in for #WM_operator_name_call.
 * rna_ui.c contains EnumPropertyItem's of these, keep in sync.
 */
enum {
  /* if there's invoke, call it, otherwise exec */
  WM_OP_INVOKE_DEFAULT,
  WM_OP_INVOKE_REGION_WIN,
  WM_OP_INVOKE_REGION_CHANNELS,
  WM_OP_INVOKE_REGION_PREVIEW,
  WM_OP_INVOKE_AREA,
  WM_OP_INVOKE_SCREEN,
  /* only call exec */
  WM_OP_EXEC_DEFAULT,
  WM_OP_EXEC_REGION_WIN,
  WM_OP_EXEC_REGION_CHANNELS,
  WM_OP_EXEC_REGION_PREVIEW,
  WM_OP_EXEC_AREA,
  WM_OP_EXEC_SCREEN,
};
```

上面看到分为两类的类型INVOKE和EXEC，它们分别对应着invoke和exec函数指针，区别与是否有交互的需求，没有交互的直接exec，其他的都是invoke。只有operatortype为exec时才能被录制为宏。 事件是通过函数参数来完成的，

- exec，回调流程init,apply, exit
- invoke, 回调流程init, apply
- modal&cancel, 回到流程 apply, exit


在intern/wm_init_exit.c中wm_operatortypes_init引入了ghash概念，所有的operator都挂载在一个ghash对象上

```c
/* called on initialize WM_init() */
void wm_operatortype_init(void)
{
  /* reserve size is set based on blender default setup */
  global_ops_hash = BLI_ghash_str_new_ex("wm_operatortype_init gh", 2048);
}
```

wm_operatortypes_register默认注册了一大推的operator， 其中就有WM_OT_splash. 可以看到这些OT的类别基本都是操作的常规操作， 把UI层的操作都分成大类。

其他的暂时还是不涉及，还是从splash入手分析，因为它很短，逻辑很清晰。

回到函数WM_operatortype_find入手

## wm_operator_type.c

```c
/* all ops in 1 list (for time being... needs evaluation later) */
void WM_operatortype_append(void (*opfunc)(wmOperatorType *))
{
  wmOperatorType *ot = wm_operatortype_append__begin();
  opfunc(ot);
  wm_operatortype_append__end(ot);
} 
```

每个operatortype都是一个通类型的函数指针，有一对函数wm_operatortype_append__begin和wm_operatortype_append__end来增加一个operatortype对象。

```c
/** \name Operator Type Append
 * \{ */

static wmOperatorType *wm_operatortype_append__begin(void)
{
  wmOperatorType *ot = MEM_callocN(sizeof(wmOperatorType), "operatortype");

  BLI_assert(ot_prop_basic_count == -1);

  ot->srna = RNA_def_struct_ptr(&BLENDER_RNA, "", &RNA_OperatorProperties);
  RNA_def_struct_property_tags(ot->srna, rna_enum_operator_property_tags);
  /* Set the default i18n context now, so that opfunc can redefine it if needed! */
  RNA_def_struct_translation_context(ot->srna, BLT_I18NCONTEXT_OPERATOR_DEFAULT);
  ot->translation_context = BLT_I18NCONTEXT_OPERATOR_DEFAULT;

  return ot;
}
static void wm_operatortype_append__end(wmOperatorType *ot)
{
  if (ot->name == NULL) {
    CLOG_ERROR(WM_LOG_OPERATORS, "Operator '%s' has no name property", ot->idname);
  }
  BLI_assert((ot->description == NULL) || (ot->description[0]));

  /* Allow calling _begin without _end in operatortype creation. */
  WM_operatortype_props_advanced_end(ot);

  /* XXX All ops should have a description but for now allow them not to. */
  RNA_def_struct_ui_text(
      ot->srna, ot->name, ot->description ? ot->description : UNDOCUMENTED_OPERATOR_TIP);
  RNA_def_struct_identifier(&BLENDER_RNA, ot->srna, ot->idname);

  BLI_ghash_insert(global_ops_hash, (void *)ot->idname, ot);
}
```

通过上面的代码可以看到一个operatortype主要的是与RNA绑定数据，都是显示的数据，还有很多部分都是函数指针，那些只有关联具体的operatortype时才设置的函数指针，最后插入ghash中。

全局搜索WM_operatortype_append在c源码中调用的地方，大致分三部分

- windowmanager moudle, 默认的，通过窗体表现的operatortype
- editors module， 编辑中定义的特定operatortype
- python moudle， 向外提供特定的operatortype的接口

跟踪splash来，主要的是有两个参数invoke和poll函数指针，先搜关键字invoke吧，只在intern/wm_operatorXXX.c这几个文件中找就可以了。

上面只说了operatortype，外层就是wmOperator，而它的定义在source/blender/makesdna/DNA_windowmanager_types.h中定义了
```c
/**
 * This one is the operator itself, stored in files for macros etc.
 * operator + operator-type should be able to redo entirely, but for different context's.
 */
typedef struct wmOperator {
  struct wmOperator *next, *prev;

  /* saved */
  /** Used to retrieve type pointer. */
  char idname[64];
  /** Saved, user-settable properties. */
  IDProperty *properties;

  /* runtime */
  /** Operator type definition from idname. */
  struct wmOperatorType *type;
  /** Custom storage, only while operator runs. */
  void *customdata;
  /** Python stores the class instance here. */
  void *py_instance;

  /** Rna pointer to access properties. */
  struct PointerRNA *ptr;
  /** Errors and warnings storage. */
  struct ReportList *reports;

  /** List of operators, can be a tree. */
  ListBase macro;
  /** Current running macro, not saved. */
  struct wmOperator *opm;
  /** Runtime for drawing. */
  struct uiLayout *layout;
  short flag;
  char _pad[6];
} wmOperator;
```

为什么wmOperator会定义在DNA中，这就是blender的核心了，它存储的.blend文件格式中需要这些吗？这些都是后话了，等深入后再去分析了。

现在搜索关键字**type->invoke**， 其他的部分暂时不管，只关心一个，就是**wm_operator_invoke**

## wm_event_system.c

在splash中WM_operator_name_call是调用splash的入口，深入后就是wm_operator_call_internal，而它是根据operatortype与window，ARegion，SrcArea的关系，可不管怎么还是会调用wm_operator_invoke

这样一路调用函数下来就是splash显示出来的逻辑了。具体的细节就要深挖了，目前就分析splash到这里就够了。后面有需要再深入吧。

