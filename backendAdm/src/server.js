import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.routes.js";
import alunosRoutes from "./routes/alunos.routes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: true })); // libera para qualquer origem (ajuste conforme necessidade)
app.use(express.json());         // parse JSON

app.get("/", (req, res) => {
  res.json({ ok: true, message: "API Users MySQL" });
});

app.use("/api", usersRoutes);
app.use("/api", alunosRoutes);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
