import { body } from "express-validator";
import { validarCampos } from "../middlewares/validaCampos.js";

export const validatorEspecialidad = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3, max: 120 })
    .withMessage("El nombre debe tener entre 3 y 120 caracteres")
    .escape(),
  validarCampos, // Llamamos al middleware que creamos antes
];
