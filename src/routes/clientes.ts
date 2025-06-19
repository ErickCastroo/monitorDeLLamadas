import { Router } from 'express'
import { body } from 'express-validator'

import { validation } from '@/middleware/validation.js'

import { clientesController } from '@/controller/Clientes/index.js'

const clientes = Router()

clientes.get('/', (req, res) => {
  Promise.resolve(clientesController.getClientes(req, res))
    .catch(error => {
      console.error('Error fetching clients:', error)
      res.status(500).json({ message: 'Error al obtener los clientes' })
    })
})

clientes.get('/:cuenta', (req, res) => {
  Promise.resolve(clientesController.getbyIdClientes(req, res))
    .catch(error => {
      console.error('Error fetching client by ID:', error)
      res.status(500).json({ message: 'Error al obtener el cliente' })
    })
})


clientes.post('/create',
  body('cuenta').notEmpty().withMessage('Cuenta is required'),
  body('nombre').notEmpty().withMessage('Nombre is required'),
  body('domicilio').notEmpty().withMessage('domicilio is required'),
  body('saldo').isNumeric().withMessage('Saldo must be a number'),
  body('telefono').notEmpty().withMessage('Telefono is required'),
  body('empleadoId').isNumeric().withMessage('EmpleadoId must be a number'),
  validation,
  (req, res, next) => {
    Promise.resolve(clientesController.postClientes(req, res))
      .catch(next)
  })

clientes.put('/:id',
  body('cuenta').notEmpty().withMessage('Cuenta is required'),
  body('nombre').notEmpty().withMessage('Nombre is required'),
  body('domicilio').notEmpty().withMessage('domicilio is required'),
  body('saldo').isNumeric().withMessage('Saldo must be a number'),
  body('telefono').notEmpty().withMessage('Telefono is required'),
  body('empleadoId').isNumeric().withMessage('EmpleadoId must be a number'),
  validation,
  (req, res, next) => {
    Promise.resolve(clientesController.putClientes(req, res))
      .catch(next)
  })

clientes.delete('/:id', (req, res) => {
  Promise.resolve(clientesController.deleteClientes(req, res))
    .catch(error => {
      console.error('Error deleting client:', error)
      res.status(500).json({ message: 'Error al eliminar el cliente' })
    })
})

export { clientes }