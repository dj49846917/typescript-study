"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B;
(function (B) {
    var Programmer = /** @class */ (function () {
        function Programmer(name, age) {
            this.name = name;
            this.age = age;
        }
        Programmer.prototype.doing = function () {
            console.log("\u6211\u7684\u540D\u5B57\u53EB" + this.name + ",\u4ECA\u5E74" + this.age + "\u5C81");
        };
        return Programmer;
    }());
    B.Programmer = Programmer;
})(B = exports.B || (exports.B = {}));
var C;
(function (C) {
    var Programmer = /** @class */ (function () {
        function Programmer(name, age) {
            this.name = name;
            this.age = age;
        }
        Programmer.prototype.doing = function () {
            console.log("\u6211\u7684\u540D\u5B57\u53EB" + this.name + ",\u4ECA\u5E74" + this.age + "\u5C81");
        };
        return Programmer;
    }());
    C.Programmer = Programmer;
})(C = exports.C || (exports.C = {}));
