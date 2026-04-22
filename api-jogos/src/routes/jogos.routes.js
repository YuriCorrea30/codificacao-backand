const express = require("express");
const router = express.Router();

const { readData, writeData } = require("../utils/fileHandler");

// 🔹 GET ALL
router.get("/", (req, res) => {
  const jogos = readData();
  res.json(jogos);
});

// 🔹 GET BY ID
router.get("/:id", (req, res) => {
  const jogos = readData();
  const jogo = jogos.find(j => j.id == req.params.id);

  if (!jogo) {
    return res.status(404).json({ mensagem: "Jogo não encontrado" });
  }

  res.json(jogo);
});

// 🔹 CREATE
router.post("/", (req, res) => {
  const jogos = readData();

  const novoJogo = {
    id: jogos.length ? jogos[jogos.length - 1].id + 1 : 1,
    nome: req.body.nome,
    genero: req.body.genero
  };

  jogos.push(novoJogo);
  writeData(jogos);

  res.status(201).json(novoJogo);
});

// 🔹 UPDATE
router.patch("/:id", (req, res) => {
  const jogos = readData();
  const index = jogos.findIndex(j => j.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Jogo não encontrado" });
  }

  jogos[index] = {
    ...jogos[index],
    ...req.body
  };

  writeData(jogos);

  res.json(jogos[index]);
});

// 🔹 DELETE
router.delete("/:id", (req, res) => {
  const jogos = readData();
  const novosJogos = jogos.filter(j => j.id != req.params.id);

  if (jogos.length === novosJogos.length) {
    return res.status(404).json({ mensagem: "Jogo não encontrado" });
  }

  writeData(novosJogos);

  res.json({ mensagem: "Jogo removido com sucesso" });
});

module.exports = router;