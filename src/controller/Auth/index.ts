import { Request, Response } from 'express'
import { Empleado } from '@prisma/client'

import { prisma } from '@/config/db.js'

export class AuthController {

  static async getEmpleados(res: Response) {
    try {
      const empleados = await prisma.empleado.findMany()
      return res.status(200).json(empleados)
    } catch (error) {
      console.error('Error fetching employees:', error)
      return res.status(500).json({ message: 'Error al obtener los Empleados' })
    }
  }

  static async createEmp(req: Request, res: Response) {
    try {
      const user = req.body as Empleado
      const empleadoExists = await prisma.empleado.findFirst({
        where: {
          nombre: user.nombre
        }
      })
      if (empleadoExists) {
        return res.status(400).json({ message: 'Empleado ya existe' })
      }

      const empleado = await prisma.empleado.create({
        data: user
      })
      return res.status(201).json(empleado)

    } catch (error) {
      console.error('Error creating employee:', error)
      return res.status(500).json({ message: 'Error al crear al Empleado' })
    }
  }

  static async updateEmp(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = req.body as Empleado

      const empleado = await prisma.empleado.update({
        where: { id: Number(id) },
        data: user
      })

      return res.status(200).json(empleado)

    } catch (error) {
      console.error('Error updating employee:', error)
      return res.status(500).json({ message: 'Error al actualizar al Empleado' })
    }
  }


  static async login(req: Request, res: Response) {
    try {
      const { nombre, contrasena } = req.body as { nombre: string; contrasena: string }
      const empleado = await prisma.empleado.findFirst({
        where: {
          nombre,
          contrasena
        }
      })
      if (!empleado) {
        return res.status(401).json({ message: 'Credenciales incorrectas' })
      }

      return res.status(200).json(empleado)



      //jwt   

    } catch (error) {
      console.error('Error during login:', error)
      return res.status(500).json({ message: 'Error durante al login' })
    }
  }
}