"use strict";
// 1. es5里面的类
// 1.1 最简单的类
/*
  function Person() {
    this.name = '张三';
    this.age = 23;
  }

  const p = new Person();
  console.log(p.name);
*/
// 1.2 构造函数和原型链里面添加方法
// 1.2.1 构造函数
/*
  function Person() {
    this.name = '张三';
    this.age = 23;
    this.run = function() { 实例方法
      console.log(this.name + '在运动');
    };
  }

  const p = new Person();
  console.log(p.name);
  console.log(p.run());
*/
// 1.2.2 原型链
/*
  function Person() {
    this.name = '张三';
    this.age = 23;
  }
  
  原型链上面的属性会被多个实例共享，而构造函数不会
  Person.prototype.sex = '男';
  Person.prototype.run = function() {
    console.log(this.name + '在运动');
  }
  const p = new Person();
  console.log(p.sex);
  console.log(p.run());
*/
// 1.3 静态方法
/*
  function Person() {
    this.name = '张三';
    this.age = 23;
  }
  // 静态方法
  Person.getInfo = function() {
    console.log("我是静态方法");
  }
  const p = new Person();
  // 调用静态方法
  console.log(Person.getInfo());
*/
// 2. es5里的继承
// 2.1 对象冒充实现继承
/*
  function Person() {
    this.name = '张三'; // 属性
    this.age = 23;
    this.run = function() { // 实例方法
      console.log(this.name + '在运动');
    };
  }
  Person.prototype.sex = '男';
  Person.prototype.work = function() {
    console.log(this.name + '在工作');
  }

  // web类 继承Person类
  function Web() {
    Person.call(this); // 对象冒充实现继承
  }
  const w = new Web();
  console.log(w.run()); // 对象冒充可以继承构造函数里的属性和方法
  console.log(w.work()); // 对象冒充可以继承构造函数里的属性和方法, 但是没法继承原型链上面的属性和方法
*/
// 2.2 原型链实现继承
/*
  function Person(name, age) {
    this.name = name; // 属性
    this.age = age;
    this.run = function() { // 实例方法
      console.log(this.name + '在运动');
    };
  }
  Person.prototype.sex = '男';
  Person.prototype.work = function() {
    console.log(this.name + '在工作');
  }

  // web类 继承Person类
  function Web() {}
  Web.prototype = new Person();
  const w = new Web("李四", 30);
  // 原型链实现继承：可以继承构造函数里的属性和方法，也可以继承原型链上面的属性和方法, 但是实例化子类的时候没法给父类传参
  console.log(w.run());
  console.log(w.work());
*/
// 2.3 对象冒充 + 原型链组合实现继承
// 方式1
function Person(name, age) {
    this.name = name; // 属性
    this.age = age;
    this.run = function () {
        console.log(this.name + '在运动');
    };
}
Person.prototype.sex = '男';
Person.prototype.work = function () {
    console.log(this.name + '在工作');
};
// web类 继承Person类 
function Web(name, age) {
    Person.call(this, name, age); // 对象冒充继承   实例化子类可以给父类传参
}
Web.prototype = new Person();
var w = new Web("李四", 30);
// 原型链实现继承：可以继承构造函数里的属性和方法，也可以继承原型链上面的属性和方法, 但是实例化子类的时候没法给父类传参
console.log(w.run());
console.log(w.work());
// 方式2
function Person(name, age) {
    this.name = name; // 属性
    this.age = age;
    this.run = function () {
        console.log(this.name + '在运动');
    };
}
Person.prototype.sex = '男';
Person.prototype.work = function () {
    console.log(this.name + '在工作');
};
// web类 继承Person类 
function Web(name, age) {
    Person.call(this, name, age); // 对象冒充继承, 可以继承构造函数里面的属性和方法，实例化子类可以给父类传参
}
Web.prototype = Person.prototype;
var w = new Web("李四", 30);
// 原型链实现继承：可以继承构造函数里的属性和方法，也可以继承原型链上面的属性和方法, 但是实例化子类的时候没法给父类传参
console.log(w.run());
console.log(w.work());
