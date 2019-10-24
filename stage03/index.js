"use strict";
// 3.1函数的定义
/**
 * es5定义函数的方法
 */
// 函数声明法
function run() {
    return 'run';
}
// 匿名函数
var run2 = function () {
    return 'run2';
};
/**
 * ts中定义函数的方法
 */
// 函数声明法
function run3() {
    return "zhangsan";
}
// 匿名函数
var run4 = function () {
    return 123;
};
// 3.2 ts中定义方法传参
// 声明函数
function getInfo(name, age) {
    return name + " ------ " + age;
}
console.log(getInfo("张三", 30));
// 匿名函数
var getInfo1 = function (name1, age1) {
    return name1 + " ------ " + age1;
};
console.log(getInfo("李四", 30));
// 没有返回值的函数
function run5() {
    console.log('run5');
}
run5();
// 方法可选参数： ts中在参数后面加上'?'
function getInfo2(name, age) {
    if (age) {
        return name + " ------ " + age;
    }
    else {
        return name + " ------ \u5E74\u9F84\u672A\u77E5";
    }
}
console.log(getInfo2("张三"));
console.log(getInfo2("张三", 20));
// 注意：可选参数必须配置到参数最后面 
// 3.3 默认参数
// es5里没法设置默认参数，es6和ts可以设置默认值
function getInfo3(name, age) {
    if (age === void 0) { age = 30; }
    if (age) {
        return name + " ------ " + age;
    }
    else {
        return name + " ------ \u5E74\u9F84\u672A\u77E5";
    }
}
console.log(getInfo3("李四"));
console.log(getInfo3("李四", 40));
// 3.4 剩余参数
// 方式1
function sum(a, b, c, d) {
    return a + b + c + d;
}
console.log(sum(1, 2, 3, 4));
// 方式2
// 拓展运算符接收形参传过来的值
function sum2() {
    var result = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        result[_i] = arguments[_i];
    }
    var it = 0;
    for (var i = 0; i < result.length; i++) {
        it += result[i];
    }
    return it;
}
console.log('三元计算', sum2(1, 2, 3, 6));
// 方式3
function sum3(a) {
    var result = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        result[_i - 1] = arguments[_i];
    }
    var it = a;
    for (var i = 0; i < result.length; i++) {
        it += result[i];
    }
    return it;
}
console.log('方式1，2结合', sum3(1, 2, 3, 6));
function getItem(str) {
    if (typeof str === 'string') {
        return "\u6211\u53EB" + str;
    }
    else {
        return "\u6211\u7684\u5E74\u9F84\u662F" + str;
    }
}
console.log(getItem("王麻子"));
console.log(getItem(45));
function getItem1(name, age) {
    if (age) {
        return "\u6211\u53EB" + name + ", \u6211\u7684\u5E74\u9F84\u662F" + age;
    }
    else {
        return "\u6211\u53EB" + name;
    }
}
console.log(getItem1("王麻子"));
console.log(getItem1("王麻子", 45));
// 3.6 箭头函数 es6 
