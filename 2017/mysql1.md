**视图**
* 视图的作用
	 * 重用sql语句
	 * 简化sql操作
	 * 使用表的组成部分而不是整个表
	 * 保护数据，可以授予用户表特定部分的访问权限
	 * 更改数据格式和表示
* 视图本身不包含数据，返回的数据是从其它表中检索出来的。创建视图后，可以把视图作为普通的表使用
* 视图的操作
	 * 创建：CREATE VIEW
	 * 查看：SHOW CREATE VIEW viewName
	 * 删除：DROP VIEW viewName
> CREATE VIEW test_test1 AS SELECT name, title FROM test, test1 WHERE test.id = test1.id;
> SELECT * FROM test_test1;
* 视图是可以更新的，但是一般使用视图来查询，而不是更新。
