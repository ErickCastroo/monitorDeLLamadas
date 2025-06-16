import { Router } from 'express'

const clientes = Router()

clientes.get('/', (req, res) => {
  res.json({ message: 'Llamadas endpoint' })
})


export { clientes }