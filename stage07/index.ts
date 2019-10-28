/* 
5.typescript中的接口
    5.1 属性类接口
    5.2 函数类型接口
    5.3 可索引接口
    5.4 类类型接口
    5.5 接口扩展   
*/

/* 
接口的作用：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用。接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。typescript中的接口类似于java
*/


// 就是传入对象的约束   属性接口
/* 
    interface FullName{
        firstName: string;
        secondName: string;
    }

    function printName(name: FullName) {
        // 必须传入对象firstName， secondName
        console.log(name.firstName + '--' + name.secondName);
    }

    // 参数的顺序随意
    var obj = { 
        firstName: "张",
        secondName: "三",
    }
    printName(obj); 
*/

// 5.1 接口： 可选属性(用来对批量方法进行约束)
/* 
    interface FullName{
        firstName: string;
        secondName?: string;
    }

    function printName(name: FullName) {
        // 必须传入对象firstName， secondName
        console.log(name.firstName + '--' + name.secondName);
    }

    // 参数的顺序随意
    var obj = { 
        firstName: "张",
        secondName: "三",
    }
    printName(obj);  
*/

// 使用ts封装request接口
interface Config {
    url: string;
    dataType: string;
    data?: any;
    type: string;
}

// 原生js封装ajax
function request(config:Config) {
    const xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            console.log("成功");
        }
        if(config.dataType === 'json') {
            JSON.parse(xhr.responseText);
        } else {
            console.log(xhr.responseText);
        }
    }
}

request({
    url: 'http://www.baidu.com',
    type: 'get',
    data: {
       name: "张三" 
    },
    dataType: 'json'
})

// 5.2 函数类型接口：对方法传入的参数以及返回值进行约束，批量约束

// 加密的函数类型接口
interface encrypt{
    (key:string, value:string):string;
}

const md5 = function(key:string, value:string):string {
    // 模拟操作
    return key + value;
}
console.log(md5("name", "张三"));

// 5.3 可索引接口：数组、对象的约束（不常用）

// ts定义数组的方式
var arr:string[] = ["222", '333'];
var arr2:Array<number> = [111, 222];

// 可索引接口(数组)
/* 
    interface UserArr {
        [index:number]:string
    }
    var arr3:UserArr = ['555', 'wang'];
    console.log(arr3[0]) 
*/

// 可索引接口(对象)
    interface UserArr {
        [index:string]:string
    }
    var obj:UserArr = {
        name: "张三",
        age: "20"
    }

// 5.4 类类型接口：对类的约束。（和抽象类有点相似）
    /* 
        interface Animal {
            name: string;
            eat(str: string):void;
        }

        class Dog implements Animal {
            name: string;
            constructor(name: string) {
                this.name = name;
            }
            eat():void {
                console.log(this.name + "吃肉");
            }
        }

        class Cat implements Animal {
            name: string;
            constructor(name: string) {
                this.name = name;
            }
            eat():void {
                console.log(this.name + "吃鱼");
            }
        }
        const c = new Cat("大白");
        console.log(c.eat()) 
    */

// 5.5 接口扩展
// 5.5.1 接口可以继承接口
    /* 
        interface Animal {
            eat():void;
        }

        interface Person extends Animal {
            name: string;
            doing():void;
        }

        class Web implements Person {
            name: string;
            constructor(name: string) {
                this.name = name;
            }
            eat() {
                console.log(this.name + '吃肉');
            }
            doing() {
                console.log(this.name + '在工作');
            }
        }
        const w = new Web("李四");
        console.log(w.doing()) 
    */

// 5.5.2 可以同时继承类和实现接口
    interface Animal {
        eat():void;
    }

    interface Person extends Animal {
        name: string;
        doing():void;
    }

    class Programmer {
        name: string;
        constructor(name:string) {
            this.name = name;
        }
        coding(str:string):void {
            console.log(this.name + str);
        }
    }

    class Web extends Programmer implements Person {
        constructor(name: string) {
            super(name)
        }
        eat() {
            console.log(this.name + '吃肉');
        }
        doing() {
            console.log(this.name + '在工作');
        }
    }
    const w = new Web("李四");
    console.log(w.coding("在写ts代码"));