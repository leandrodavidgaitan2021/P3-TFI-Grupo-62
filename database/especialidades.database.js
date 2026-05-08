import { pool } from "../db/conexion.js";

export default class Especialidades {
  getAll = async (nombre) => {
    let sql = "SELECT * FROM especialidades WHERE activo = 1";
    const params = [];

    if (nombre) {

      sql += " AND nombre LIKE ?";
      params.push(`%${nombre}%`);
    }

    const [rows] = await pool.query(sql, params);
    return rows;
  };

  getById = async (id) => {
    const sql =
      "SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?";
    const [rows] = await pool.execute(sql, [id]);
    return rows[0]; 
  };

  getByName = async (nombre) => {
    const sql = "SELECT * FROM especialidades WHERE nombre = ?";
    const [rows] = await pool.execute(sql, [nombre]);
    return rows[0];
  };

  getByIdRaw = async (id) => {
    const sql = "SELECT * FROM especialidades WHERE id_especialidad = ?";
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  };

  create = async (nombre) => {
    const sql = "INSERT INTO especialidades (nombre) VALUES (?)";
    const [result] = await pool.execute(sql, [nombre]);
    return result.insertId;
  };

  update = async (id, nombre) => {
    const sql =
      "UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1";
    const [result] = await pool.execute(sql, [nombre, id]);
    return result.affectedRows; 
  };

  deleteLogical = async (id) => {
    const sql =
      "UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?";
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows;
  };
}
