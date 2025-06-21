import { Router } from 'express'
import { body } from 'express-validator'

import { AuthController } from '@/controller/Auth/index.js'
import { validation } from '@/middleware/validation.js'

const empleados = Router()

empleados.get('/', (req, res) => {
  Promise.resolve(AuthController.getEmpleados(req, res))
    .catch((error) => {
      console.error('Error fetching employees:', error)
      res.status(500).json({ message: 'Error al obtener los Empleados' })
    })
})

empleados.post('/login',
  body('nombre').notEmpty().withMessage('Nombre is required'),
  body('contrasena').notEmpty().withMessage('Contraseña is required'),
  validation,
  (req, res, next) => {
    Promise.resolve(AuthController.login(req, res))
      .catch(next)
  })

empleados.post('/create',
  body('nombre').notEmpty().withMessage('Nombre is required'),
  body('contrasena').isLength({ min: 8 }).notEmpty().withMessage('Contrasena must be at least 8 characters long'),
  validation,
  (req, res, next) => {
    Promise.resolve(AuthController.createEmp(req, res))
      .catch(next)
  })

empleados.put('/update/:id',
  body('nombre').notEmpty().withMessage('Nombre is required'),
  body('contrasena').isLength({ min: 8 }).notEmpty().withMessage('Contrasena must be at least 8 characters long'),
  validation,
  (req, res, next) => {
    Promise.resolve(AuthController.updateEmp(req, res))
      .catch(next)
  })

export { empleados }