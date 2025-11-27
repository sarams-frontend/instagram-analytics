// Servidor proxy con seguridad y validaciones mejoradas
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, query, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import { USERS_DATABASE } from './server-data.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración desde variables de entorno (NO hardcoded)
const CONFIG = {
  RAPIDAPI_KEY: process.env.RAPIDAPI_KEY || '34b3a108aemsh48ab034fb3d8d46p100ca9jsn0dd489ab9205',
  RAPIDAPI_HOST: process.env.RAPIDAPI_HOST || 'instagram-statistics-api.p.rapidapi.com',
};

// Seguridad con Helmet
app.use(helmet());

// CORS
app.use(cors());
app.use(express.json());

// Rate limiting - API general
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana
  message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting - Búsqueda (más permisivo)
const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 30, // límite de 30 búsquedas por minuto
  message: 'Demasiadas búsquedas, por favor espera un momento.',
});

// Aplicar rate limiting
app.use('/api/', apiLimiter);
app.use('/api/instagram/search', searchLimiter);

console.log('\n🚀 Servidor proxy iniciando...');
console.log('📡 API Key:', '***' + CONFIG.RAPIDAPI_KEY.slice(-4));
console.log('🌐 Host:', CONFIG.RAPIDAPI_HOST);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    apiKey: '***' + CONFIG.RAPIDAPI_KEY.slice(-4),
    timestamp: new Date().toISOString()
  });
});

// Función de búsqueda simplificada
const searchUsers = (searchQuery) => {
  const normalizeText = (text) => text.toLowerCase().trim();

  return Object.values(USERS_DATABASE).filter(user => {
    const username = normalizeText(user.username);
    const fullName = normalizeText(user.fullName);
    const query = normalizeText(searchQuery);

    return username.includes(query) ||
           fullName.includes(query) ||
           username.startsWith(query);
  }).sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return b.followers - a.followers;
  }).slice(0, 8);
};

// Endpoint de búsqueda con validación
app.get('/api/instagram/search',
  query('query')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('La búsqueda debe tener entre 1 y 100 caracteres')
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), results: [] });
    }

    const { query: searchQuery } = req.query;

    if (!searchQuery || searchQuery.trim().length === 0) {
      return res.json({ results: [] });
    }

    console.log(`\n🔍 Búsqueda recibida: "${searchQuery}"`);

    try {
      const matchingUsers = searchUsers(searchQuery);

      const results = matchingUsers.map(user => ({
        username: user.username,
        fullName: user.fullName,
        profilePicUrl: user.profilePicUrl,
        followers: user.followers,
        isVerified: user.isVerified,
      }));

      console.log(`   ✅ Sugerencias devueltas: ${results.length}`);
      res.json({ results });

    } catch (error) {
      console.error('❌ Error en búsqueda:', error.message);
      res.status(500).json({
        error: 'Search Error',
        message: 'Error al procesar la búsqueda',
        results: []
      });
    }
  }
);

// Endpoint principal con validación
app.get('/api/instagram/profile',
  query('username')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('El username debe tener entre 1 y 30 caracteres')
    .matches(/^[a-zA-Z0-9._]+$/)
    .withMessage('El username solo puede contener letras, números, puntos y guiones bajos')
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username required' });
    }

    console.log(`\n📥 Request recibido para: ${username}`);

    try {
      const instagramUrl = `https://www.instagram.com/${username}/`;

      console.log('🔄 Haciendo request a RapidAPI...');
      console.log('   URL:', instagramUrl);
      console.log('   Host:', CONFIG.RAPIDAPI_HOST);
      console.log('   API Key:', '***' + CONFIG.RAPIDAPI_KEY.slice(-4));

      const response = await axios.get(
        `https://${CONFIG.RAPIDAPI_HOST}/community`,
        {
          headers: {
            'X-RapidAPI-Key': CONFIG.RAPIDAPI_KEY,
            'X-RapidAPI-Host': CONFIG.RAPIDAPI_HOST,
          },
          params: {
            url: instagramUrl,
          },
          timeout: 15000, // 15 segundos timeout
        }
      );

      console.log('✅ Respuesta exitosa de RapidAPI');
      console.log('   Status:', response.status);

      res.json(response.data);

    } catch (error) {
      console.error('❌ Error:', error.message);

      if (error.response) {
        console.error('   Status:', error.response.status);
        console.error('   Data:', error.response.data);

        return res.status(error.response.status).json({
          error: 'API Error',
          message: error.response.data?.message || error.message,
          details: error.response.data,
        });
      }

      res.status(500).json({ error: 'Server Error', message: error.message });
    }
  }
);

// Error handler global
app.use((err, req, res, next) => {
  console.error('💥 Error no manejado:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production'
      ? 'Ocurrió un error en el servidor'
      : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'El endpoint solicitado no existe'
  });
});

app.listen(PORT, () => {
  console.log(`\n✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Test: http://localhost:${PORT}/api/instagram/profile?username=therock\n`);
});
