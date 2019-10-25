// 1. ts类的定义
// es5
  /* 
    function Person() {
        this.name = name;
        this.run = function() {
            console.log(this.name + 'run')
        }
    }
    var p = new Person("李四");
    p.run(); 
  */

// ts
  /* 
    class Person{
      name: string; // 属性 前面省略了public关键词
      constructor(n: string) { // 构造函数  实例化类的时候触发的方法
        this.name = n;
      };
      run():void{
        console.log(this.name + 'run');
      };
    }

    var p = new Person("王麻子");
    p.run(); 
  */

// 2. ts中实现继承 extends, super
  
  /* 
    class Person{
      name: string;
      constructor(name:string) {
        this.name = name;
      }
      run():string {
        return this.name + '在运动';
      }
    }
    // let p = new Person("王五");
    // console.log(p.run());

    class Web extends Person {
      constructor(name:string) {
        super(name); // 初始化父类的构造函数
      }
    }
    let w = new Web("李四");
    console.log(w.run());  
  */
 


// 3.类里面的修饰符 typescript里面定义属性的时候给我们提供了三种修饰符
/* 
    public: 公有。  在类里面，子类，类外面都可以访问
    protected： 保护类型。  在类里面，子类里面可以访问，在类外部服务访问
    private: 私有。 在类里面可以访问，子类，类外部无法访问 

    属性如果不加修饰符，默认就是公有: public
*/
  // 3.1 public: 公有。  在类里面，子类，类外面都可以访问
  /* 
    class Person{
      public name: string;
      constructor(name:string) {
        this.name = name;
      }
      run():string {
        return this.name + '在运动';
      }
    }

    const p = new Person("张三");

    class Web extends Person {
      constructor(name:string) {
        super(name); // 初始化父类的构造函数
      }
      work():string {
        return this.name + '在工作';
      }
    }
    let w = new Web("李四");
    console.log(w.work()); 
    // 使用public, 类外部可以取到值
    console.log(p.name); // "张三" 
  */

  // 3.2 protected： 保护类型。  在类里面，子类里面可以访问，在类外部服务访问
  /* 
    class Person{
      protected name: string;
      constructor(name:string) {
        this.name = name;
      }
      run():string {
        return this.name + '在运动';
      }
    }

    const p = new Person("张三");

    class Web extends Person {
      constructor(name:string) {
        super(name); // 初始化父类的构造函数
      }
      work():string {
        return this.name + '在工作';
      }
    }
    let w = new Web("李四");
    console.log(w.work()); 
    // 使用protected, 类外部不能取到值
    console.log(p.name); 
  */

  // 3.3 private: 私有。 在类里面可以访问，子类，类外部无法访问
  class Person{
    private name: string;
    constructor(name:string) {
      this.name = name;
    }
    run():string {
      return this.name + '在运动';
    }
  }

  const p = new Person("张三");

  class Web extends Person {
    constructor(name:string) {
      super(name); // 初始化父类的构造函数
    }
    work():string {
      return this.name + '在工作'; // private 子类不能取到值
    }
  }
  let w = new Web("李四");
  console.log(w.work()); 
  // 使用private, 类外部不能取到值
  console.log(p.name); 