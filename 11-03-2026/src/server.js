const express = require('express')
const app = express()
const port = 3000

let alunos = [
  { id: 1, nome: "Yuri", idade: 18},
  { id: 2, nome: "Jupiter", idade: 8},
  { id: 3, nome: "Luna", idade: 7}
]

app.get('/', (req, res) => {
  res.send('Yuri correa')
})

app.get('/alunos/getAll', (req, res) => {
  res.json({
    sucess: true,
    data: alunos
  })
})