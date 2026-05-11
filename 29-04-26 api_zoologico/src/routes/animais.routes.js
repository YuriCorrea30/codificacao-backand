import { Router } from "express";
//buscar animais
import { animaisService } from "../services/aminais.service.js";
//ler arquivos
import { readData, writeData } from "../utils/fileHandler.js";

const router = Router();

// GET ALL retorna todos os animais
//Essa rota GET busca todos os animais usando o service e retorna os dados em JSON. Se ocorrer algum erro, retorna status 500.
router.get("/", async (req, res) => {
  try {
    const data = await animaisService.getAll(readData);
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false });
  }
});

// GET BY ID busca por id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

 //verifica se o id é invalido
 if (isNaN(id)) {
    return res.status(404).json({ success: false }); 
  }

  const animal = await animaisService.getById(id, readData); //chama o servidor

  if (!animal) {
    return res.status(404).json({ success: false }); //se não existir retorna 404 erro
  }

  res.json({ success: true, data: animal }); //retorna animal JSON
});

// POST cria um novo animal
router.post("/", async (req, res) => {
  try {
    const novo = await animaisService.create(req.body, readData, writeData);

    res.status(201).json({ success: true, data: novo });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

// PUT atualiza tudo
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const atualizado = await animaisService.updatePut(
      id,
      req.body,
      readData,
      writeData
    );

    if (!atualizado) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true, data: atualizado });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PATCH atualiza parcialmente
router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const atualizado = await animaisService.updatePatch(
    id,
    req.body,
    readData,
    writeData
  );

  if (!atualizado) {
    return res.status(404).json({ success: false });
  }

  res.json({ success: true, data: atualizado });
});

// DELETE remove um animal
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const ok = await animaisService.remove(id, readData, writeData);

  if (!ok) {
    return res.status(404).json({ success: false });
  }

  res.json({ success: true });
});

export default router;