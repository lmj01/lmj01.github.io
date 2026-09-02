# Database

## 开源的数据库
- mysql
- [OceanBase](https://github.com/oceanbase/oceanbase)

## 事务
ACID属性
- 原子性Atomicity
- 一致性Consistency
- 隔离性Isolation
- 持久性Durability

<details>
<summary> 工具</summary>

- [Provides easy browsing of tables, variables, functions and configuration settings.](https://www.timestored.com/qstudio/)
- [HeidiSQL is free software, and has the aim to be easy to learn. "Heidi" lets you see and edit data and structures from computers running one of the database systems MariaDB, MySQL, Microsoft SQL, PostgreSQL and SQLite.](https://www.heidisql.com/)
- [Database manager for MySQL, PostgreSQL, SQL Server, MongoDB, SQLite and others. Runs under Windows, Linux, Mac or as web application ](https://github.com/dbgate/dbgate)


##  [DBX](https://dbxio.com/cn)

[github](https://github.com/t8y2/dbx) [可以下载最新的，window有portable版本](https://github.com/t8y2/dbx/releases)

20 MB lightweight cross-platform database client for 90+ databases, including MySQL, PostgreSQL, SQLite, Redis, MongoDB, DuckDB, SQL Server, and Dameng. Built-in AI, MCP Server, CLI, desktop and Docker. | 轻量级跨平台数据库管理工具，支持 MySQL、PostgreSQL、SQLite、Redis、MongoDB、达梦等 90+ 数据库，提供桌面端、Docker、CLI、内置 AI 助手和 MCP Server。

</details>

<details>
<summary> 实践性</summary>

## How to store password in DB

store 

client provide password, server provide salt, composite new string(password+salt), map to a hash(password+salt), 
store in db table salt, hash(password+salt)

test-valid

client provide inPassowrd, server read salt and hash(password+salt), check hash(inPassword+salt) is equal hash(password+salt)

这样数据库不存储用户密码明文，避免泄露数据造成破坏性问题。

</details>