const mysql = require('mysql2/promise');

(async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'sakila'
    });

    connection.connect();
    console.log("Conectado a la Base de Datos");

    try {
        console.log("Inicio");
        const [rows] = await connection.query('SELECT * FROM actores LIMIT 10;');
        console.log(rows);
    } catch (error) {
        console.log(error);
    }finally {
        connection.close();
        console.log("Desconectado de la Base de Datos...");
    }
})();