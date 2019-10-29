interface DBI<T> {
    add(info: T): boolean;
    update(info: T, id: number): boolean;
    delete(id: number): boolean;
    get(id:number): any[];
}

// 定义一个操作操作mysql数据库的类， 注意：要实现泛型接口，这个类必须是一个泛型类
class mysqlDb<T> implements DBI<T> {
    constructor() {
        console.log("数据库建立连接");
    }

    add(info: T): boolean {
        console.log("info", info);
        return true;
    }    

    update(info: T, id: number): boolean {
        throw new Error("Method not implemented.");
    }

    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }

    get(id: number): any[] {
        var list = [
            {
                title: 'xxxx',
                desc: 'xxxxxxxx'
            },
            {
                title: 'xxxx',
                desc: 'xxxxxxxx'
            }
        ]
        return list;
    }
}

export { 
    mysqlDb
}