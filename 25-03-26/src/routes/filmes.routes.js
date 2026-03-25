const express = require("express");
const router = express.Router();
const service = require("../services/filmes.service");

// GET ALL
router.get("/filmes", (req, res) => {
  const data = service.getAll();
  res.json(data);
});

// GET BY ID
router.get("/filmes/:id", (req, res) => {
    const id = req.params.id;
    const filme = service.getById(id);

    if (!filme) {
        return res.status(404).json({ mensagem: " filme não encontrado"});
    }

    res.json(filme);
});

module.exports = router;