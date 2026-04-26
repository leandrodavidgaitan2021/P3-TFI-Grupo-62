import { Router } from "express";
import {
  listarEspecialidades,
  buscarEspecialidad,
  guardarEspecialidad,
  modificarEspecialidad,
  borrarEspecialidad,
} from "../controllers/especialidadController.js";

const router = Router();

router.get("/", listarEspecialidades);
router.get("/:id_especialidad", buscarEspecialidad);
router.post("/", guardarEspecialidad);
router.put("/:id_especialidad", modificarEspecialidad);
router.delete("/:id_especialidad", borrarEspecialidad);

export default router;
