const mysql = require('mysql2/promise');
const dbConfig = global.config.get('Dev.dbConfig.mySQL');


// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({

    host: dbConfig.host,
   user: dbConfig.user,
   port: dbConfig.port,
   database: dbConfig.dbName,
   password: dbConfig.password,
   waitForConnections: true,
   connectionLimit: dbConfig.connectionLimit,
   queueLimit: dbConfig.queueLimit,
   
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