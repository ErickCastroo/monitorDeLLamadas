import { Request, Response } from 'express'
import { prisma } from '@/config/db.js'
import { Seguimiento } from '@prisma/client'

interface PostLlamadaDTO {
  clienteId: number
  respuesta: boolean
  observacion: string
}

export class LlamadasController {

  static async getLlamadas(req: Request, res: Response) {
    try {
      const llamadas = await prisma.seguimiento.findMany()
      if (llamadas.length === 0) {
        return res.status(404).json({ message: 'No se encontraron llamadas' })
      }
      return res.status(200).json(llamadas)
    } catch (error) {
      console.error('Error al obtener las llamadas:', error)
      return res.status(500).json({ message: 'Error al obtener las llamadas' })
    }
  }

  static async getLlamadaById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const llamada = await prisma.seguimiento.findUnique({
        where: { id }
      })
      if (!llamada) {
        return res.status(404).json({ message: 'Llamada no encontrada' })
      }
      return res.status(200).json(llamada)
    } catch (error) {
      console.error('Error al obtener la llamada:', error)
      return res.status(500).json({ message: 'Error al obtener la llamada' })
    }
  }

  static async postLlamada(req: Request, res: Response) {
    try {
      // Aquí TS sabe que respuesta siempre es boolean, no boolean|undefined
      const { clienteId, respuesta, observacion } = req.body as PostLlamadaDTO

      // valida que el cliente exista...
      const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } })
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' })
      }

      const newLlamada = await prisma.seguimiento.create({
        data: { clienteId, respuesta, observacion }
      })
      return res.status(201).json(newLlamada)

    } catch (error: any) {
      // Maneja P2002 si existe seguimiento previo...
      if (error.code === 'P2002' && error.meta?.target?.includes('clienteId')) {
        return res.status(400).json({ message: 'Ya existe un registro de llamada para este cliente' })
      }
      console.error('Error al registrar la llamada:', error)
      return res.status(500).json({ message: 'Error al registrar la llamada' })
    }
  }

  static async putLlamada(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const { respuesta, observacion } = req.body as Partial<Seguimiento>

      // Verifica que la llamada exista
      const llamada = await prisma.seguimiento.findUnique({ where: { id } })
      if (!llamada) {
        return res.status(404).json({ message: 'Llamada no encontrada' })
      }

      const updated = await prisma.seguimiento.update({
        where: { id },
        data: { respuesta, observacion }
      })
      return res.status(200).json(updated)

    } catch (error) {
      console.error('Error al actualizar la llamada:', error)
      return res.status(500).json({ message: 'Error al actualizar la llamada' })
    }
  }

  static async deleteLlamada(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      // Borra y retorna el registro
      const deleted = await prisma.seguimiento.delete({ where: { id } })
      return res.status(200).json({ message: 'Llamada eliminada', deleted })
    } catch (error) {
      console.error('Error al eliminar la llamada:', error)
      return res.status(500).json({ message: 'Error al eliminar la llamada' })
    }
  }
}
