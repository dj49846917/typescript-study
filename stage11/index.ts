/* 
命名空间：
    在代码量较大的情况下，为了避免各种变量命名相冲突，可将相似功能的函数，类，接口等放置到命名空间内

    同Java的包，.net的命名空间一样，typescript的命名空间可以将代码包裹起来，只对外暴露需要在外部访问的对象，命名空间内的对象通过

命名空间和模块的区别：
    命名空间：内部模块，主要用于组织代码，避免命名冲突

    模块：ts的外部模块的简称，侧重代码的重用，一个模块里可能会有多个命名空间
*/
// 方式一：模块内部
namespace A {
    interface Animal {
        name: string;
        eat(): void;
    }
    
    export class Dog implements Animal {
        name: string;
        constructor(name:string) {
            this.name = name;
        }
        eat():void {
            console.log(this.name + '吃肉');
        }
    }
    
    export class Cat implements Animal {
        name: string;
        constructor(name:string) {
            this.name = name;
        }
        eat():void {
            console.log(this.name + '吃鱼');
        }
    }
}


const c = new A.Cat("咪咪");
c.eat()

// 方式二：模块外部
import { B, C } from './modules/person'
const p = new B.Programmer("张三", "20");
p.doing()
