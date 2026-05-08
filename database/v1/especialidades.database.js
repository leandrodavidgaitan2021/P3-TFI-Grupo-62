import { pool } from "../../db/conexion.js";

export const getAllActive = async (nombre) => {
  let sql = "SELECT * FROM especialidades WHERE activo = 1";
  const params = [];

  if (nombre) {
    sql += " AND nombre LIKE ?";
    params.push(`%${nombre}%`); 
  }

  const [rows] = await pool.query(sql, params);
  return rows;
};

export const getById = async (id) => {
  const sql =
    "SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?";
  const [rows] = await pool.execute(sql, [id]);
  return rows[0]; 
};

export const getByName = async (nombre) => {
  const sql = "SELECT * FROM especialidades WHERE nombre = ?";
  const [rows] = await pool.execute(sql, [nombre]);
  return rows[0];
};

export const getByIdRaw = async (id) => {
  const sql = "SELECT * FROM especialidades WHERE id_especialidad = ?";
  const [rows] = await pool.execute(sql, [id]);
  return rows[0];
};

export const create = async (nombre) => {
  const sql = "INSERT INTO especialidades (nombre) VALUES (?)";
  const [result] = await pool.execute(sql, [nombre]);
  return result.insertId;
};

export const update = async (id, nombre) => {
  const sql =
    "UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1";
  const [result] = await pool.execute(sql, [nombre, id]);
  return result.affectedRows; 
};

export const deleteLogical = async (id) => {
  const sql = "UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?";
  const [result] = await pool.execute(sql, [id]);
  return result.affectedRows;
};
