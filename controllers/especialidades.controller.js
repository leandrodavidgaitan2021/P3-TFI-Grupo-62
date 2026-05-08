import EspecialidadesService from "../services/especialidades.service.js";

export default class EspecialidadesController {
  constructor() {
    this.especialidades = new EspecialidadesService();
  }

  // GET con filtro
  lista = async (req, res) => {
    try {
      const { nombre } = req.query;
      const data = await this.especialidades.lista(nombre);

      res.status(200).send({
        status: "OK",
        message: "Lista especialidad/es",
        data,
      });
    } catch (error) {
      this.#error(res, error);
    }
  };

  // GET por ID
  busquedaId = async (req, res) => {
    try {
      const { especialidadId } = req.params;
      const data = await this.especialidades.buscaPorId(especialidadId);

      if (!data) {
        return res.status(404).send({
          status: "Fallo",
          error: "Inexistente",
        });
      }

      res.status(200).send({
        status: "OK",
        message: "Especialidad encontrada",
        data,
      });
    } catch (error) {
      this.#error(res, error);
    }
  };

  // POST
  registro = async (req, res) => {
    try {
      const { nombre } = req.body;
      const nombreMayus = nombre.toUpperCase();
      const nuevaEspecialidad = await this.especialidades.crea(nombreMayus);

      res.status(201).send({
        status: "OK",
        message: "Especialidad registrada con exito",
        data: nuevaEspecialidad,
      });
    } catch (error) {
      this.#error(res, error);
    }
  };

  // PUT
  modificacion = async (req, res) => {
    try {
      const { especialidadId } = req.params;
      const { nombre } = req.body;
      const nombreMayus = nombre.toUpperCase();

      const actualizada = await this.especialidades.actualiza(
        especialidadId,
        nombreMayus,
      );

      res.status(200).send({
        status: "OK",
        message: "Especialidad modificada con exito",
        data: actualizada,
      });
    } catch (error) {
      this.#error(res, error);
    }
  };

  // DELETE
  borrado = async (req, res) => {
    try {
      const { especialidadId } = req.params;
      await this.especialidades.elimina(especialidadId);

      res.status(200).send({
        status: "OK",
        message: "Especialidad borrada con exito",
      });
    } catch (error) {
      this.#error(res, error);
    }
  };

  // Manejo interno de errores
  #error = (res, error) => {
    res.status(error?.status || 500).send({
      status: "Fallo",
      message: error?.message || "Error interno",
    });
  };
}
