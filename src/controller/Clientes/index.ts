import { Request, Response } from 'express'
import { Cliente } from '@prisma/client'
import { prisma } from '@/config/db.js'

export class clientesController {

  static async getClientes(req: Request, res: Response) {
    try {

    } catch (error) {
      console.error('Error fetching clients:', error)
      return res.status(500).json({ message: 'Error al obtener a los clientes' })
    }
  }
  static async getbyIdClientes(req: Request, res: Response) {
    try {
      const { cuenta } = req.params


    } catch (error) {
      console.error('Error fetching clients:', error)
      return res.status(500).json({ message: 'Error al obtener al cliente' })
    }
  }



  static async postClientes(req: Request, res: Response) {
    try {
      const cliente = req.body as Cliente
      const clienteExists = await prisma.cliente.findFirst({
        where: {
          cuenta: cliente.cuenta
        }
      })
      if (clienteExists) {
        return res.status(400).json({ message: 'Cliente ya existe' })
      }

      const newCliente = await prisma.cliente.create({
        data: cliente
      })
      return res.status(201).json(newCliente)
    } catch (error) {
      console.error('Error fetching clients:', error)
      return res.status(500).json({ message: 'Error al registar un cliente' })
    }
  }




  static async putClientes(req: Request, res: Response) {
    try {

    } catch (error) {
      console.error('Error updating client:', error)
      return res.status(500).json({ message: 'Error al actualizar al cliente' })
    }

  }

  static async deleteClientes(req: Request, res: Response) {
    try {

    } catch (error) {
      console.error('Error deleting client:', error)
      return res.status(500).json({ message: 'Error al eliminar al cliente' })
    }
  }
}