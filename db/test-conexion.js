import { pool } from './conexion.js'

export async function testConexion() {
    try {
        const con = await pool.getConnection()
        console.log("Conexion con base de datos Ok")

        const [results] = await con.query("SELECT")

    } catch {

    }
}