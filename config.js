const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://trillof46:4QguMm7PUmVQhF0b@cluster0.wtz5ygo.mongodb.net/crud-tareas?retryWrites=true&w=majority&appName=Cluster0');
    console.log('✅ Conectado a MongoDB Atlas correctamente');
    } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error.message);
    process.exit(1); // Detiene la app si falla la conexión
    }
};

module.exports = connectDB;