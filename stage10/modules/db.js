"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 定义一个操作操作mysql数据库的类， 注意：要实现泛型接口，这个类必须是一个泛型类
var mysqlDb = /** @class */ (function () {
    function mysqlDb() {
        console.log("数据库建立连接");
    }
    mysqlDb.prototype.add = function (info) {
        console.log("info", info);
        return true;
    };
    mysqlDb.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    mysqlDb.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    mysqlDb.prototype.get = function (id) {
        var list = [
            {
                title: 'xxxx',
                desc: 'xxxxxxxx'
            },
            {
                title: 'xxxx',
                desc: 'xxxxxxxx'
            }
        ];
        return list;
    };
    return mysqlDb;
}());
exports.mysqlDb = mysqlDb;
