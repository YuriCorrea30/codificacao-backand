import { Router } from "express";
import { animaisService } from "../services/aminais.service.js";
import { readData, writeData } from "../utils/fileHandler.js";

const router = Router();

// GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await animaisService.getAll(readData);
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false });
  }

  const animal = await animaisService.getById(id, readData);

  if (!animal) {
    return res.status(404).json({ success: false });
  }

  res.json({ success: true, data: animal });
});

// POST
router.post("/", async (req, res) => {
  try {
    const novo = await animaisService.create(req.body, readData, writeData);

    res.status(201).json({ success: true, data: novo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT
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

// PATCH
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

// DELETE
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const ok = await animaisService.remove(id, readData, writeData);

  if (!ok) {
    return res.status(404).json({ success: false });
  }

  res.json({ success: true });
});

export default router;