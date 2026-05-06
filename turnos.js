import express from "express";
//middleware que valida que solo se reciba datos en json
import validateContextType from "./middlewares/validateContextType.js";
// importa versiones de la api
import v1Router from "./routes/v1/especialidades.routes.js";
import v2Router from "./routes/v2/especialidades.routes.js";

const app = express();

app.use(validateContextType);
app.use(express.json({ type: "application/json" }));

process.loadEnvFile();
const PUERTO = process.env.PUERTO || 3000;

// Definición de rutas con versiones
// Versión 1: Funciones
app.use('/api/v1/especialidades', routerV1);

// Versión 2: Clases 
app.use('/api/especialidades', routerV2);
app.use('/api/v2/especialidades', routerV2);

// Ruta Principal
app.get("/", (req, res) => {
  res.status(200).send({ status: "ok", msg: "API OK" });
});

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en puerto ${PUERTO}`);
});
