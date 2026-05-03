import express from "express";

import {
  listarEspecialidades,
  buscarEspecialidad,
  guardarEspecialidad,
  modificarEspecialidad,
  borrarEspecialidad,
} from "../controllers/especialidad.controller.js";

import { validatorEspecialidad } from "../validators/especialidadValidator.js";

const router = express.Router();

router.get("/", listarEspecialidades);
router.get("/:especialidadId", buscarEspecialidad);
router.post("/", validatorEspecialidad, guardarEspecialidad);
router.put("/:especialidadId", validatorEspecialidad, modificarEspecialidad);
router.delete("/:especialidadId", borrarEspecialidad);

export { router };
