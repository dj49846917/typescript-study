# typescript学习

1. **vscode配置自动编译**   
  <1>. 输入命令： tsc --init 生成tsconfig.json, 改“outDir” 为 “./js”

   <2>. 终端-->运行任务-->监视

   <3>. [详细代码请看: stage01/index.ts](/stage01/index.ts)

2. **typescript的数据类型**   
  <1>. **布尔类型(boolean)**

   <2>. **数字类型(number)**

   <3>. **字符串类型(string)**
 
   <4>. **数组类型(array)**
  
   <5>. **元组类型(tuple)**
  
   <6>. **枚举类型(enum)**
  
   <7>. **任意类型(any)**
  
   <8>. **null和undefined**
  
   <9>. **void类型：表示没有任何类型，一般用于定义方法的时候方法没有返回值**
  
   <10>. **never类型：是其他类型(包括null和undefined)的子类型，代表从不会出现的值** 
  
  * **[详细代码请看：typescript-study/stage02/index.ts](/stage02/index.ts)**

  * **[详细信息请看：stage02/README.md](/stage02/README.md)**

3. typescript函数    
   * **函数的定义**  
 
   * **ts中定义方法传参**   
      <1>. 普通参数

       <2>.方法可选参数： ts中在参数后面加上'?'

       <3>. 默认参数

       <4>. 剩余参数

   * **函数重载**
  
   * **[详细资料请看：/stage03/README.md]**

   * **[详细代码请看：/stage03/index.ts]**

4. typescript中的类和继承   
   * es5   
      1. es5里面的类
          * 最简单的类
          * 构造函数添加属性和方法
          * 原型链里面添加属性和方法
   
      2. es5里的继承
          * 对象冒充实现继承
          * 原型链实现继承
          * 对象冒充 + 原型链组合实现继承
      
      3. **[详细资料请看：/stage04/README.md](/stage04/README.md)**
      4. **[详细代码请看：/stage04/index.ts](/stage04/index.ts)**
   
   * typescript
      1. ts中类的定义
      2. 类的继承(extends, super)
      3. 类的修饰符
        * public: 公有。  在类里面，子类，类外面都可以访问
        * protected： 保护类型。  在类里面，子类里面可以访问，在类外部服务访问
        * private: 私有。 在类里面可以访问，子类，类外部无法访问

      4. **[详细资料请看：/stage05/README.md](/stage05/README.md)**
      5. **[详细代码请看：/stage05/index.ts](/stage05/index.ts)**




