import express from "express";
import fruitRoutes from "./routes/fruitRoutes.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de frutas funcionando" });
});

app.use("/fruits", fruitRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;