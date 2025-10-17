const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_NINJAS_KEY;

// 2. Conexión a la Base de Datos MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

if (!API_KEY) {
  console.error("Falta API_NINJAS_KEY en .env");
  process.exit(1);
}


// 3. Middlewares
app.use(express.json());

// 4. Importar Rutas
const express = require('express');
const authRoutes = require('./routes/auth');     
const protectedRoutes = require('./routes/protected');
const uploadRoutes = require('./routes/upload');

// 5. Usar las Rutas
app.use('/api/auth', authRoutes); 
app.use('/api', protectedRoutes);
app.use('/api', uploadRoutes);

// Endpoint para consultar nutrición de un alimento
app.get('/nutrition', async (req, res) => {
  const { query } = req.query; // ejemplo: /nutrition?query=banana
  if (!query) {
    return res.status(400).json({ error: "Debes enviar un parámetro query, ej: /nutrition?query=banana" });
  }

  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/nutrition", {
      headers: { 'X-Api-Key': API_KEY },
      params: { query }
    });

    return res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({ error: "Error al consultar Nutrition API" });
  }
});

// Ruta raiz
app.get('/', (req, res) => {
    res.send('🚀 ¡El servidor del backend está funcionando!');
});

// 6. Iniciar el Servidor
app.listen(PORT, () => {
    console.log(`📡 Servidor corriendo en el puerto ${PORT}`);
});