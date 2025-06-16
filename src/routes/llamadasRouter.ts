import { Router } from 'express'

const llamadasRouter = Router()

llamadasRouter.get('/', (req, res) => {
  res.json({ message: 'Llamadas endpoint' })
})

llamadasRouter.post('/', (req, res) => {
  res.json({ message: 'Llamadas endpoint' })
})

llamadasRouter.put('/:id', (req, res) => {
  res.json({ message: 'Llamadas endpoint', id: req.params.id, data: req.body })
})

llamadasRouter.delete('/:id', (req, res) => {
  res.json({ message: 'Llamadas endpoint', id: req.params.id })
})

export { llamadasRouter }