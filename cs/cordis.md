## [Cordis内核](https://deepseek-harness.github.io/deepseek-harness/reference/cordis-primer)

[github Cordis](https://github.com/cordiverse/cordis)内核只负责插件的加载、卸载和依赖关系 [dsh plugin](https://awesome-dsh-plugin.com/)

<details>
<summary>cordis论文</summary>

[论文仓库github A Programming Paradigm for Spatiotemporal Composability ](https://github.com/cordiverse/paper)

传统软件的组件都是static，都是编译好的，比如静态语言C++和C，这也是我最早接触的一套很优秀的游戏架构代码，那时还以卖代码为事业的时代。
在现代AI agent中需要动态，时间可组合性与空间可组合性。

**关于这个想法，特别是我从静态语言进入动态语言后，就很想做的一件事情，但是没有思路，而这篇论文是在解决这个思路下的问题，给出了实践的具体方案，就像我心中的念头一直是用C++静态语言开发一个框架，用lua动态语言来控制，但是一直不知道做什么，而agent天然是这方面的需求方，给出了不同的人需要不同的定制化需求。而不同行业的人也带来了不同的组合。真正印证了时间与空间的组合。**

</details>

<details>
<summary>源码</summary>

Cordis 的源码抽象逻辑，核心可以归纳为**一个统一上下文、两个运行时机制、五种事件模式、一个生命周期状态机**。这套设计来自其论文《A Programming Paradigm for Spatiotemporal Composability》。

## Context

`Context` 是 Cordis 的根抽象，它同时承担两个角色：

### 服务仓库

所有服务（如 `ctx.tools`、`ctx.llm`）都挂载在 Context 上。插件通过键查找服务，而不是 `import` 具体实现。读取一个未绑定的名字时，Context 的代理会沿着父链向上查找，最终通过 `ReflectService` 解析服务。

### 树节点

每个插件挂载后拥有自己的子 Context，父 Context 卸载时，整棵子树跟着卸载。这保证了作用域的隔离与传播。

## Effect 与 Coeffect

这是 Cordis 最核心的抽象创新，把类型理论中的 Effect/Coeffect 提升为了运行时机制。

### Effect

（可逆效果）—— 解决“时间可组合性”

插件对 Context 的每一次修改（注册服务、监听事件、创建资源）都被视为一个 Effect。关键不在于记录它做了什么，而在于**同时记录它的逆操作**。

源码中，`ctx.effect(execute)` 会立即执行 `execute`，并收集它返回的 **disposers**（清理函数）。这些 disposers 被存入当前 Fiber 的 `_disposables` 列表中。当 Fiber 卸载时，disposers 按**注册顺序的逆序**依次执行，精确恢复插件加载前的状态。Cordis-rs 的实现也遵循同样原则：效果是 single-shot 且由 fiber 拥有的，卸载时逆序运行。

这解决了插件系统最根本的难题：卸载时监听器还在响、定时器还在跑、资源泄漏。

### Coeffect

（响应式共效）—— 解决“空间可组合性”

插件的 `inject` 声明就是它的 Coeffect 规格：它需要哪些服务才能工作。

Cordis 为每个 Fiber 维护一个 **epoch**，本质是它所依赖的服务提供者 uid 的摘要。当某个服务被 `provide` 或卸载时，`ReflectService.notify` 会重新检查所有依赖该服务的 Fiber，重新计算它们的 epoch。如果 epoch 变了，就触发 `_reload`（激活）或 `_unload`（失活）；如果没变，则保持“中立”状态。这是论文中 Definition 26 的运行时实现。

## 五种事件分发模式：插件间通信的契约

插件之间不直接调用，而是通过**类型化事件**通信。事件的分发模式是公开契约的一部分，通过 `@mode` 标签记录。

| 模式 | 是否 await | 是否有返回值 | 语义 |
| :--- | :--- | :--- | :--- |
| `emit` | 否 | 否 | 按序观察，发完就走 |
| `waterfall` | 否 | 是 | 环绕中间件：每个监听器可变换、包裹或短路链 |
| `parallel` | 是 | 否 | 所有监听器并行执行 |
| `serial` | 是 | 是 | 按序执行，遇 bail 值停止 |
| `bail` | 否 | 是 | 同步按序，遇非空返回值立即短路 |

`bail` 的判定逻辑是：返回值不为 `null`、`false` 或 `undefined` 时，该值成为最终结果，后续监听器不再执行。`waterfall` 则更特殊：监听器签名包含 `next`，调用 `next()` 将控制权交给下一个监听器，不调用则短路整条链。

## 一个生命周期状态机：Fiber 驱动一切

插件在 Cordis 中表现为一个 **Fiber**，它有一个显式的状态机：

```
PENDING → LOADING → ACTIVE
                  ↘ FAILED
ACTIVE → UNLOADING → PENDING（依赖再次就绪则重装）
                  ↘ DISPOSED
```

关键转换由 epoch 驱动：**依赖到齐** → `_reload()` → ACTIVE；**依赖消失** → `_unload()` → PENDING。每次 `_unload()` 都保证逆序解开该实例的全部 Effect，然后释放 Fiber。这就是“时间维”与“空间维”在同一个状态机里的交汇点。

### 整体抽象逻辑的串联

把这些机制串起来看，Cordis 的运行链路是：

1.  **加载**：一个插件（Fiber）带着 `inject` 声明（Coeffect 规格）进入 PENDING。
2.  **解析**：Context 沿父链查找所需服务，epoch 计算后判断是否满足。
3.  **激活**：满足则 `apply(ctx)` 执行，所有注册行为通过 `ctx.effect()` 被记录，Fiber 进入 ACTIVE。
4.  **通信**：插件间通过五种模式的事件交换信息，事件监听本身也是 Effect。
5.  **失活**：依赖消失或显式卸载时，`_unload()` 逆序执行所有 disposers，Fiber 回到 PENDING 或 DISPOSED。

这套抽象让 Cordis 具备了**热插拔的数学保证**：每个组件的 Effect 完全可逆，依赖变化自动驱动激活与失活，插件之间通过事件声明式协作，互不干扰。

</details>