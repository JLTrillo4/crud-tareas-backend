const Tarea = require('../models/tareaModel');

exports.obtenerTareas = async (req, res) => {
    try {
    const tareas = await Tarea.find();
    res.json(tareas);
    } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener tareas', error: err });
    }
};

exports.crearTarea = async (req, res) => {
    try {
    const nuevaTarea = new Tarea(req.body);
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
    } catch (err) {
    res.status(400).json({ mensaje: 'Error al crear tarea', error: err });
    }
};

exports.actualizarTarea = async (req, res) => {
    try {
    const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tareaActualizada) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    res.json(tareaActualizada);
    } catch (err) {
    res.status(400).json({ mensaje: 'Error al actualizar tarea', error: err });
    }
};

exports.eliminarTarea = async (req, res) => {
    try {
    const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
    if (!tareaEliminada) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    res.json({ mensaje: 'Tarea eliminada' });
    } catch (err) {
    res.status(400).json({ mensaje: 'Error al eliminar tarea', error: err });
    }
};