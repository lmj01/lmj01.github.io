用户角色平权限的通用设计

# Role Base Access Control

基于角色访问控制，指role关联user，role关联permission的方式间接赋予user的permission。

这样管理只需要对角色role赋予权限permission，不用担心user的permission

## RBAC0
最简单的用户、角色、权限模型
- user和role是多对一关系，即一个user只有一种role，一种role可以拥有多个user
- user和role是多对多关系，即一个user同时拥有多种role，一种role可以有多个user

## RBAC1
相比RBAC0，增加子角色，引入继承概念，即子角色可以继承父角色的所有权限

## RBAC2
基于RBAC0，增加了对角色的一些限制

- 角色互斥，同一user不能分配到一组互斥角色集合中的多个角色，
- 基数约束，角色数量有限
- 先决条件角色，要想获得更高的权限，必须先拥有低一级的权限，如先拥有副经理的权限才能拥有经理的权限
- 运行时互斥，允许一个用户多个角色，但不能同时激活两个角色

## RBAC3
称为统一模型，包含了RBAC1和RBAC2，综合了RBAC0，RBAC1，RBAC2的所有特点

## 权限
大致分成三类
- 入口权限，就是可以看到否
- 操作权限，就是可以操作不
- 数据权限，那些数据可查看或操作

实现方法有多种
- 可增加组织层级划分来实现
- 可增加用户组来实现