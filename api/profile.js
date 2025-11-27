// Vercel Serverless Function - Instagram Profile
import axios from 'axios';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.query;

  // Validación
  if (!username) {
    return res.status(400).json({ error: 'Username required' });
  }

  if (username.length > 30 || !/^[a-zA-Z0-9._]+$/.test(username)) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'El username debe tener máximo 30 caracteres y solo puede contener letras, números, puntos y guiones bajos'
    });
  }

  const CONFIG = {
    RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
    RAPIDAPI_HOST: process.env.RAPIDAPI_HOST || 'instagram-statistics-api.p.rapidapi.com',
  };

  console.log(`\n📥 Request recibido para: ${username}`);

  try {
    const instagramUrl = `https://www.instagram.com/${username}/`;

    console.log('🔄 Haciendo request a RapidAPI...');
    console.log('   URL:', instagramUrl);
    console.log('   Host:', CONFIG.RAPIDAPI_HOST);
    console.log('   API Key:', CONFIG.RAPIDAPI_KEY ? '***' + CONFIG.RAPIDAPI_KEY.slice(-4) : 'NOT SET');

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

    return res.status(200).json(response.data);

  } catch (error) {
    console.error('❌ API Error:', error.message);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      console.error('Error details:', error.response?.data);
      console.error('Status:', status);

      // Log specific error messages based on status code
      if (status === 401 || status === 403) {
        console.error('⚠️ API Key inválida o sin permisos.');
      } else if (status === 404) {
        console.error('⚠️ Usuario no encontrado o endpoint incorrecto.');
      } else if (status === 429) {
        console.error('⚠️ Límite de requests excedido.');
      }

      return res.status(status || 500).json({
        error: 'API Error',
        message: error.response?.data?.message || error.message,
        details: error.response?.data,
      });
    }

    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}
