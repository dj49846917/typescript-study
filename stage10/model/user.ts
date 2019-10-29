import { mysqlDb } from '../modules/db'

class UserClass {
    username: string | undefined;
    password: string | undefined;
}

var UserModel = new mysqlDb<UserClass>();

export {
    UserClass,
    UserModel
}

