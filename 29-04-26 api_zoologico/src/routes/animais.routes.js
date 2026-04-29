const express = require("express");
const router = express.Router();

const { readData, writeData } = require("../utils/fileHandler");

// 🔹 GET ALL
router.get("/", (req, res) => {
  try {
    const animais = readData();

    res.status(200).json({
      success: true,
      data: animais
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar animais"
    });
  }
});

// 🔹 GET BY ID
router.get("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido"
      });
    }

    const animais = readData();
    const animal = animais.find(a => a.id === id);

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: "Animal não encontrado"
      });
    }

    res.status(200).json({
      success: true,
      data: animal
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar animal"
    });
  }
});

// 🔹 CREATE
router.post("/", (req, res) => {
  try {
    const { nome, especie } = req.body;

    if (!nome || !especie) {
      return res.status(400).json({
        success: false,
        message: "Nome e espécie são obrigatórios"
      });
    }

    const animais = readData();

    const novoAnimal = {
      id: animais.length ? animais[animais.length - 1].id + 1 : 1,
      nome,
      especie
    };

    animais.push(novoAnimal);
    writeData(animais);

    res.status(201).json({
      success: true,
      data: novoAnimal
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao criar animal"
    });
  }
});

// 🔹 UPDATE
router.patch("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido"
      });
    }

    const animais = readData();
    const index = animais.findIndex(a => a.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Animal não encontrado"
      });
    }

    animais[index] = {
      ...animais[index],
      ...req.body
    };

    writeData(animais);

    res.status(200).json({
      success: true,
      data: animais[index]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar animal"
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

    const animais = readData();
    const novosAnimais = animais.filter(a => a.id !== id);

    if (animais.length === novosAnimais.length) {
      return res.status(404).json({
        success: false,
        message: "Animal não encontrado"
      });
    }

    writeData(novosAnimais);

    res.status(200).json({
      success: true,
      message: "Animal removido com sucesso"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao remover animal"
    });
  }
});

module.exports = router;