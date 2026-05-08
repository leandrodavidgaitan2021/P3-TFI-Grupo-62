import express from "express";
import cors from "cors";
import helmet from "helmet";
import validateContextType from "./middlewares/validateContextType.js";

// Importación de versiones de la API
import v1Router from "./routes/v1/especialidades.routes.js";
import v2Router from "./routes/especialidades.routes.js";

const app = express();

// Middlewares
app.use(helmet());

// app.use(cors())
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(validateContextType);
app.use(express.json({ type: "application/json" }));

// Configuración de entorno
process.loadEnvFile();
const PUERTO = process.env.PUERTO || 3000;

// --- Definición de Rutas ---
// Versión 1: Enfoque Funcional
app.use("/api/v1/especialidades", v1Router);

// Versión 2: Enfoque Clases (Instancias)
app.use("/api/especialidades", v2Router);
app.use("/api/v2/especialidades", v2Router);

app.get("/", (req, res) => {
  res.status(200).send({
    status: "OK",
    message: "API en funcionamiento",
    versions: ["v1", "v2"],
  });
});

app.use((req, res) => {
  res.status(404).send({
    status: "Fallo",
    message: "La ruta solicitada no existe",
  });
});

// Inicio del servidor
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en: http://localhost:${PUERTO}`);
});
