import express from 'express'
import pizzasRoute from './routes/pizzas.route.js'

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API Pizzaria 🍕')
})

app.use('/pizzas', pizzasRoute)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})