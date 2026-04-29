import { body } from "express-validator";
import { validarCampos } from "../middlewares/validaCampos.js";

export const validatorEspecialidad = [
    body("nombre")
        .trim()
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres")
        .escape(),
    validarCampos // Llamamos al middleware que creamos antes
];