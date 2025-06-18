import { Router } from 'express'
import { body } from 'express-validator'

import { AuthController } from '@/controller/Auth/index.js'
import { validation } from '@/middleware/validation.js'

const empleados = Router()

empleados.get('/', (req, res) => {
  res.json({ message: 'Empleados endpoint' })
})

empleados.post('/create',
  body('nombre').notEmpty().withMessage('Nombre is required'),
  body('contrasena').isLength({ min: 8 }).notEmpty().withMessage('Contrasena must be at least 8 characters long'),
  validation,
  (req, res, next) => {
    Promise.resolve(AuthController.createEmp(req, res))
      .catch(next)

  })
empleados.put('/:id', (req, res) => {
  res.json({ message: 'Empleado updated', id: req.params.id, data: req.body })
})
empleados.delete('/:id', (req, res) => {
  res.json({ message: 'Empleado deleted', id: req.params.id })
})

export { empleados }