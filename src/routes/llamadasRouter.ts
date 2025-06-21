import { Router } from 'express'
import { body } from 'express-validator'
import { validation } from '@/middleware/validation.js'
import { LlamadasController } from '@/controller/Llamadas/index.js'


const llamadasRouter = Router()

// Obtener todas las llamadas
llamadasRouter.get('/', async (req, res) => {
  try {
    await LlamadasController.getLlamadas(req, res)
  } catch (err) {
    console.error('Error GET /llamadas:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Obtener llamada por ID
llamadasRouter.get('/:id', async (req, res) => {
  try {
    await LlamadasController.getLlamadaById(req, res)
  } catch (err) {
    console.error('Error GET /llamadas/:id:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Crear nueva llamada
llamadasRouter.post('/',
  body('clienteId')
    .notEmpty().withMessage('ClienteId is required')
    .isInt().withMessage('ClienteId must be a number')
    .toInt(),
  body('respuesta')
    .notEmpty().withMessage('Respuesta is required')
    .isBoolean().withMessage('Respuesta must be a boolean')
    .toBoolean(),              // ← convierte "true"/"false" a boolean
  body('observacion')
    .notEmpty().withMessage('Observacion is required'),
  validation,
  async (req, res) => {
    try {
      await LlamadasController.postLlamada(req, res)
    } catch (err) {
      console.error('Error POST /llamadas:', err)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)
// Actualizar llamada
llamadasRouter.put('/:id',
  body('respuesta').notEmpty().withMessage('Respuesta is required'),
  body('observacion').notEmpty().withMessage('Observacion is required'),
  validation,
  async (req, res) => {
    try {
      await LlamadasController.putLlamada(req, res)
    } catch (err) {
      console.error('Error PUT /llamadas/:id:', err)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

// Eliminar llamada
llamadasRouter.delete('/:id', async (req, res) => {
  try {
    await LlamadasController.deleteLlamada(req, res)
  } catch (err) {
    console.error('Error DELETE /llamadas/:id:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export { llamadasRouter }
