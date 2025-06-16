import { Router } from 'express'

const empleados = Router()

empleados.get('/', (req, res) => {
  res.json({ message: 'Empleados endpoint' })
})


export { empleados }