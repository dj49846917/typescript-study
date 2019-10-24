1. typescript函数    
   * 函数的定义    
      <1>. es5定义函数的方法
        ```
          // 函数声明法
          function run() {
              return 'run';
          }

          // 匿名函数
          var run2 = function () {
              return 'run2';
          }
        ```

      <2>. ts中定义函数的方法
        ```
          // 函数声明法
          function run3():string {
              return "zhangsan"
          }

          // 匿名函数
          var run4 = function():number {
              return 123;
          }
        ```
 
   * ts中定义方法传参   
      <1>. 普通参数
        ```
          // 声明函数
          function getInfo(name:string, age:number):string{
              return `${name} ------ ${age}`
          }
          console.log(getInfo("张三", 30));

          // 匿名函数
          var getInfo1 = function(name1:string, age1:number):string{
              return `${name1} ------ ${age1}`
          }
          console.log(getInfo("李四", 30));

          // 没有返回值的函数
          function run5():void {
              console.log('run5');
          }
          run5()
        ```

       <2>.方法可选参数： ts中在参数后面加上'?'
        ```
          function getInfo2(name:string, age?:number):string{
            if(age) {
              return `${name} ------ ${age}`
            } else {
              return `${name} ------ 年龄未知`
            }
          }
          console.log(getInfo2("张三"));
          console.log(getInfo2("张三", 20));
          // 注意：可选参数必须配置到参数最后面 
        ```

       <3>. 默认参数
        ```
          // es5里没法设置默认参数，es6和ts可以设置默认值
          function getInfo3(name:string, age:number=30):string{
              if(age) {
                  return `${name} ------ ${age}`
              } else {
                  return `${name} ------ 年龄未知`
              }
          }
          console.log(getInfo3("李四"));
          console.log(getInfo3("李四", 40));
        ```

       <4>. 剩余参数
        ```
          // 方式1
          function sum(a: number, b: number, c: number, d: number):number {
              return a + b + c + d;
          }
          console.log(sum(1, 2, 3, 4));

          // 方式2
          // 拓展运算符接收形参传过来的值
          function sum2(...result:number[]):number {
              var it = 0;
              for(var i = 0; i < result.length; i++) {
                  it += result[i]
              }
              return it;
          }
          console.log('三元计算', sum2(1, 2, 3, 6));

          // 方式3
          function sum3(a:number, ...result:number[]):number {
              var it = a;
              for(var i = 0; i < result.length; i++) {
                  it += result[i]
              }
              return it;
          }
          console.log('方式1，2结合', sum3(1, 2, 3, 6));
        ```

   * 函数重载
    ```
      /**
        *  1. java中方法的重载，重载指的是两个或两个以上同名函数，但它们的参数不一样，这时会出现函数重载的情况。
        *  2. typescript中的重载，通过为同一个函数提供多个函数类型定义来实现多种功能的目的
        *  3. ts为了兼容es5以及es6重载的写法和java中有区别
        * 
        *  es5,es6中，如果函数同名，后面的会覆盖前面的
        */
      // 类型不同
      function getItem(name:string):string;
      function getItem(age:number):string;
      function getItem(str:any):any {
          if(typeof str === 'string') {
              return `我叫${str}`;
          } else {
              return `我的年龄是${str}`
          }
      }
      console.log(getItem("王麻子"));
      console.log(getItem(45));

      // 参数个数不同
      function getItem1(name:string):string;
      function getItem1(name:string, age:number):string;
      function getItem1(name:any, age?:any):any {
          if(age) {
              return `我叫${name}, 我的年龄是${age}`;
          } else {
              return `我叫${name}`
          }
      }
      console.log(getItem1("王麻子"));
      console.log(getItem1("王麻子", 45));
    ```

   * **[详细资料请看：/stage03/README.md]**
   * **[详细代码请看：/stage03/index.ts]**

    