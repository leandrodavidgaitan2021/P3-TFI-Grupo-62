import EspecialidadDatabase from "../../database/v2/especialidades.database.js";

class EspecialidadService {
  /**
   * Lista especialidades activas.
   */
  static listar = async (nombre) => {
    return await EspecialidadDatabase.getAllActive(nombre);
  };

  /**
   * Busca por ID.
   * Reutilizamos este método internamente para validar existencia.
   */
  static buscarPorId = async (id) => {
    const especialidad = await EspecialidadDatabase.getById(id);
    if (!especialidad) {
      const error = new Error("Especialidad no encontrada");
      error.status = 404;
      throw error;
    }
    return especialidad;
  };

  /**
   * Crea una nueva especialidad validando duplicados.
   */
  static crear = async (nombre) => {
    const existe = await EspecialidadDatabase.getByName(nombre);
    if (existe) {
      const error = new Error("La especialidad ya existe");
      error.status = 409;
      throw error;
    }

    const nuevoId = await EspecialidadDatabase.create(nombre);
    return { id_especialidad: nuevoId, nombre };
  };

  /**
   * Actualiza una especialidad.
   */
  static actualizar = async (id, nombre) => {
    // Validamos duplicados de nombre en otros registros
    const existeNombre = await EspecialidadDatabase.getByName(nombre);
    if (existeNombre && existeNombre.id_especialidad !== parseInt(id)) {
      const error = new Error("Ya existe otra especialidad con ese nombre");
      error.status = 409;
      throw error;
    }

    const filasAfectadas = await EspecialidadDatabase.update(id, nombre);
    if (filasAfectadas === 0) {
      const error = new Error("No se encontró la especialidad para actualizar");
      error.status = 404;
      throw error;
    }

    // Usamos this para retornar el objeto actualizado mediante otro método de la clase
    return await this.buscarPorId(id);
  };

  /**
   * Borrado lógico de especialidad.
   */
  static eliminar = async (id) => {
    const especialidad = await EspecialidadDatabase.getByIdRaw(id);

    if (!especialidad) {
      const error = new Error("La especialidad no existe");
      error.status = 404;
      throw error;
    }

    if (especialidad.activo === 0) {
      const error = new Error("La especialidad ya había sido eliminada");
      error.status = 410;
      throw error;
    }

    await EspecialidadDatabase.deleteLogical(id);
    return { id, eliminado: true };
  };
}

export default EspecialidadService;
