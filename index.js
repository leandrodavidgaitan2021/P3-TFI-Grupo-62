import express from "express";
//import especialidadRoutes from "./routes/especialidadRoutes.js";
import { router as v1Router } from "./v1/especialidades.routes.js";
import { router as v2Router } from "./v2/especialidades.routes.js";

const app = express();
app.use(express.json());

process.loadEnvFile();
const PUERTO = process.env.PUERTO || 3000;

// Definición de rutas
app.use("/api/especialidades", v2Router);
app.use("/api/v1/especialidades", v1Router);
app.use("/api/v2/especialidades", v2Router);

// Ruta Principal
app.get("/", (req, res) => {
  res.status(200).send({ estado: "ok", msg: "API OK" });
});

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en puerto ${PUERTO}`);
});
