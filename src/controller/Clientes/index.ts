import { Request, Response } from 'express'
import { Cliente } from '@prisma/client'
import { prisma } from '@/config/db.js'
import ExcelJS from 'exceljs'
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

      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.readFile(filePath)
      const worksheet = workbook.worksheets[0]

      const empleados = await prisma.empleado.findMany()
      if (empleados.length === 0) {
        return res.status(400).json({ message: 'No hay empleados disponibles para asignar' })
      }

      const filas = worksheet.getSheetValues().slice(2) // Elimina fila de encabezado
      const clientes = filas.map((fila: any, index: number) => ({
        cuenta: String(fila[1]).trim(),
        nombre: String(fila[2]).trim(),
        domicilio: String(fila[3]).trim(),
        saldo: parseFloat(fila[4]),
        telefono: String(fila[5]).trim(),
        empleadoId: empleados[index % empleados.length].id
      }))

      const insertados = await prisma.cliente.createMany({
        data: clientes
      })

      return res.status(200).json({
        message: 'Clientes registrados exitosamente',
        total: insertados.count
      })

    } catch (error) {
      console.error('Error al procesar el archivo:', error)
      return res.status(500).json({ message: 'Error interno al procesar el Excel' })
    }
  }
}