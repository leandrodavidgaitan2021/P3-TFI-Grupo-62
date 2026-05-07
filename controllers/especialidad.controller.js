import * as especialidadService from "../services/especialidad.service.js";

export const listarEspecialidades = async (req, res) => {
  try {
    const { nombre } = req.query; // Extrae el filtro de la URL
    const data = await especialidadService.obtenerEspecialidades(nombre);
    res.send(data);
  } catch (error) {
    console.error(error);
    res
      .status(error?.status || 500)
      .send({ status: "Fallo", error: error?.message || error });
  }
};

export const buscarEspecialidad = async (req, res) => {
  try {
    const id = req.params.especialidadId;
    const data = await especialidadService.obtenerEspecialidadPorId(id);

    if (!data) {
      // Importante: agregar 'return' para que no intente ejecutar el código de abajo
      return res.status(404).send({
        status: "Fallo",
        error: "Especialidad no encontrada.",
      });
    }

    res.send(data);
  } catch (error) {
    console.error(error);
    res
      .status(error?.status || 500)
      .send({ status: "Fallo", error: error?.message || error });
  }
};

export const guardarEspecialidad = async (req, res) => {
  try {
    const { nombre } = req.body;

    const nombreMayus = nombre.toUpperCase();
    const nuevaEspecialidad =
      await especialidadService.crearEspecialidad(nombreMayus);

    res.status(201).send({
      status: "OK",
      data: nuevaEspecialidad});
  } catch (error) {
    console.error(error);
    res
      .status(error?.status || 500)
      .send({ status: "Fallo", error: error?.message || error });
  }
};

export const modificarEspecialidad = async (req, res) => {
  try {
    const especialidadId = req.params.especialidadId;
    const body = req.body;

    const nombreMayus = nombre.toUpperCase();
    const especialidadActualizada =
      await especialidadService.actualizarEspecialidad(
        especialidadId,
        nombreMayus,
      );

    res.status(200).send(especialidadActualizada);
  } catch (error) {
    console.error(error);
    res
      .status(error?.status || 500)
      .send({ status: "Fallo", error: error?.message || error });
  }
};

export const borrarEspecialidad = async (req, res) => {
  try {
    const especialidadId = req.params.especialidadId;
    await especialidadService.eliminarEspecialidad(especialidadId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res
      .status(error?.status || 500)
      .send({ status: "Fallo", error: error?.message || error });
  }
};
