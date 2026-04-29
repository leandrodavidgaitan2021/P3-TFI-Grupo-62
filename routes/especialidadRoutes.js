import { Router } from "express";

import {
  listarEspecialidades,
  buscarEspecialidad,
  guardarEspecialidad,
  modificarEspecialidad,
  borrarEspecialidad,
} from "../controllers/especialidadController.js";

import { validatorEspecialidad } from "../validators/especialidadValidator.js";

const router = Router();

router.get("/", listarEspecialidades);
router.get("/:id_especialidad", buscarEspecialidad);
router.post("/", validatorEspecialidad, guardarEspecialidad);
router.put("/:id_especialidad", validatorEspecialidad, modificarEspecialidad);
router.delete("/:id_especialidad", borrarEspecialidad);

export default router;
