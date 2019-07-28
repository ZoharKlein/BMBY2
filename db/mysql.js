const mysql = require('mysql2/promise');
const dbConfig = global.config.get('Dev.dbConfig.mySQL');
const User = require('../models/User') 

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

exports.findUserByMail = email => {return `SELECT * FROM users WHERE email = '${email}'`}
exports.findUserByMailAndPassword = (email,password) => {return `SELECT * FROM users WHERE email = '${email}' AND 'password' = '${password}'`}
exports.insertNewUser = (...user) => {
    console.log('user:', user)
    return `INSERT INTO users 
( 
    firstName,
    lsatName,
    city,
    mobile,
    email,
    password,
    role,
    status,
    birthday,
    dateRegistered,
    lastPassword,
    lastPasswordUpdate,
    profileImg
    ) 
VALUES 
(
    '${user[0].firstname}',
    '${user[0].lastname}',
    '${user[0].city}',
    '${user[0].mobile}',
    '${user[0].email}',
    '${user[0].password}',
    '${user[0].role}',
    '${user[0].stats}',
    '${user[0].birthday}',
    CURDATE(),
    '${user[0].password}',
    CURDATE(),
    'https://image.flaticon.com/icons/svg/149/149071.svg'
      );
`}
