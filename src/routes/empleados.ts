import { Router } from 'express'

const empleados = Router()

empleados.get('/', (req, res) => {
  res.json({ message: 'Empleados endpoint' })
})

empleados.post('/', (req, res) => {
  res.json({ message: 'Empleado created', data: req.body })
})
empleados.put('/:id', (req, res) => {
  res.json({ message: 'Empleado updated', id: req.params.id, data: req.body })
})
empleados.delete('/:id', (req, res) => {
  res.json({ message: 'Empleado deleted', id: req.params.id })
})

export { empleados }