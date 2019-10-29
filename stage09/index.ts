/*
    功能：定义一个操作数据库的库，支持Mysql、Mssql、get方法

    要求：Mysql, Mssql, Mongodb功能一样，都有add. update, delete, get方法

    注意：约束统一的规范，以及代码重用

    解决方案：需要约束规范所以定义接口，需要代码重用所以用到泛型
        1. 接口：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范
        
        2. 泛型：通俗理解：泛型就是解决类，接口和方法的复用性 
*/
interface DBI<T> {
    add(info: T): boolean;
    update(info: T, id: number): boolean;
    delete(id: number): boolean;
    get(id:number): any[];
}

// 定义一个操作操作mysql数据库的类， 注意：要实现泛型接口，这个类必须是一个泛型类
class mysqlDb<T> implements DBI<T> {
    constructor() {
        console.log("数据库建立连接");
    }

    add(info: T): boolean {
        console.log("info", info);
        return true;
    }    

    update(info: T, id: number): boolean {
        throw new Error("Method not implemented.");
    }

    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }

    get(id: number): any[] {
        var list = [
            {
                title: 'xxxx',
                desc: 'xxxxxxxx'
            },
            {
                title: 'xxxx',
                desc: 'xxxxxxxx'
            }
        ]
        return list;
    }
}
// 操作用户表   定义一个User类和数据表做映射
class User {
    username: string | undefined;
    password: string | undefined;
}

var u = new User();
u.username = "zhangsan"
u.password = "123456"

// 新增操作
var oMySql = new mysqlDb<User>();
oMySql.add(u);

// 获取User表，id = 5的数据
var data = oMySql.get(5);
console.log(data);