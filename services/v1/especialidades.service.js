import * as EspecialidadesDatabase from "../../database/v1/especialidades.database.js";

export const obtenerEspecialidades = async (nombre) => {
  return await EspecialidadesDatabase.getAllActive(nombre);
};

export const obtenerEspecialidadPorId = async (id) => {
  const especialidad = await EspecialidadesDatabase.getById(id);
  if (!especialidad) {
    const error = new Error("Especialidad no encontrada");
    error.status = 404;
    throw error;
  }
  return especialidad;
};

export const crearEspecialidad = async (nombre) => {
  const nuevoId = await EspecialidadesDatabase.create(nombre);

  return { id_especialidad: nuevoId, nombre };
};

export const actualizarEspecialidad = async (id, nombre) => {
  const existeNombre = await EspecialidadesDatabase.getByName(nombre);
  if (existeNombre && existeNombre.id_especialidad !== parseInt(id)) {
    const error = new Error("Ya existe otra especialidad con ese nombre");
    error.status = 409;
    throw error;
  }

  const filasAfectadas = await EspecialidadesDatabase.update(id, nombre);

  if (filasAfectadas === 0) {
    const error = new Error("No se encontró la especialidad para actualizar");
    error.status = 404;
    throw error;
  }

  return { id, nombre };
};

export const eliminarEspecialidad = async (id) => {
  const especialidad = await EspecialidadesDatabase.getByIdRaw(id);

  if (!especialidad) {
    const error = new Error("La especialidad no existe");
    error.status = 404;
    throw error;
  }

  if (especialidad.activo === 0) {
    const error = new Error(
      "La especialidad ya había sido eliminada anteriormente",
    );
    error.status = 410;
    throw error;
  }

  await EspecialidadesDatabase.deleteLogical(id);

  return { id };
};
