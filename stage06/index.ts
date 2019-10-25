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


abstract class Animal{
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  abstract eat():any; // 抽象类的子类必须实现抽象类里面的抽象方法
}

class Cat extends Animal {
  constructor(name: string) {
    super(name)
  }
  // 必须实现eat方法
  eat():any {
    return this.name + "吃老鼠"
  }
}
const c = new Cat("大白");
console.log(c.eat())