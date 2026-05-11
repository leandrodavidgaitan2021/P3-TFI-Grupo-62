import ObrasSociales from "../database/obrasSociales.database.js";

export default class ObrasSocialesService {
  constructor() {
    this.obrasSociales = new ObrasSociales();
  }

  lista = async (nombre) => {
    return await this.obrasSociales.getAll(nombre);
  };

  buscaPorId = async (id) => {
    const obraSocial = await this.obrasSociales.getById(id);
    if (!obraSocial) {
      const error = new Error("Obra Social no encontrada");
      error.status = 404;
      throw error;
    }
    return obraSocial;
  };

  crea = async (datos) => {
    const nuevaId = await this.obrasSociales.create(datos);
    return { id_obra_social: nuevaId, ...datos };
  };

  actualiza = async (id, datos) => {
    const existeNombre = await this.obrasSociales.getByName(datos.nombre);
    if (existeNombre && existeNombre.id_obra_social !== parseInt(id)) {
      const error = new Error("Ya existe otra obra social con ese nombre");
      error.status = 409;
      throw error;
    }

    const filasAfectadas = await this.obrasSociales.update(id, datos);
    if (filasAfectadas === 0) {
      const error = new Error("No se encontró la obra social para actualizar");
      error.status = 404;
      throw error;
    }

    return { id, ...datos };
  };

  elimina = async (id) => {
    const obraSocial = await this.obrasSociales.getByIdRaw(id);

    if (!obraSocial) {
      const error = new Error("La obra social no existe");
      error.status = 404;
      throw error;
    }

    if (obraSocial.activo === 0) {
      const error = new Error("La obra social ya había sido eliminada");
      error.status = 410;
      throw error;
    }

    await this.obrasSociales.deleteLogical(id);
    return { id };
  };
}