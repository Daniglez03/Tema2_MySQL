const pool = require('./database');

// 
async function Query1() {
    const [rows, fields] = await pool.execute('SELECT 1');

    console.log(rows);
    console.log(fields);
}

// Mostrar todos los actores
async function Query2() {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM actores');
        rows.forEach((element) => {
            console.log(element);
        });
    } catch (error) {
        throw error;
    }
}
// Mostrar el id seleccionado
async function Query3() {
    try {
        const [rows, fields] = await pool.execute(
            'SELECT * FROM actores WHERE actor_id=100');
        console.log('Los datos de los actores son \n', rows);
    } catch (error) {
        throw error;
    }
}

// Mostrar el id seleccionado por constante
async function Query4() {
    try {
        const id = 100;
        const [rows, fields] = await pool.execute(
            'SELECT * FROM actores WHERE actor_id=' + id
            );
        console.log('Los datos de los actores con id=' + id + ' son \n', rows);
    } catch (error) {
        throw error;
    }
}

// Mostrar el id seleccionado por constante [id]
async function Query5() {
    try {
        const id = 100;
        const [rows, fields] = await pool.execute(
            'SELECT * FROM actores WHERE actor_id=?', [id]
            );
        console.log(`Los datos del actor con id=~${id}' son \n`, rows);
    } catch (error) {
        throw error;
    }
}

// Insertar actor nuevo
async function Query6() {
    try {
        const actor = { first_name: 'Acceso', last_name: 'Datos' };
        const [result] = await pool.query('INSERT INTO actores SET ?', actor);
            console.log(result);
        console.log(`Nuevo actor insertado con Id: ${result.insertId}`);
    } catch (error) {
        throw error;
    }
}

// Upadate un actor
async function Query7() {
    try {
        const actor = ['AccesoV2', 'DatosV2', 201]
        const [result] = await pool.query('UPDATE actores SET first_name = ?, last_name = ? WHERE actor_id = ?', actor);
            console.log(result);
        console.log(`Registros afectados: ${result.affectedRows}`);
    } catch (error) {
        throw error;
    }
}

// Upadate un actor distinta forma
async function Query8() {
    try {
        const name = 'AccesoV3';
        const lastName = 'DatosV3';
        const actorId = 201;

        const [result] = await pool.query('UPDATE actores SET ? WHERE actor_id = ?', 
        [{first_name: name, last_name: lastName},actorId]
        );
            console.log(result);
        console.log(`Registros afectados: ${result.affectedRows}`);
    } catch (error) {
        throw error;
    }
}

// Upadate un actor pasandole todo con un format
const mysql = require('mysql2');
async function Query9() {
    try {
        const name = 'AccesoV4';
        const lastName = 'DatosV4';
        const actorId = 201;

        const queryText = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?';
        const updateQuery = mysql.format( queryText, [
            'actores',
            'first_name',
            name,
            'last_name',
            lastName,
            'actor_id',
            actorId
        ])

        const [result] = await pool.query(updateQuery);
        console.log(result);
        console.log(`Registros afectados: ${result.affectedRows}`);
    } catch (error) {
        throw error;
    }
}

// Borrar actores del id pasado en adelante
async function Query10() {
    try {
        const id = 201;
        const [result] = await pool.query('DELETE FROM actores WHERE actor_id >= ?',
        [id]
        );
        console.log('Nº de filas eliminadas :', result.affectedRows);
    } catch (error) {
        throw error;
    }
}

(async () => {
    try {
        console.log("Inicio");
        //await Query1();
        //await Query2();
        await Query3();
        await Query4();
        await Query5();
        //await Query6();
        //await Query7();
        //await Query8();
        //await Query9();
        //await Query10();
    } catch (error) {
        console.log(error);
    }finally {
        pool.end();
        console.log("Desconectado de la Base de Datos...");
    }
})();