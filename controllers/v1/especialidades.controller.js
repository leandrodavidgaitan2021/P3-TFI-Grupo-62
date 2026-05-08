import * as EspecialidadesService from "../../services/v1/especialidades.service.js";

export const listarEspecialidades = async (req, res) => {
  try {
    const { nombre } = req.query; 
    const data = await EspecialidadesService.obtenerEspecialidades(nombre);
    res.status(200).send({
      status: "OK",
      message: "Lista de especialidades obtenida con éxito",
      data,
    });
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
    const data = await EspecialidadesService.obtenerEspecialidadPorId(id);

    if (!data) {
      
      return res.status(404).send({
        status: "Fallo",
        error: "Especialidad no encontrada.",
      });
    }

    res.status(200).send({
      status: "OK",
      message: "Especialidad encontrada",
      data,
    });
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
      await EspecialidadesService.crearEspecialidad(nombreMayus);

    res.status(201).send({
      status: "OK",
      message: "Especialidad creada correctamente",
      data: nuevaEspecialidad,
    });
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
    const { nombre } = req.body;

    const nombreMayus = nombre.toUpperCase();
    const especialidadActualizada =
      await EspecialidadesService.actualizarEspecialidad(
        especialidadId,
        nombreMayus,
      );

    res.status(200).send({
      status: "OK",
      message: "Especialidad actualizada con éxito",
      data: especialidadActualizada,
    });
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
    await EspecialidadesService.eliminarEspecialidad(especialidadId);

    res.status(200).send({
      status: "OK",
      message: `Especialidad con ID ${especialidadId} eliminada correctamente`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error?.status || 500)
      .send({ status: "Fallo", error: error?.message || error });
  }
};
