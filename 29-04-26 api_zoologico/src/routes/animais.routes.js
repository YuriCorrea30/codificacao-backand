import { Router } from "express";

import {
  getAll,
  getById,
  create,
  updatePut,
  updatePatch,
  remove
} from "../services/animais.service.js";

import { readData, writeData } from "../utils/fileHandler.js";

const router = Router();

// GET ALL
router.get("/", (req, res) => {
  const data = getAll(readData);
  res.json({ success: true, data });
});

// GET BY ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false });
  }

  const animal = getById(id, readData);

  if (!animal) {
    return res.status(404).json({ success: false });
  }

  res.json({ success: true, data: animal });
});

// POST
router.post("/", (req, res) => {
  try {
    const novo = create(req.body, readData, writeData);
    res.status(201).json({ success: true, data: novo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  try {
    const atualizado = updatePut(id, req.body, readData, writeData);

    if (!atualizado) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true, data: atualizado });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PATCH
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);

  const atualizado = updatePatch(id, req.body, readData, writeData);

  if (!atualizado) {
    return res.status(404).json({ success: false });
  }

  res.json({ success: true, data: atualizado });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const ok = remove(id, readData, writeData);

  if (!ok) {
    return res.status(404).json({ success: false });
  }

  res.json({ success: true });
});

export default router;