import app from '@/server/index.js'
import { prisma } from '@/config/db.js'

const port = process.env.PORT || 3000

//db connection
prisma.$connect()
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch((error) => {
    console.error('Database connection failed:', error)
  })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
