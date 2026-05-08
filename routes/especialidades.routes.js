import express from "express";

import EspecialidadesController from "../controllers/especialidades.controller.js";

import { validatorEspecialidad } from "../validators/especialidadValidator.js";

const router = express.Router();

const especialidadesController = new EspecialidadesController();

router.get("/", especialidadesController.lista);
router.get("/:especialidadId", especialidadesController.busquedaId);
router.post("/", validatorEspecialidad, especialidadesController.registro);
router.put(
  "/:especialidadId",
  validatorEspecialidad,
  especialidadesController.modificacion,
);
router.delete("/:especialidadId", especialidadesController.borrado);

export default router;
