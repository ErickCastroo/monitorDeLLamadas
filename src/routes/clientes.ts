import { Router } from 'express'

const clientes = Router()

clientes.get('/', (req, res) => {
  res.json({ message: 'Clientes endpoint' })
})

clientes.post('/', (req, res) => {
  res.json({ message: 'Cliente created', data: req.body })
})

clientes.put('/:id', (req, res) => {
  res.json({ message: 'Cliente updated', id: req.params.id, data: req.body })
})


export { clientes }