const mysql = require('mysql2/promise');

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'localhost',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'sakila',
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

async function Query1() {
    const [rows, fields] = await pool.execute('SELECT 1');

    console.log(rows);
    console.log(fields);
}
async function Query2() {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM actores LIMIT 10');
        rows.forEach((element) => {
            console.log(element);
        });
    } catch (error) {
        throw error;
    }
}

(async () => {
    try {
        console.log("Inicio");
        //await Query1();
        await Query2();
    } catch (error) {
        console.log(error);
    }finally {
        pool.end();
        console.log("Desconectado de la Base de Datos...");
    }
})();