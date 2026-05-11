import express from "express";
import ObrasSocialesController from "../controllers/obrasSociales.controller.js";
import { validatorObraSocial } from "../validators/obraSocialValidator.js";

const router = express.Router();
const controller = new ObrasSocialesController();

router.get("/", controller.lista);
router.get("/:id", controller.busquedaId);
router.post("/", validatorObraSocial, controller.registro);
router.put("/:id", validatorObraSocial, controller.modificacion);
router.delete("/:id", controller.borrado);

export default router;
