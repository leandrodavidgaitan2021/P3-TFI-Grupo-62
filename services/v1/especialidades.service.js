import * as EspecialidadDatabase from "../../database/v1/especialidades.database.js";

export const obtenerEspecialidades = async (nombre) => {
  // Aquí podrías agregar lógica adicional, filtros, etc.
  return await EspecialidadDatabase.getAllActive(nombre);
};

export const obtenerEspecialidadPorId = async (id) => {
  const especialidad = await EspecialidadDatabase.getById(id);
  if (!especialidad) {
    throw new Error("NOT_FOUND");
  }
  return especialidad;
};

export const crearEspecialidad = async (nombre) => {
  const nuevoId = await EspecialidadDatabase.create(nombre);

  return { id_especialidad: nuevoId, nombre };
};

export const actualizarEspecialidad = async (id, nombre) => {
  // 1. Validar si el nombre nuevo ya existe en OTRA especialidad
  const existeNombre = await EspecialidadDatabase.getByName(nombre);
  if (existeNombre && existeNombre.id_especialidad !== parseInt(id)) {
    const error = new Error("Ya existe otra especialidad con ese nombre");
    error.status = 409;
    throw error;
  }

  // 2. Intentar actualizar
  const filasAfectadas = await EspecialidadDatabase.update(id, nombre);

  if (filasAfectadas === 0) {
    const error = new Error("No se encontró la especialidad para actualizar");
    error.status = 404;
    throw error;
  }

  return { id, nombre };
};

export const eliminarEspecialidad = async (id) => {
  // 1. Buscamos el registro por ID (sin filtrar por activo)
  // Usamos el modelo para obtener el registro completo
  const especialidad = await EspecialidadDatabase.getByIdRaw(id);

  // 2. Si no existe el ID en la tabla
  if (!especialidad) {
    const error = new Error("La especialidad no existe");
    error.status = 404;
    throw error;
  }

  // 3. Si existe pero ya tiene activo = 0
  if (especialidad.activo === 0) {
    const error = new Error(
      "La especialidad ya había sido eliminada anteriormente",
    );
    error.status = 410; // 410 Gone es ideal para recursos "borrados"
    throw error;
  }

  // 4. Si existe y está activa (activo = 1), procedemos al borrado lógico
  await EspecialidadDatabase.deleteLogical(id);

  return { id };
};
