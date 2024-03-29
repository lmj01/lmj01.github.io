# SQL
> 演变:从数据库中获取数据,SQL(Structured Query Language)是一句句查询处理的==>批处理sql语句==>存储过程的产生SP(Stored Procedure),解释一次,重复执行==>随着面向对象的普及产生ORM(Object Relational Mapping), 数据库的选择参考因素:开发速度,运行性能,可维护性

## 执行顺序
SQL语言与其他语言区别最明显的特征是执行的顺序

1. FROM <left_table>
2. <join_type> JOIN <right_table>
3. on <join_condition>
4. where <where_condition>
5. group by <group_by_list>
6. with { cube | rollup }
7. having <having_condition>
8. select
9. distinct
10. order by <order_by_list>
以上每个步骤在查询中没有对应的语句会自动跳过， 每个步骤会产生一个虚拟表，该虚拟表被用作下一个步骤的输入，这些虚拟表只有最后一步生成的表才会返回给调用者，其他虚拟表对外部调用sql来说都不可见

但SQL不是对所有数据和逻辑都适合，SQL缺乏离散型，导致集合化不彻底，有序运算困难，根本的困难是来源于其理论基础，关系代数。

## 关联查询
是所有SQL的瓶颈，特别是多表多字段的业务逻辑查询


