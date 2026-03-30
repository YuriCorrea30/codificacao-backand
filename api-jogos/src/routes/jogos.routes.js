const express = require("express");
const router = express.Router();

const jogos = require("../data/jogos");

// 🔹 GET ALL
router.get("/", (req, res) => {
  res.json(jogos);
});

// 🔹 GET BY ID
router.get("/:id", (req, res) => {
  const jogo = jogos.find(j => j.id == req.params.id);

  if (!jogo) {
    return res.status(404).json({ mensagem: "Jogo não encontrado" });
  }

  res.json(jogo);
});

module.exports = router;