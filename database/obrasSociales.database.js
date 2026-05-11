import { pool } from "../db/conexion.js";

export default class ObrasSociales {
  getAll = async (nombre) => {
    let sql = "SELECT * FROM obras_sociales WHERE activo = 1";
    const params = [];

    if (nombre) {
      sql += " AND nombre LIKE ?";
      params.push(`%${nombre}%`);
    }

    const [rows] = await pool.query(sql, params);
    return rows;
  };

  getById = async (id) => {
    const sql = "SELECT * FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?";
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  };

  getByName = async (nombre) => {
    const sql = "SELECT * FROM obras_sociales WHERE nombre = ?";
    const [rows] = await pool.execute(sql, [nombre]);
    return rows[0];
  };

  getByIdRaw = async (id) => {
    const sql = "SELECT * FROM obras_sociales WHERE id_obra_social = ?";
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  };

  create = async (data) => {
    const { nombre, descripcion, porcentaje_descuento, es_particular } = data;
    const sql = `INSERT INTO obras_sociales 
                 (nombre, descripcion, porcentaje_descuento, es_particular) 
                 VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular,
    ]);
    return result.insertId;
  };

  update = async (id, data) => {
    const { nombre, descripcion, porcentaje_descuento, es_particular } = data;
    const sql = `UPDATE obras_sociales 
                 SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ? 
                 WHERE id_obra_social = ? AND activo = 1`;
    const [result] = await pool.execute(sql, [
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular,
      id,
    ]);
    return result.affectedRows;
  };

  deleteLogical = async (id) => {
    const sql = "UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?";
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows;
  };
}