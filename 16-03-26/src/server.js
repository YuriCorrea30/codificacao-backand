const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let frutinhas = [
  { id: 1, nome: "Morango" },
  { id: 2, nome: "Uva verde crok-crok" },
  { id: 3, nome: "Melancia" }
];

app.get('/frutinhas/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const frutinha = frutinhas.find(f => f.id === id);

  if (!frutinha) {
    return res.status(404).json({
      success: false,
      message: "Frutinha não encontrada"
    });
  }

  res.json(frutinha);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});