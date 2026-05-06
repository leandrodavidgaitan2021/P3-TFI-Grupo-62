import EspecialidadService from "../../services/v2/especialidades.service.js";

class EspecialidadController {
  /**
   * Obtener todas las especialidades (con filtro opcional)
   */
  static listarEspecialidades = async (req, res) => {
    try {
      const { nombre } = req.query;
      const data = await EspecialidadService.listar(nombre);

      res.status(200).send({
        status: "OK",
        message: "Lista de especialidades obtenida con éxito",
        data,
      });
    } catch (error) {
      this.#manejarError(res, error);
    }
  };

  /**
   * Buscar una especialidad por ID
   */
  static buscarEspecialidad = async (req, res) => {
    try {
      const { especialidadId } = req.params;
      const data = await EspecialidadService.buscarPorId(especialidadId);

      if (!data) {
        // Importante: agregar 'return' para que no intente ejecutar el código de abajo
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
      this.#manejarError(res, error);
    }
  };

  /**
   * Crear una nueva especialidad
   */
  static guardarEspecialidad = async (req, res) => {
    try {
      const { nombre } = req.body;
      const nombreMayus = nombre.toUpperCase();
      const nuevaEspecialidad = await EspecialidadService.crear(nombreMayus);

      res.status(201).send({
        status: "OK",
        message: "Especialidad creada correctamente",
        data: nuevaEspecialidad,
      });
    } catch (error) {
      this.#manejarError(res, error);
    }
  };

  /**
   * Modificar una especialidad existente
   */
  static modificarEspecialidad = async (req, res) => {
    try {
      const { especialidadId } = req.params;
      const { nombre } = req.body;

      const nombreMayus = nombre.toUpperCase();
      const especialidadActualizada = await EspecialidadService.actualizar(
        especialidadId,
        nombreMayus,
      );

      res.status(200).send({
        status: "OK",
        message: "Especialidad actualizada con éxito",
        data: especialidadActualizada,
      });
    } catch (error) {
      this.#manejarError(res, error);
    }
  };

  /**
   * Borrado lógico de especialidad
   */
  static borrarEspecialidad = async (req, res) => {
    try {
      const { especialidadId } = req.params;
      await EspecialidadService.eliminar(especialidadId);

      res.status(200).send({
        status: "OK",
        message: `Especialidad con ID ${especialidadId} eliminada correctamente`,
      });
    } catch (error) {
      this.#manejarError(res, error);
    }
  };

  /**
   * Método privado para centralizar el manejo de errores usando 'this'
   * (Nota: el # lo hace privado en versiones modernas de JS)
   */
  static #manejarError = (res, error) => {
    console.error("Error en EspecialidadController:", error);
    res.status(error?.status || 500).send({
      status: "Fallo",
      message: error?.message || "Ocurrió un error inesperado en el servidor",
      error: error?.code || "INTERNAL_ERROR",
    });
  };
}

export default EspecialidadController;
