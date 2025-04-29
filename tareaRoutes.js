const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');

router.get('/tareas', tareaController.obtenerTareas);
router.post('/tareas', tareaController.crearTarea);
router.put('/tareas/:id', tareaController.actualizarTarea);
router.delete('/tareas/:id', tareaController.eliminarTarea);

module.exports = router;