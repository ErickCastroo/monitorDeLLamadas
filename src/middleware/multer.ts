import path from 'path'
import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = path.basename(file.originalname, ext)
    cb(null, `${name}-${Date.now()}${ext}`)
  }
})

// Filtro para aceptar solo archivos .xlsx
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    cb(null, true)
  } else {
    cb(new Error('Solo se permiten archivos Excel .xlsx'))
  }
}

export const upload = multer({ storage, fileFilter })