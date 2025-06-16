import { Router } from 'express'

const clientes = Router()

clientes.get('/', (req, res) => {
  res.json({ message: 'Clientes endpoint' })
})


export { clientes }