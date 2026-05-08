import * as especialidadModel from "../database/especialidad.database.js";

export const obtenerEspecialidades = async (nombre) => {
  // Aquí podrías agregar lógica adicional, filtros, etc.
  return await especialidadModel.getAllActive(nombre);
};

export const obtenerEspecialidadPorId = async (id) => {
  return await especialidadModel.getById(id);
};

export const crearEspecialidad = async (nombre) => {
  const nombreDuplicado = await especialidadModel.getByName(nombre);

    if (nombreDuplicado) {
    throw new Error("Ya existe otra especialidad con ese nombre");
  }

  const nuevoId = await especialidadModel.create(nombre);
  
  return { id_especialidad: nuevoId, nombre };
};

export const actualizarEspecialidad = async (id, nombre) => {
  // 1. Verificar si el Id existe y si está activo
  const existeId = await especialidadModel.getById(id);

  if (!existeId) {
    throw new Error ("No se encontró la especialidad para actualizar");
  }
  // 2. Validar si el nombre nuevo ya existe en OTRA especialidad
  const existeNombre = await especialidadModel.getByName(nombre);
  if (existeNombre && existeNombre.id_especialidad !== parseInt(id)) {
    throw new Error("Ya existe otra especialidad con ese nombre");
  }

  // 3. Intentar actualizar
  const filasAfectadas = await especialidadModel.update(id, nombre);

  if (filasAfectadas === 0) {
    throw new Error("No se encontró la especialidad para actualizar");
  }

  return { id, nombre };
};

export const eliminarEspecialidad = async (id) => {
  // 1. Buscamos el registro por ID (sin filtrar por activo)
  // Usamos el modelo para obtener el registro completo
  const especialidad = await especialidadModel.getByIdRaw(id);

  // 2. Si no existe el ID en la tabla
  if (!especialidad) {
    throw new Error("La especialidad no existe");
  }

  // 3. Si existe pero ya tiene activo = 0
  if (especialidad.activo === 0) {
    throw new Error(
      "La especialidad ya había sido eliminada anteriormente"
    );
  }
  // 4. Si existe y está activa (activo = 1), procedemos al borrado lógico
  await especialidadModel.deleteLogical(id);

  return { id };
};
