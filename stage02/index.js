"use strict";
/**
 * typescript的数据类型
 *      1. 布尔类型(boolean)
 *      2. 数字类型(number)
 *      3. 字符串类型(string)
 *      4. 数组类型(array)
 *      5. 元组类型(tuple)
 *      6. 枚举类型(enum)
 *      7. 任意类型(any)
 *      8. null和undefined
 *      9. void类型
 *      10. never类型
 *
 */
// 1. 布尔类型
var flag = true;
console.log(flag);
// 2. 数字类型(number)
var num = 123456;
console.log(num);
// 3. 字符串类型(string)
var str = "zhangsan";
console.log(str);
// 4. 数组类型(array)
// ts中定义数组有两种方式
// 1. 第一种定义数组的方式
var arr = ['1', '2'];
var arr1 = [1, 2, 3];
// 2. 第二种定义数组的方式
var arr2 = [11, 22, 33];
// 2. 第三种定义数组的方式
var arr3 = ['22', true, 444];
var arr5 = ['22', true, 444];
// 5. 元组类型(tuple) 数组的一种
var arr4 = [2, '55'];
console.log(arr4);
/**
 * 6. 枚举类型(enum)
 *
 *  enum 枚举名{
 *      标识符[=整形常数],
 *      标识符[=整形常数],
 *      ...
 *      标识符[=整形常数],
 *  }
 *  如果标识符没有赋值，他的值就是下标
 *
 *
 */
var tag;
(function (tag) {
    tag[tag["success"] = 1] = "success";
    tag[tag["error"] = 2] = "error";
})(tag || (tag = {}));
var s = tag.success;
console.log(s); // 1
var Color;
(function (Color) {
    Color[Color["blue"] = 0] = "blue";
    Color[Color["red"] = 1] = "red";
    Color[Color["orange"] = 2] = "orange";
})(Color || (Color = {}));
var item = Color.orange;
console.log(item); // 2
// 7. 任意类型(any)
var code = 222;
code = "str";
console.log(code);
var obj = document.querySelector("#box");
obj.style.color = "red";
// 8. null和undefined
var air;
var c;
var pig;
pig = 3;
console.log(air = null);
console.log(c);
console.log('pig', pig);
// 9. void类型：表示没有任何类型，一般用于定义方法的时候方法没有返回值
function run() {
    console.log("run");
}
run();
function sum(a, b) {
    return a + b;
}
sum(3, 5);
// 10. never类型：是其他类型(包括null和undefined)的子类型，代表从不会出现的值
// 声明never的变量只能被never类型所赋值
var a;
a = undefined;
var b;
b = null;
