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


exports.EnterQuery = async(sqlCommand) => {
    //return getAllBlogPost(sqlCommand)
    const result = await pool.query(sqlCommand);
    return result[0];


}
exports.InsertDataFromMySQL = async(sqlCommand) => {
    const result = await pool.query(sqlCommand);
    console.log('Insert To Database' + result)


}
//select
exports.findAllUsersId = 'SELECT userID FROM users'
exports.findAllUsersExeptOne = (userID,roles) => {return `SELECT * FROM users WHERE NOT userID = '${userID}' AND role IN (${roles})`}
exports.findAllUsersExeptOneByStatus = (userID,status) => {return `SELECT * FROM users WHERE NOT userID = '${userID}' AND status = "${status}" `}

exports.findUserByID = id => {return `SELECT * FROM users WHERE userID = '${id}'`}
exports.findUserByMail = email => {return `SELECT * FROM users WHERE email = '${email}'`}
exports.findUserByMailAndPassword = (email,password) => {return `SELECT * FROM users WHERE email = '${email}' AND 'password' = '${password}'`}
exports.findUsersByRole = (role) => {return `SELECT * FROM users WHERE role='${role}'`}
exports.findUsersByStatus = (status) => {return `SELECT * FROM users  WHERE status ='${status}'`}

exports.findListOfFirstnameLastnameByID = (idArr) => {return `SELECT userID , firstName,lastName FROM users where userID in (${idArr})`}

//insert
exports.insertNewUser = (...user) => {
    console.log('user:', user)
    return `INSERT INTO users 
( 
    firstName,
    lastName,
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

//update
exports.updateProfileImgByID = (imgURL,userID) => {return `UPDATE users SET profileImg = "${imgURL}" WHERE userID = ${userID}`}
exports.updatePasswordByID = (password,userID) => {return `UPDATE users SET password = "${password}",lastPasswordUpdate = CURDATE() WHERE userID = ${userID}`}
exports.updateRoleAnStausByID = (role,status,userID) => {return `UPDATE users SET role = "${role}",status = "${status}" WHERE userID = ${userID}`}
exports.updateDetailes = (firstname,lastname,city,email,mobile,userID) => {return `UPDATE users SET firstName = "${firstname}",lastName = "${lastname}" ,city ="${city}",mobile="${mobile}",email="${email}" WHERE userID = ${userID}`}

//delete
exports.deleteUserByID = (userID) => {return `DELETE FROM users WHERE userID = ${userID}`}

//limit
exports.limitNumberOfResult = (limit) => {return `LIMIT ${limit}`}
exports.limitFromStartToEnd = (start,end) => {return `LIMIT ${start},${end}`}

//orders
exports.orderBy = (order) => {return `ORDER BY ${order}`}

//filters