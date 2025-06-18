import { Request, Response } from 'express'
import { PrismaClient, Empleado } from '@prisma/client'

export class AuthController {

  static async createEmp(req: Request, res: Response) {
    try {
      const user = req.body as Empleado
      const empleadoExists = await new PrismaClient().empleado.findFirst({
        where: {
          nombre: user.nombre
        }
      })
      if (empleadoExists) {
        return res.status(400).json({ message: 'Empleado ya existe' })
      }

      const empleado = await new PrismaClient().empleado.create({
        data: user
      })
      return res.status(201).json(empleado)

    } catch (error) {
      console.error('Error creating employee:', error)
      return res.status(500).json({ message: 'Error creating employee' })
    }
  }


  static async login(req: Request, res: Response) {

  }

  static async register(req: Request, res: Response) {

  }
}
