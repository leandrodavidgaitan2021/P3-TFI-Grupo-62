import express from "express";
import especialidadRoutes from "./routes/especialidadRoutes.js";

const app = express();
app.use(express.json());

process.loadEnvFile();
const PUERTO = process.env.PUERTO || 3000;

// Definición de rutas
app.use("/especialidades", especialidadRoutes);

app.get("/", (req, res) => {
  res.status(200).send({ estado: "ok", msg: "API OK" });
});

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en puerto ${PUERTO}`);
});
