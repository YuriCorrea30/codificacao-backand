import express from "express";
import animaisRoutes from "./routes/animais.routes.js";

const app = express();

app.use(express.json());
app.use("/animais", animaisRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
}); 