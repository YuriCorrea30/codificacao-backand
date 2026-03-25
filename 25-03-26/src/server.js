const express = require("express");
const app = express();
const filmeRoutes = require("./routes/filmes.routes");

app.use(express.json());
app.use(filmeRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});