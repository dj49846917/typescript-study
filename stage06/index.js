"use strict";
// 4.静态属性 静态方法
// 4.1 es5
/*
  function Person() {
    this.run = function() {
      console.log("张三")
    }
  }

  Person.age = 20; // 静态属性
  Person.run2 = function() { // 静态方法
    console.log("李四");
  }
  const p = new Person();
  Person.run2() // 静态方法调用
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
// 4.2 typescript
/*
  class Person {
    public name: string;
    static sex: string = "男";
    constructor(name:string) {
      this.name = name;
    }
    run():void {
      console.log(this.name + "在唱歌");
    }
    static work():string { // 静态方法，没法直接调用类里面的属性
      return "李四"
    }
  }
  const p = new Person("王麻子");
  p.run()
  console.log(Person.work())
*/
// 5. 多态：父类定义一个方法不去实现，让继承它的子类取实现，每一个子类有不同的表现
// 多态属于继承
/*
  class Animal {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    eat():void { // 具体吃什么，不知道， 具体吃什么由继承它的子类来实现，每一个子类的表现不一样
      console.log("吃的方法")
    }
  }

  class Dog extends Animal {
    constructor(name: string) {
      super(name);
    }
    eat():string {
      return this.name + "吃粮食";
    }
  }

  class Cat extends Animal {
    constructor(name: string) {
      super(name)
    }
    eat():string {
      return this.name + "吃肉";
    }
  }

  const c = new Cat("猫");
  console.log(c.eat())
*/
// 6. typescript中的抽象类：它是提供其他类继承的基类，不能直接被类实例化
// 用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
// abstract:抽象方法只能在抽象类里面
// 抽象类和抽象方法用来定义标准，标准：Animal这个类要求它的子类必须包含eat方法
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        return _super.call(this, name) || this;
    }
    // 必须实现eat方法
    Cat.prototype.eat = function () {
        return this.name + "吃老鼠";
    };
    return Cat;
}(Animal));
var c = new Cat("大白");
console.log(c.eat());
