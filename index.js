require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 
//const connectDB = require('./config/config'); base de datos MongoDB Atlas

const app = express();

app.use(cors());
app.use(express.json());

/*mongoose.connect('mongodb+srv://trillof46:4QguMm7PUmVQhF0b@cluster0.wtz5ygo.mongodb.net/crud-tareas?retryWrites=true&w=majority&appName=Cluster0', {
})
.then(() => console.log("✅ Conexión a MongoDB exitosa"))
.catch(err => {
  console.error("❌ Error de conexión a MongoDB:", err);
  process.exit(1); // Detener servidor si no conecta a la DB
}); */

// Esquema y modelo de la tarea
const TareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  completada: { type: Boolean, default: false }
});

const Tarea = mongoose.model('Tarea', TareaSchema);

// Rutas CRUD

// Obtener todas las tareas
app.get('/tareas', async (req, res) => {
  const tareas = await Tarea.find();
  res.json(tareas);
});

// Crear nueva tarea
app.post('/tareas', async (req, res) => {
  const nuevaTarea = new Tarea(req.body);
  await nuevaTarea.save();
  res.json(nuevaTarea);
});

// Actualizar tarea por ID
app.put('/tareas/:id', async (req, res) => {
  const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tareaActualizada);
});

// Eliminar tarea por ID
app.delete('/tareas/:id', async (req, res) => {
  await Tarea.findByIdAndDelete(req.params.id);
  res.json({ mensaje: '🗑️ Tarea eliminada' });
});

// Servir archivos estáticos del frontend
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// Ruta para manejar todas las demás solicitudes y devolver 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en ${PORT}`);
});