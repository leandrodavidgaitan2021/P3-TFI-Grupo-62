import * as especialidadModel from "../models/especialidadModel.js";

export const obtenerEspecialidades = async () => {
  // Aquí podrías agregar lógica adicional, filtros, etc.
  return await especialidadModel.getAllActive();
};

export const obtenerEspecialidadPorId = async (id) => {
  const especialidad = await especialidadModel.getById(id);
  if (!especialidad) {
    throw new Error("NOT_FOUND");
  }
  return especialidad;
};

export const crearEspecialidad = async (nombre) => {
  // 1. Chequear si ya existe
  const existe = await especialidadModel.getByName(nombre);

  if (existe) {
    // Lanzamos un error específico que el controlador sepa manejar
    const error = new Error("La especialidad ya existe");
    error.status = 409; // Conflict
    throw error;
  }

  // 2. Si no existe, crearla
  const nuevoId = await especialidadModel.create(nombre);
  return { id_especialidad: nuevoId, nombre };
};

export const actualizarEspecialidad = async (id, nombre) => {
  // 1. Validar si el nombre nuevo ya existe en OTRA especialidad
  const existeNombre = await especialidadModel.getByName(nombre);
  if (existeNombre && existeNombre.id_especialidad !== parseInt(id)) {
    const error = new Error("Ya existe otra especialidad con ese nombre");
    error.status = 409;
    throw error;
  }

  // 2. Intentar actualizar
  const filasAfectadas = await especialidadModel.update(id, nombre);

  if (filasAfectadas === 0) {
    const error = new Error("No se encontró la especialidad para actualizar");
    error.status = 404;
    throw error;
  }

  return { id, nombre };
};

export const eliminarEspecialidad = async (id) => {
  const filasAfectadas = await especialidadModel.deleteLogical(id);

  if (filasAfectadas === 0) {
    const error = new Error("La especialidad no existe o ya fue eliminada");
    error.status = 404;
    throw error;
  }

  return { id };
};
