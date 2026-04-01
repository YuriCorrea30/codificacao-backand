import express from "express";
import pacientesroutes from "./routes/pacientes.routes.js";

const app = express();

app.use(express.json());

app.use("/pacientes", pacientesroutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})