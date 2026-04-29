import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            estado: "error",
            // Esto devuelve un array de objetos con el campo y el mensaje de error
            errores: errores.array() 
        });
    }
    next();
};