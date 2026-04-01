import { Router } from "express";
import { getAll, getById, create, update, remove } from  "../services/pacientes.service.js";

const routes = Router();

routes.get("/", (req, res) => {
    res.json(getAll());
});

routes.get("/:id", (req, res) => {
    const paciente = getById(Number(req.params.id));
    res.json(paciente);
});

routes.post("/:id", (req, res) => {
    const paciente = create(req.body);
});

routes.patch("/:id", (req, res) => {
    const paciente = update(Number(req.params.id), req.body);
    res.json(paciente);
});

routes.delete("/:id", (req, res) => {
    remove(Number(req.params.id));
    res.send("Paciente removido");
});

export default routes;