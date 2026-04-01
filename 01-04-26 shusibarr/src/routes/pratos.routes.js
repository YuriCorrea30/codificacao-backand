import express from 'express'
import {
  getAllPratos,
  getPratoById,
  createPrato,
  updatePrato,
  deletePrato
} from '../services/pratosService.js'

const router = express.Router()

router.get('/', getAllPratos)
router.get('/:id', getPratoById)
router.post('/', createPrato)
router.patch('/:id', updatePrato)
router.delete('/:id', deletePrato)