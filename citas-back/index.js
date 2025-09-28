const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 3000;

// 2. Conexión a la Base de Datos MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// 3. Middlewares
app.use(express.json());

// 4. Importar Rutas
const authRoutes = require('./routes/auth');

// 5. Usar las Rutas
app.use('/api/auth', authRoutes); 

// Ruta raiz
app.get('/', (req, res) => {
    res.send('🚀 ¡El servidor del backend está funcionando!');
});

// 6. Iniciar el Servidor
app.listen(PORT, () => {
    console.log(`📡 Servidor corriendo en el puerto ${PORT}`);
});