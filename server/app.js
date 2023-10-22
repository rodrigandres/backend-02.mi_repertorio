const express = require('express')
const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json()) // Middleware para procesar JSON

const songsRoutes = require('./routes/songsRoutes.js')
app.use('/', songsRoutes)

app.use('/', express.static('client/public'))

app.all('*', (_, res) =>
  res.status(404).json({ code: 404, message: 'Página no encontrada...' })
)

app.listen(port, () => console.log(`Servidor UP: http://localhost:${port}`))
