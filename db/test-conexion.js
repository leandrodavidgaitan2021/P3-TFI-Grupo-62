import { pool } from './conexion.js'

export async function testConexion() {
    try {
        const con = await pool.getConnection();
        console.log("Conexión con base de datos Ok");

        const [results] = await con.query("SELECT DATABASE() AS db_name")
        console.table(results)

        con.release();

    } catch (error) {
        console.log("Error al conectarse a la base de datos");
        console.error ({código: error.code});
        process.exit(1);
    };
};
