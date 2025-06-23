import { Request, Response } from 'express'
import { Cliente } from '@prisma/client'
import { prisma } from '@/config/db.js'
import fs from 'fs'
import path from 'path'

export class clientesController {

  static async getClientes(req: Request, res: Response) {
    try {
      const clientes = await prisma.cliente.findMany()
      if (clientes.length === 0) {
        return res.status(404).json({ message: 'No se encontraron clientes' })
      }
      return res.status(200).json(clientes)
    } catch (error) {
      console.error('Error al obtener los clientes:', error)
      return res.status(500).json({ message: 'Error al obtener los clientes' })
    }
  }

  static async getbyIdClientes(req: Request, res: Response) {
    try {
      const { cuenta } = req.params
      const cliente = await prisma.cliente.findFirst({
        where: { cuenta }
      })
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' })
      }
      return res.status(200).json(cliente)
    } catch (error) {
      console.error('Error al obtener el cliente:', error)
      return res.status(500).json({ message: 'Error al obtener el cliente' })
    }
  }

  static async postClientes(req: Request, res: Response) {
    try {
      const cliente = req.body as Cliente

      const clienteExists = await prisma.cliente.findFirst({
        where: { cuenta: cliente.cuenta }
      })

      if (clienteExists) {
        return res.status(400).json({ message: 'Cliente ya existe' })
      }

      const newCliente = await prisma.cliente.create({
        data: cliente
      })

      return res.status(201).json(newCliente)
    } catch (error) {
      console.error('Error al registrar cliente:', error)
      return res.status(500).json({ message: 'Error al registrar cliente' })
    }
  }

  static async putClientes(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data = req.body as Cliente

      const cliente = await prisma.cliente.findUnique({
        where: { id: Number(id) }
      })

      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' })
      }

      const clienteActualizado = await prisma.cliente.update({
        where: { id: Number(id) },
        data
      })

      return res.status(200).json({ message: 'Cliente actualizado', cliente: clienteActualizado })
    } catch (error) {
      console.error('Error al actualizar cliente:', error)
      return res.status(500).json({ message: 'Error al actualizar cliente' })
    }
  }

  static async deleteClientes(req: Request, res: Response) {
    try {
      const { id } = req.params

      const cliente = await prisma.cliente.findUnique({
        where: { id: Number(id) }
      })

      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' })
      }

      await prisma.cliente.delete({
        where: { id: Number(id) }
      })

      return res.status(200).json({ message: 'Cliente eliminado correctamente' })
    } catch (error) {
      console.error('Error al eliminar cliente:', error)
      return res.status(500).json({ message: 'Error al eliminar cliente' })
    }
  }

  static async getClientesPendientes(req: Request, res: Response) {
    const empleadoId = Number(req.query.id)

    const clientes = await prisma.cliente.findMany({
      where: {
        empleadoId,
        seguimiento: null
      }
    })

    res.json(clientes)
  }

  static async procesarExcel(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No se subió ningún archivo' })
      }

      const filePath = path.resolve(req.file.path)

      // AQUI luego parsearemos con exceljs
      return res.status(200).json({
        message: 'Archivo recibido correctamente',
        nombre: req.file.originalname,
        ruta: filePath
      })

    } catch (error) {
      console.error('Error al procesar el archivo:', error)
      return res.status(500).json({ message: 'Error interno al procesar el Excel' })
    }
  }
}

