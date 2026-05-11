import ObrasSocialesService from "../services/obrasSociales.service.js";

export default class ObrasSocialesController {
  constructor() {
    this.service = new ObrasSocialesService();
  }

  lista = async (req, res) => {
    try {
      const { nombre } = req.query;
      const data = await this.service.lista(nombre);
      res.status(200).send({
        status: "OK",
        message: "Lista de Obras Sociales",
        data,
      });
    } catch (error) {
      this.#error(res, error);
    }
  };

  busquedaId = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await this.service.buscaPorId(id);
      res.status(200).send({
        status: "OK",
        message: "Obra social encontrada",
        data,
      });
    } catch (error) {
      this.#error(res, error);
    }
  };

  registro = async (req, res) => {
    try {
      const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;
      const datos = {
        nombre: nombre.toUpperCase(),
        descripcion,
        porcentaje_descuento,
        es_particular: es_particular || 0
      };
      
      const nuevaObra = await this.service.crea(datos);
      res.status(201).send({
        status: "OK",
        message: "Obra social registrada con éxito",
        data: nuevaObra,
      });
    } catch (error) {
      this.#error(res, error);
    }
  };

  modificacion = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;
      const datos = {
        nombre: nombre.toUpperCase(),
        descripcion,
        porcentaje_descuento,
        es_particular
      };

      const actualizada = await this.service.actualiza(id, datos);
      res.status(200).send({
        status: "OK",
        message: "Obra social modificada con éxito",
        data: actualizada,
      });
    } catch (error) {
      this.#error(res, error);
    }
  };

  borrado = async (req, res) => {
    try {
      const { id } = req.params;
      await this.service.elimina(id);
      res.status(200).send({
        status: "OK",
        message: "Obra social borrada con éxito",
      });
    } catch (error) {
      this.#error(res, error);
    }
  };

  #error = (res, error) => {
    res.status(error?.status || 500).send({
      status: "Fallo",
      message: error?.message || "Error interno",
    });
  };
}