1. **typescript类的定义**
   * **es5中类的定义**
    ```
      function Person() {
          this.name = name;
          this.run = function() {
              console.log(this.name + 'run')
          }
      }
      var p = new Person("李四");
      p.run(); 
    ```

   * **ts中类的定义**
    ```
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
    ```

2. **typescript中实现类的继承**
   * **es5使用对象冒充+原型链组合继承**
    ```
      function Person(name, age) {
        this.name = name;
        this.age = age;
        this.run = function() {
          return `${this.name}在运动`
        }
      }
      
      function Web(name, age) {
        Person.call(this, name, age);
      }
      Web.prototype = Person.prototype;
      const w = new Web("李四", 30);
      console.log(w.name);
    ```

   * **ts使用extends,super实现继承**
    ```
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
    ```

3. 类里面的修饰符 typescript里面定义属性的时候给我们提供了三种修饰符
   * **public: 公有。  在类里面，子类，类外面都可以访问**
    ```
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
    ```

   * **protected： 保护类型。  在类里面，子类里面可以访问，在类外部服务访问**
    ```
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
    ```

   * **private: 私有。 在类里面可以访问，子类，类外部无法访问**
    ```
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
    ```

## 注意：[详细资料请看:README.md](README.md)    
[详细代码请看：index.ts](index.ts)

4. 静态属性 静态方法
   * **es5的静态属性和方法**
    ```
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
    ```

   * **typescript的静态属性和方法**
    ```
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
    ```

5. **多态：**
   * **概念：父类定义一个方法不去实现，让继承它的子类取实现，每一个子类有不同的表现**

   * **注意：多态属于继承**
    ```
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
    ```

6. **typescript中的抽象类**
   * **概念：它是提供其他类继承的基类，不能直接被类实例化**
   * **注意：**
      1. **用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现**

      2. **abstract:抽象方法只能在抽象类里面**

      3. **抽象类和抽象方法用来定义标准，标准：Animal这个类要求它的子类必须包含eat方法**

    ```
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
    ```
