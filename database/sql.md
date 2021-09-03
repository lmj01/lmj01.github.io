# SQL

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
