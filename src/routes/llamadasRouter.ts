import { Router } from 'express'

const llamadasRouter = Router()

llamadasRouter.get('/', (req, res) => {
  res.json({ message: 'Llamadas endpoint' })
})


export { llamadasRouter }