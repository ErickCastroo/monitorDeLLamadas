import { LlamadasController } from '@/controller/Llamadas/index.js'
import { validation } from '@/middleware/validation.js'
import { Router } from 'express'
import { body } from 'express-validator'

const llamadasRouter = Router()

llamadasRouter.get('/', (req, res) => {
  Promise.resolve(LlamadasController.getLlamadas(req, res))
    .catch(err => {
      console.error('Error in llamadasRouter GET /:', err)
      res.status(500).json({ message: 'Internal Server Error' })
    })

})

llamadasRouter.get('/:id', (req, res) => {
  Promise.resolve(LlamadasController.getLlamadas(req, res))
    .catch(err => {
      console.error('Error in llamadasRouter GET /cuenta:', err)
      res.status(500).json({ message: 'Internal Server Error' })
    })

})


llamadasRouter.post('/',
  body('clienteId').notEmpty().withMessage('ID is required'),
  body('respuesta').notEmpty().withMessage('Respuesta is required'),
  body('observacion').notEmpty().withMessage('Observacion is required'),
  validation,
  (req, res, next) => {
    Promise.resolve(LlamadasController.postLlamada(req, res))
      .catch(next)
  })

llamadasRouter.put('/:id', (req, res) => {
})

llamadasRouter.delete('/:id', (req, res) => {
})

export { llamadasRouter }