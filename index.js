const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());  // Esto permite recibir JSON en las peticiones

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tareas', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conexión a MongoDB exitosa"))
    .catch(err => console.error("Error de conexión a MongoDB", err));

// Esquema de la Tarea
const TareaSchema = new mongoose.Schema({
    titulo: String,
    completada: Boolean
});

const Tarea = mongoose.model('Tarea', TareaSchema);

// Rutas CRUD
app.get('/tareas', async (req, res) => {
    const tareas = await Tarea.find();
  res.json(tareas);  // Devuelve todas las tareas
});

app.post('/tareas', async (req, res) => {
    const nuevaTarea = new Tarea(req.body);
    await nuevaTarea.save();
  res.json(nuevaTarea);  // Devuelve la tarea recién creada
});

app.put('/tareas/:id', async (req, res) => {
    const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tareaActualizada);  // Devuelve la tarea actualizada
});

app.delete('/tareas/:id', async (req, res) => {
    await Tarea.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Tarea eliminada' });  // Confirma que la tarea fue eliminada
});

// Iniciar el servidor
app.listen(3001, () => console.log('Servidor corriendo en http://localhost:3001'));