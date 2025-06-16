import express from 'express'
import dotenv from 'dotenv'

import { llamadasRouter } from '@/controller/llamadasRouter.js'
import { clientes } from '@/controller/clientes.js'
import { empleados } from '@/controller/empleados.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api/llamadas', llamadasRouter)
app.use('/api/clientes', clientes)
app.use('/api/empleados', empleados)

export default app