const express = require("express");
const app = express();
const animaisRoutes = require("./routes/animais.routes");

app.use(express.json());
app.use("/animais", animaisRoutes);
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})