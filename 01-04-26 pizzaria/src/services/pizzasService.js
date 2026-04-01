let pizzas = [
  { id: 1, nome: "Calabresa", preco: 40 },
  { id: 2, nome: "Margherita", preco: 45 }
]

// GET ALL
export const getAllPizzas = (req, res) => {
  res.json(pizzas)
}

// GET BY ID
export const getPizzaById = (req, res) => {
  const id = Number(req.params.id)
  const pizza = pizzas.find(p => p.id === id)

  if (!pizza) {
    return res.status(404).json({ mensagem: "Pizza não encontrada" })
  }

  res.json(pizza)
}

// CREATE
export const createPizza = (req, res) => {
  const { nome, preco } = req.body

  const novaPizza = {
    id: pizzas.length + 1,
    nome,
    preco
  }

  pizzas.push(novaPizza)

  res.status(201).json(novaPizza)
}

// UPDATE (PATCH)
export const updatePizza = (req, res) => {
  const id = Number(req.params.id)
  const pizza = pizzas.find(p => p.id === id)

  if (!pizza) {
    return res.status(404).json({ mensagem: "Pizza não encontrada" })
  }

  const { nome, preco } = req.body

  if (nome) pizza.nome = nome
  if (preco) pizza.preco = preco

  res.json(pizza)
}

// DELETE
export const deletePizza = (req, res) => {
  const id = Number(req.params.id)
  const index = pizzas.findIndex(p => p.id === id)

  if (index === -1) {
    return res.status(404).json({ mensagem: "Pizza não encontrada" })
  }

  pizzas.splice(index, 1)

  res.json({ mensagem: "Pizza deletada com sucesso" })
}