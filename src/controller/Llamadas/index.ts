import { prisma } from '@/config/db.js'
import { Seguimiento } from '@prisma/client'

import { Request, Response } from 'express'

export class LlamadasController {
  static async getLlamadas(req: Request, res: Response) {
    try {
      const llamadas = await prisma.seguimiento.findMany()

      if (llamadas.length === 0) {
        return res.status(404).json({ message: 'No se encontraron llamadas' })
      }

      return res.status(200).json(llamadas)

    } catch (error) {
      console.error('Error fetching calls:', error)
      return res.status(500).json({ message: 'Error al obtener las llamadas' })
    }
  }

  static async getLlamadaById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const llamada = await prisma.seguimiento.findUnique({
        where: {
          id: Number(id)
        }
      })

      if (!llamada) {
        return res.status(404).json({ message: 'Llamada no encontrada' })
      }

      return res.status(200).json(llamada)

    } catch (error) {
      console.error('Error fetching call by ID:', error)
      return res.status(500).json({ message: 'Error al obtener la llamada' })
    }
  }


  static async postLlamada(req: Request, res: Response) {
    try {
      const seguimiento = req.body as Seguimiento

      const llamadaExists = await prisma.seguimiento.findFirst({
        where: {
          id: seguimiento.id,
          respuesta: seguimiento.respuesta
        }
      })

      if (llamadaExists) {
        return res.status(400).json({ message: 'Llamada ya existe' })
      }
      const newLlamada = await prisma.seguimiento.create({
        data: seguimiento
      })

      return res.status(201).json(newLlamada)

    } catch (error) {
      console.error('Error al registrar la llamada:', error)
      return res.status(500).json({ message: 'Error al registrar la llamada' })
    }
  }

  static async putLlamada(req: Request, res: Response) {
    try {
      const { id } = req.params
      const seguimiento = req.body as Seguimiento

      const updatedLlamada = await prisma.seguimiento.update({
        where: { id: Number(id) },
        data: seguimiento
      })

      return res.status(200).json(updatedLlamada)

    } catch (error) {
      console.error('Error updating call:', error)
      return res.status(500).json({ message: 'Error al actualizar la llamada' })
    }
  }

  static async deleteLlamada(req: Request, res: Response) {
    try {
      const { id } = req.params

      const deletedLlamada = await prisma.seguimiento.delete({
        where: { id: Number(id) }
      })

      return res.status(200).json(deletedLlamada)

    } catch (error) {
      console.error('Error deleting call:', error)
      return res.status(500).json({ message: 'Error al eliminar la llamada' })
    }
  }
}
