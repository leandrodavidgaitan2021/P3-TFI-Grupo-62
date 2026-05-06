import { pool } from "../../db/conexion.js";

class EspecialidadDatabase {
  /**
   * Obtiene una especialidad activa por su ID.
   * Usado internamente por otros métodos mediante 'this'.
   */
  static getById = async (id) => {
    const sql =
      "SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?";
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  };

  /**
   * Lista todas las especialidades activas, opcionalmente filtradas por nombre.
   */
  static getAllActive = async (nombre) => {
    let sql = "SELECT * FROM especialidades WHERE activo = 1";
    const params = [];

    if (nombre) {
      sql += " AND nombre LIKE ?";
      params.push(`%${nombre}%`);
    }

    const [rows] = await pool.query(sql, params);
    return rows;
  };

  /**
   * Busca por nombre exacto.
   */
  static getByName = async (nombre) => {
    const sql = "SELECT * FROM especialidades WHERE nombre = ?";
    const [rows] = await pool.execute(sql, [nombre]);
    return rows[0];
  };

  /**
   * Obtiene el registro completo (ignora estado activo).
   */
  static getByIdRaw = async (id) => {
    const sql = "SELECT * FROM especialidades WHERE id_especialidad = ?";
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  };

  /**
   * Crea una nueva especialidad y retorna el objeto recién creado usando 'this'.
   */
  static create = async (nombre) => {
    const sql = "INSERT INTO especialidades (nombre) VALUES (?)";
    const [result] = await pool.execute(sql, [nombre]);

    // Gracias a 'this', llamamos a otro método de la clase
    return await this.getById(result.insertId);
  };

  /**
   * Actualiza y retorna si hubo cambios.
   */
  static update = async (id, nombre) => {
    const sql =
      "UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1";
    const [result] = await pool.execute(sql, [nombre, id]);
    return result.affectedRows;
  };

  /**
   * Borrado lógico.
   */
  static deleteLogical = async (id) => {
    const sql =
      "UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?";
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows;
  };
}

export default EspecialidadDatabase;
