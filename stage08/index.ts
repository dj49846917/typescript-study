/* 
6. typescript中的泛型
    6.1 泛型的定义
    6.2 泛型函数
    6.3 泛型类
    6.4 泛型接口
*/

/* 
6.1 泛型定义：软件工程中，我们不仅要创建一致的定义良好的API,同时也要考虑可重用性。组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。 

在像C#和java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以以自己的数据类型来使用组件。

通俗理解：泛型就是解决类、接口、方法的复用性，以及对不特定数据类型的支持（类型校验）
*/

// 6.1 泛型函数

// any放弃了类型检查，传入什么，返回什么。比如：传入number类型必须返回number类型，传入string类型必须返回string类型

// 传入的参数类型和返回的参数类型可以不一致
/* 
    function getData(str:any):any {
        return '哈哈'
    } 
*/

// 泛型，可以支持不特定的数据类型。要求：传入的参数和返回的参数一致

// T表示泛型，具体什么类型是调用这个方法的时候决定的
    function getData<T>(value:T):T {
        return value;
    }
    console.log(getData<string>("222"));
    console.log(getData<number>(5656))

// 6.3 泛型类：比如有个最小堆算法，需要同时支持返回数字和字符串两种类型。通过类的泛型来实现。
    // 普通方法
    /* 
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
    */

    // 类的泛型
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

// 6.4 泛型接口
    // 函数接口
    /* 
        interface ConfigFn{
            (value1:string, value2:string):string
        }

        var setData:ConfigFn = function(value1:string, value2:string):string {
            return value1 + value2
        }
        console.log(setData("zhang", "三")) 
    */

    // 泛型接口方式一
    /* 
        interface ConfigFn {
            <T>(value:T):T
        }

        var setData:ConfigFn = function<T>(value:T):T{
            return value;
        }
        setData<string>('张三'); 
    */

    // 方式二
    interface ConfigFn<T> {
        (value:T):T
    }

    function setData<T>(value:T):T {
        return value
    }

    const myGetData:ConfigFn<string> = setData;
    myGetData('20')
