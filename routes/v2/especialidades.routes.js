import express from "express";

import EspecialidadController from "../../controllers/v2/especialidades.controller.js";

import { validatorEspecialidad } from "../../validators/especialidadValidator.js";

const router = express.Router();

router.get("/", EspecialidadController.listarEspecialidades);
router.get("/:especialidadId", EspecialidadController.buscarEspecialidad);
router.post(
  "/",
  validatorEspecialidad,
  EspecialidadController.guardarEspecialidad,
);
router.put(
  "/:especialidadId",
  validatorEspecialidad,
  EspecialidadController.modificarEspecialidad,
);
router.delete("/:especialidadId", EspecialidadController.borrarEspecialidad);


export default router;