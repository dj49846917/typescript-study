6. typescript中的泛型
   * **泛型的定义**
      * 泛型就是解决类、接口、方法的复用性，以及对不特定数据类型的支持（类型校验）

   * **泛型函数**   
      <1>. any类型的函数
      ```
        function getData(str:any):any {
          return '哈哈'
        }
      ```

      <2>.泛型函数
      ```
        function getData<T>(value:T):T {
          return value;
        }
        console.log(getData<string>("222"));
        console.log(getData<number>(5656))
      ``` 

   * **泛型类**    
    <1>. 普通方法
      ```
        class MinClass{
            list:number[] = [];
            add(num: number) {
                this.list.push(num);
            }
            min():number {
                let code = this.list[0];
                this.list.forEach(item=>{
                    if(code > item) {
                        code = item
                    }
                })
                return code;
            }
        }
        const data = new MinClass();
        data.add(5);
        data.add(42);
        data.add(17);
        console.log(data.min()) 
      ```

    <2>. 类的泛型
      ```
        class MinClass<T> {
            list:T[] = [];
            add(num: T) {
                this.list.push(num);
            }
            min():T{
                let code = this.list[0];
                this.list.forEach(item=>{
                    if(code > item) {
                        code = item
                    }
                })
                return code;
            }
        }
        // 数字类型
        // const m = new MinClass<number>();
        // m.add(5);
        // m.add(42);
        // m.add(17);
        // console.log(m.min()) 

        // 字符串类型
        const m = new MinClass<string>();
        m.add('h');
        m.add('v');
        m.add('e');
        console.log(m.min())
      ```

   * **泛型接口**
    1. 普通的函数接口
      ```
        interface ConfigFn{
            (value1:string, value2:string):string
        }

        var setData:ConfigFn = function(value1:string, value2:string):string {
            return value1 + value2
        }
        console.log(setData("zhang", "三")) 
      ```

    2. 泛型接口
        * 方式一：
          ```
          interface ConfigFn {
              <T>(value:T):T
          }

          var setData:ConfigFn = function<T>(value:T):T{
              return value;
          }
          setData<string>('张三'); 
          ```

        * 方式二：
          ```
            interface ConfigFn<T> {
                (value:T):T
            }

            function setData<T>(value:T):T {
                return value
            }

            const myGetData:ConfigFn<string> = setData;
            myGetData('20')
          ```


# [详细代码请看：index.ts](index.ts)