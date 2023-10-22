const fs = require('fs')
const path = require('path')
const dataPath = path.join(__dirname, '../db/repertorio.json')

// Función para leer el archivo JSON
const readDataFile = () => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    return data
  } catch (err) {
    return []
  }
}

const songsController = {
  // Leer datos de repertorio.json
  getCanciones: (_, res) => {
    const data = readDataFile()
    res.json(data)
  },

  agregarCanciones: (req, res) => {
    const { id, titulo, artista, tono } = req.body
    const data = readDataFile()

    data.push({ id, titulo, artista, tono }) // Agregamos la nueva cancion
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2)) // Guardamos los datos actualizados en el JSON
    res.send('Canción agregado con exito')
  },

  // Buscamos la cancion por ID y actualizamos
  editarCancion: (req, res) => {
    const id = req.params.id
    const { titulo, artista, tono } = req.body
    const data = readDataFile()

    const cancion = data.find((c) => c.id === Number(id))
    console.warn(id, data)
    if (cancion) {
      cancion.titulo = titulo
      cancion.artista = artista
      cancion.tono = tono
    }
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
    res.send('Canción editada con exito')
  },

  eliminarCancion: (req, res) => {
    const id = req.params.id
    const data = readDataFile()

    const newData = data.filter((c) => c.id !== Number(id)) // Filtramos para eliminar por ID
    fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2))
    res.send('Canción eliminada con exito')
  }
}

module.exports = songsController
