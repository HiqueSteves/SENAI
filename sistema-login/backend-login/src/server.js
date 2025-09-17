import express from "express";
import cors from "cors";
import "dotenv/config";

import usuariosRoutes from "./routes/usuarios.routes.js";       // novo

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", usuariosRoutes);

app.get("/", (_req, res) => res.send("API ok"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
