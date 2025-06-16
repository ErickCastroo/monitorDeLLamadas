
# 📞 Sistema de Registro de Llamadas - OOMAPAS Nogales

Este proyecto es un backend construido con **Node.js**, **Express**, **SQLite** y **Prisma ORM**, diseñado para registrar y gestionar llamadas recibidas por OOMAPAS Nogales.

---

## 🚀 Tecnologías Utilizadas

- **Node.js** - entorno de ejecución JavaScript.
- **Express** - framework web para crear APIs rápidas y sencillas.
- **SQLite** - base de datos ligera y embebida.
- **Prisma** - ORM moderno y tipado para interactuar con la base de datos.

## ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/ErickCastroo/monitorDeLLamadas.git
cd monitorDeLLamadas
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

4. Inicializa la base de datos con Prisma:

```bash
npx prisma migrate dev --name init
```

5. Inicia el servidor:

```bash
npm run dev
```

---

## 🛠 Scripts útiles

- `npm run dev` – Inicia el servidor en modo desarrollo (con nodemon)
- `npx prisma studio` – Interfaz gráfica para explorar la base de datos
- `npx prisma migrate dev` – Ejecuta migraciones en desarrollo
- `npx prisma generate` – Genera el cliente de Prisma

---

## 📁 Estructura del proyecto

```bash
.
├── node_modules/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   └── App/
│   ├── routes/
│   ├── models/
│   ├── middelware/
│   ├── controllers/
│   └── server/
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 📌 Notas

- Este proyecto usa SQLite como base de datos por simplicidad en desarrollo. En producción, se puede migrar fácilmente a PostgreSQL o MySQL.
- Asegúrate de tener instalado `Node.js >= 18` y `npm`.

---

## 📃 Licencia

MIT © 2025 - OOMAPAS Nogales / Castro Camacho Erick Miguel
