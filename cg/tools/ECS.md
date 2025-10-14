# ECS(Entity-Component-System)
在编程思想上有两大类
- DOP(data-oriented programming，面向数据编程，数据导向编程)
    - 强调数据布局和访问模式，以提高计算性能
        - 数据优先，缓存友好，低耦合，并行友好等
- OOP(object-oriented programming，面向对象编程)
    - 以万物为对象，提供了一种相对自然的方式来模拟现实世界的事物，封装，继承，多态
        - 比较容易理解，上手比较容易

ECS就是从DOP发展而来的一套框架，最流行的游戏开发套件Unity，Unreal Engine等都已经内置了。

## 概念
ECS将游戏对象的状态和行为分离成独立的组件，并通过系统来处理这些组件，从而实现高效的管理和扩展。

### 实体Entity

是一个唯一标识符，表示游戏中的一个对象，实体不包含任何数据和行为，它只是一个容器，关联多个组件。

Tips: 实体的创建和销毁必须延迟到所有系统system更新结束后的帧末执行。
### 组件Component

是数据的载体，包含与实体相关的属性与状态，每个组件只负责存储特定的数据，不包含任何行为或逻辑。

Tips: 字段属性尽量紧凑，连续存储，避免指针等，一切为了提高命中率、减少内存访问延迟和同步开销；
组件应当区分是属于实体entity还是系统system的。组件的添加、删除等必须延迟到所有系统更新结束后的帧末执行。
### 系统System

是包含行为和逻辑的部分，负责处理与特定的组件关联的操作，包含更新逻辑。
系统遍历所有包含特定组件的实体，即访问实体，对字体中的特定组件执行操作。

Tips: 系统system之间通过Pipeline等机制来严格控制执行顺序，系统system尽量是纯函数，没有属性与状态。
系统system通过Query和原型Archetype来查询和操作关心的entity的component。多个系统system的公共函数做成静态函数，
称为工具Utility函数。

### 存储storage

是ecs架构中用于管理组件数据的存储机制，不同存储策略影响系统的性能与内存使用。
- 原型Archetype块存储，将相同组件集合的实体组存储在同一块内存中，适合高内存布局和高效批处理的场景。
- 数组存储，适用组件数量较少且访问频繁的
- 稀疏数组，适用组件数量多且分布稀疏
- 结构化存储，减少内存碎片和访问延迟
- 压缩存储，适用内存受限的场景

#### 原型Archetype

#### 块Chunk

### 查询Query
利用组件的存储结构、明确的查询条件，实现了对特定类型的实体和组件的高效查询。


## [EnTT](https://github.com/skypjack/entt)

Gaming meets modern C++ - a fast and reliable entity component system (ECS) and much more

EnTT is a header-only, tiny and easy to use library for game programming and much more written in modern C++.

### [Entt Dino](https://github.com/omgitsaheadcrab/entt_dino)

EnTT Dino is a clone of the Dinosaur Game built using only SDL2 and the EnTT entity component system library.

## web

- [Building an ECS in TypeScript 文章](https://maxwellforbes.com/posts/typescript-ecs-implementation/)
- [sim-ecs Batteries included TypeScript ECS](https://github.com/NSSTC/sim-ecs)
- [@jakeklassen/ecs TypeScript entity component system. ](https://github.com/jakeklassen/ecs)

- ['Overwatch' Gameplay Architecture and Netcode 守望先锋的游戏架构和网络代码](https://gdcvault.com/play/1024001/-Overwatch-Gameplay-Architecture-and)
    - [A clean, simple, c++14, Entity Component System like Overwatch ECS architecture](https://github.com/OttoX/Fomalhaut)