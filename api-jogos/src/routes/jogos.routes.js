const express = require("express");
const router = express.Router();

const { readData, writeData } = require("../utils/fileHandler");

//  GET ALL
router.get("/", (req, res) => {
  try {
    const jogos = readData();

    res.status(200).json({
      success: true,
      data: jogos
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar jogos"
    });
  }
});

// GET BY ID
router.get("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido"
      });
    }

    const jogos = readData();
    const jogo = jogos.find(j => j.id === id);

    if (!jogo) {
      return res.status(404).json({
        success: false,
        message: "Jogo não encontrado"
      });
    }

    res.status(200).json({
      success: true,
      data: jogo
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar jogo"
    });
  }
});

// CREATE
router.post("/", (req, res) => {
  try {
    const { nome, genero } = req.body;

    if (!nome || !genero) {
      return res.status(400).json({
        success: false,
        message: "Nome e gênero são obrigatórios"
      });
    }

    const jogos = readData();

    const novoJogo = {
      id: jogos.length ? jogos[jogos.length - 1].id + 1 : 1,
      nome: nome.trim(),
      genero: genero.trim()
    };

    jogos.push(novoJogo);
    writeData(jogos);

    res.status(201).json({
      success: true,
      data: novoJogo
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao criar jogo"
    });
  }
});

// UPDATE (PATCH)
router.patch("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido"
      });
    }

    const jogos = readData();
    const index = jogos.findIndex(j => j.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Jogo não encontrado"
      });
    }

    jogos[index] = {
      ...jogos[index],
      ...req.body
    };

    writeData(jogos);

    res.status(200).json({
      success: true,
      data: jogos[index]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar jogo"
    });
  }
});

// 🔹 DELETE
router.delete("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido"
      });
    }

    const jogos = readData();
    const novosJogos = jogos.filter(j => j.id !== id);

    if (jogos.length === novosJogos.length) {
      return res.status(404).json({
        success: false,
        message: "Jogo não encontrado"
      });
    }

    writeData(novosJogos);

    res.status(200).json({
      success: true,
      message: "Jogo removido com sucesso"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao remover jogo"
    });
  }
});

module.exports = router;