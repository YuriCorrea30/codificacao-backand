import express from 'express'
import pratosRoute from './routes/pratos.routes.js'

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API Sushi Bar 🍣')
})

app.use('/pratos', pratosRoute)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})