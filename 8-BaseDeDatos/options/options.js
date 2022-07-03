const optionsMdb = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce'
    }
}

const optionsSql3 = {
    client: 'sqlite3',
    connection: {
        filename: './Db/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

module.exports ={
    optionsMdb,
    optionsSql3
}