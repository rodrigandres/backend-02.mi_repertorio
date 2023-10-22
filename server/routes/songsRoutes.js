const express = require('express')
const router = express.Router()
const songsController = require('../controllers/songsController')

router.get('/canciones', songsController.getCanciones)
router.post('/canciones', songsController.agregarCanciones)
router.put('/canciones/:id', songsController.editarCancion)
router.delete('/canciones/:id', songsController.eliminarCancion)

module.exports = router
