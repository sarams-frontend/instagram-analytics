// Vercel Serverless Function - Instagram Search
import { USERS_DATABASE } from '../server-data.js';

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

  const { query: searchQuery } = req.query;

  // Validación
  if (!searchQuery || searchQuery.trim().length === 0) {
    return res.json({ results: [] });
  }

  if (searchQuery.length > 100) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'La búsqueda debe tener máximo 100 caracteres',
      results: []
    });
  }

  try {
    const matchingUsers = searchUsers(searchQuery);

    const results = matchingUsers.map(user => ({
      username: user.username,
      fullName: user.fullName,
      profilePicUrl: user.profilePicUrl,
      followers: user.followers,
      isVerified: user.isVerified,
    }));

    return res.status(200).json({ results });

  } catch (error) {
    console.error('Search error:', error.message);
    return res.status(500).json({
      error: 'Search Error',
      message: 'Error al procesar la búsqueda',
      results: []
    });
  }
}
