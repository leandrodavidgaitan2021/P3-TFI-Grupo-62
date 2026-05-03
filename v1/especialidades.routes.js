import express from "express";

import {
  listarEspecialidades,
  buscarEspecialidad,
} from "../controllers/especialidad.controller.js";

const router = express.Router();

router.get("/", listarEspecialidades);
router.get("/:especialidadId", buscarEspecialidad);

export { router };
