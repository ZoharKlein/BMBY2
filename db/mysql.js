const mysql = require('mysql2/promise');
const config = require('config')
const dbConfig = config.get('Dev.dbConfig');


// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'bmby2',
    password: '12345678',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


exports.GetDataFromMySQL = async(sqlCommand) => {
    //return getAllBlogPost(sqlCommand)
    const result = await pool.query(sqlCommand);
    return result[0];


}
exports.InsertDataFromMySQL = async(sqlCommand) => {
    const result = await pool.query(sqlCommand);
    console.log('Insert To Database' + result)


}