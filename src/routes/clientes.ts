import { Router } from 'express'
import { body } from 'express-validator'

import { validation } from '@/middleware/validation.js'

import { clientesController } from '@/controller/Clientes/index.js'

const clientes = Router()

clientes.get('/', (req, res) => {
  res.json({ message: 'Clientes endpoint' })
})

clientes.post('/create',
  body('cuenta').notEmpty().withMessage('Cuenta is required'),
  body('nombre').notEmpty().withMessage('Nombre is required'),
  body('domicilio').notEmpty().withMessage('Nombre is required'),
  body('saldo').isNumeric().withMessage('Saldo must be a number'),
  body('telefono').notEmpty().withMessage('Telefono is required'),
  body('empleadoId').isNumeric().withMessage('EmpleadoId must be a number'),
  validation,
  (req, res, next) => {
    Promise.resolve(clientesController.postClientes(req, res))
      .catch(next)
  })


clientes.put('/:id', (req, res) => {
  res.json({ message: 'Cliente updated', id: req.params.id, data: req.body })
})


export { clientes }