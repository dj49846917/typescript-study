export namespace B {
    interface Person {
        name: string;
        age: string;
        doing():void;
    }
    
    export class Programmer implements Person {
        name: string;
        age: string;
        constructor(name:string, age:string) {
            this.name = name;
            this.age = age;
        }
        doing():void {
            console.log(`我的名字叫${this.name},今年${this.age}岁`);
        }
    }
}

export namespace C {
    interface Person {
        name: string;
        age: string;
        doing():void;
    }
    
    export class Programmer implements Person {
        name: string;
        age: string;
        constructor(name:string, age:string) {
            this.name = name;
            this.age = age;
        }
        doing():void {
            console.log(`我的名字叫${this.name},今年${this.age}岁`);
        }
    }
}