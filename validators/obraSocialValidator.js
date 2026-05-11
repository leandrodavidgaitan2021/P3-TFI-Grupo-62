import { body } from "express-validator";
import { validarCampos } from "../middlewares/validaCampos.js";

export const validatorObraSocial = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 120 })
    .withMessage("El nombre debe tener entre 2 y 120 caracteres")
    .escape(),

  body("descripcion")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("La descripción no puede superar los 255 caracteres")
    .escape(),

  body("porcentaje_descuento")
    .notEmpty()
    .withMessage("El porcentaje de descuento es obligatorio")
    .isFloat({ min: 0, max: 100 })
    .withMessage("El porcentaje debe ser un número entre 0 y 100")
    .toFloat(),

  body("es_particular")
    .notEmpty()
    .withMessage("Debe especificar si es particular o no")
    .isInt({ min: 0, max: 1 })
    .withMessage("El valor de seleccionar Si o No")
    .toInt(),

  validarCampos,
];
