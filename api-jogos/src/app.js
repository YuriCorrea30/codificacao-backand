import express from "express"
import jogosRoutes from "./routes/jogos.routes.js"

const app = express()

app.use(express.json())

app.use("/jogos", jogosRoutes)

export default app