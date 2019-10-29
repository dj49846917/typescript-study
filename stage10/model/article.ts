import { mysqlDb } from '../modules/db'

class ArticleClass {
    title: string | undefined;
    desc: string | undefined;
}

var ArticleModel = new mysqlDb<ArticleClass>();

export {
    ArticleClass,
    ArticleModel
}

