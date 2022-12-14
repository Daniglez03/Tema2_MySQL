const mysql = require('mysql2/promise');

const config = require('./config');

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
});

pool.on('connection', (conn) => {
    console.log('Conectado al pool');
});

pool.on('release', (conn) => {
    console.log('Conectado %d released', conn.threadId);
});

module.exports = pool;