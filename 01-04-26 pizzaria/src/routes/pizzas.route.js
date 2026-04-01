import express from 'express'
import {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza
} from '../services/pizzasService.js'

const router = express.Router()

router.get('/', getAllPizzas)
router.get('/:id', getPizzaById)
router.post('/', createPizza)
router.patch('/:id', updatePizza)
router.delete('/:id', deletePizza)

export default router