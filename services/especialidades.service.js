import Especialidades from "../database/especialidades.database.js";

export default class EspecialidadesService {
  constructor() {
    this.especialidades = new Especialidades();
  }

  lista = async (nombre) => {
    return await this.especialidades.getAll(nombre);
  };

  buscaPorId = async (id) => {
    const especialidad = await this.especialidades.getById(id);
    if (!especialidad) {
      const error = new Error("Especialidad no encontrada");
      error.status = 404;
      throw error;
    }
    return especialidad;
  };

  crea = async (nombre) => {
    const nuevaId = await this.especialidades.create(nombre);
    return { id_especialidad: nuevaId, nombre };
  };

  actualiza = async (id, nombre) => {
    const existeNombre = await this.especialidades.getByName(nombre);
    if (existeNombre && existeNombre.id_especialidad !== parseInt(id)) {
      const error = new Error("Ya existe otra especialidad con ese nombre");
      error.status = 409;
      throw error;
    }

    const filasAfectadas = await this.especialidades.update(id, nombre);
    if (filasAfectadas === 0) {
      const error = new Error("No se encontró la especialidad para actualizar");
      error.status = 404;
      throw error;
    }

    return { id, nombre };
  };

  elimina = async (id) => {
    const especialidad = await this.especialidades.getByIdRaw(id);

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

    await this.especialidades.deleteLogical(id);
    return { id };
  };
}
