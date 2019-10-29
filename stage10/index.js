"use strict";
/*
8. 模块
    8.1 模块的概念
    8.2 模块导出的几种方式
        1. export 导出声明
        2. export 导出语句
        3. export default
        4. import 导入模块
    8.3 模块化封装上一讲的db库

    模块的概念：
        模块分为内部模块(命名空间)和外部模块。
        我们可以把一些公共的功能单独抽离成一个文件作为模块。
        模块里面的变量，函数，类等默认是私有的，如果我们想在外部访问模块里面的数据（变量，函数，类），我们需要通过ecport暴露模块里面的数据(变量，函数，类...)。
        暴露后我们通过import 引入模块就可以使用模块就可以使用模块里面暴露的数据(变量，函数，类...)
*/
Object.defineProperty(exports, "__esModule", { value: true });
// 改造上节封装的代码
var user_1 = require("./model/user");
var article_1 = require("./model/article");
// 操作用户表   定义一个User类和数据表做映射
var u = new user_1.UserClass();
u.username = "zhangsan";
u.password = "123456";
// 新增操作
user_1.UserModel.add(u);
// 获取User表，id = 5的数据
var data = user_1.UserModel.get(5);
console.log(data);
// 获取文章表的数据
var ar = new article_1.ArticleClass();
article_1.ArticleModel.get(1);
