let pratos = [
  { id: 1, nome: "Sushi de Salmão", preco: 20 },
  { id: 2, nome: "Temaki", preco: 25 }
]

// GET ALL
export const getAllPratos = (req, res) => {
  res.json(pratos)
}

// GET BY ID
export const getPratoById = (req, res) => {
  const id = Number(req.params.id)
  const prato = pratos.find(p => p.id === id)

  if (!prato) {
    return res.status(404).json({ mensagem: "Prato não encontrado" })
  }

  res.json(prato)
}

// CREATE
export const createPrato = (req, res) => {
  const { nome, preco } = req.body

  const novoPrato = {
    id: pratos.length + 1,
    nome,
    preco
  }

  pratos.push(novoPrato)

  res.status(201).json(novoPrato)
}

// UPDATE (PATCH)
export const updatePrato = (req, res) => {
  const id = Number(req.params.id)
  const prato = pratos.find(p => p.id === id)

  if (!prato) {
    return res.status(404).json({ mensagem: "Prato não encontrado" })
  }

  const { nome, preco } = req.body

  if (nome) prato.nome = nome
  if (preco) prato.preco = preco

  res.json(prato)
}


// DELETE
export const deletePrato = (req, res) => {
  const id = Number(req.params.id)
  const index = pratos.findIndex(p => p.id === id)

  if (index === -1) {
    return res.status(404).json({ mensagem: "Prato não encontrado" })
  }

  pratos.splice(index, 1)

  res.json({ mensagem: "Prato deletado com sucesso" })
}