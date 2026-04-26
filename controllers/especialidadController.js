import * as especialidadService from "../services/especialidadService.js";

export const listarEspecialidades = async (req, res) => {
  try {
    const datos = await especialidadService.obtenerEspecialidades();
    res.status(200).send({ estado: "ok", especialidades: datos });
  } catch (error) {
    res.status(500).send({ estado: "error", msg: error.message });
  }
};

export const buscarEspecialidad = async (req, res) => {
  try {
    const id = req.params.id_especialidad;
    const especialidad = await especialidadService.obtenerEspecialidadPorId(id);
    res.status(200).send({ estado: "ok", especialidad });
  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).send({ estado: "error", msg: "No encontrada" });
    }
    res.status(500).send({ estado: "error", msg: "Error interno" });
  }
};

export const guardarEspecialidad = async (req, res) => {
  try {
    const { nombre } = req.body;

    // Validación básica de entrada
    if (!nombre) {
      return res
        .status(400)
        .send({ estado: "error", msg: "El nombre es requerido" });
    }

    const nuevaEspecialidad =
      await especialidadService.crearEspecialidad(nombre);

    res.status(201).send({
      estado: "ok",
      msg: "Especialidad creada con éxito",
      data: nuevaEspecialidad,
    });
  } catch (error) {
    // Si el error tiene un status (como el 409 que pusimos en el service), lo usamos
    const statusCode = error.status || 500;
    res.status(statusCode).send({
      estado: "error",
      msg: error.message || "Error interno del servidor",
    });
  }
};

export const modificarEspecialidad = async (req, res) => {
  try {
    const { id_especialidad } = req.params;
    const { nombre } = req.body;

    if (!nombre) {
      return res
        .status(400)
        .send({ estado: "error", msg: "El nombre es requerido" });
    }

    const actualizado = await especialidadService.actualizarEspecialidad(
      id_especialidad,
      nombre,
    );

    res.status(200).send({
      estado: "ok",
      msg: "Especialidad actualizada correctamente",
      data: actualizado,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      estado: "error",
      msg: error.message,
    });
  }
};

export const borrarEspecialidad = async (req, res) => {
  try {
    const { id_especialidad } = req.params;
    await especialidadService.eliminarEspecialidad(id_especialidad);

    res.status(200).send({
      estado: "ok",
      msg: `Especialidad ${id_especialidad} eliminada (lógicamente)`,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      estado: "error",
      msg: error.message,
    });
  }
};
