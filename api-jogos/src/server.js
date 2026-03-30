const express = require("express");
const app = express();

const jogosRoutes = require("./routes/jogos.routes");

app.use(express.json());

// usar rota
app.use("/jogos", jogosRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});