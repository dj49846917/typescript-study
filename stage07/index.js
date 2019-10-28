"use strict";
/*
5.typescript中的接口
    5.1 属性类接口
    5.2 函数类型接口
    5.3 可索引接口
    5.4 类类型接口
    5.5 接口扩展
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 原生js封装ajax
function request(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("成功");
        }
        if (config.dataType === 'json') {
            JSON.parse(xhr.responseText);
        }
        else {
            console.log(xhr.responseText);
        }
    };
}
request({
    url: 'http://www.baidu.com',
    type: 'get',
    data: {
        name: "张三"
    },
    dataType: 'json'
});
var md5 = function (key, value) {
    // 模拟操作
    return key + value;
};
console.log(md5("name", "张三"));
// 5.3 可索引接口：数组、对象的约束（不常用）
// ts定义数组的方式
var arr = ["222", '333'];
var arr2 = [111, 222];
var obj = {
    name: "张三",
    age: "20"
};
var Programmer = /** @class */ (function () {
    function Programmer(name) {
        this.name = name;
    }
    Programmer.prototype.coding = function (str) {
        console.log(this.name + str);
    };
    return Programmer;
}());
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    function Web(name) {
        return _super.call(this, name) || this;
    }
    Web.prototype.eat = function () {
        console.log(this.name + '吃肉');
    };
    Web.prototype.doing = function () {
        console.log(this.name + '在工作');
    };
    return Web;
}(Programmer));
var w = new Web("李四");
console.log(w.coding("在写ts代码"));
