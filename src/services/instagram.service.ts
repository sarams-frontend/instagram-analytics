import axios from 'axios';
import type { InstagramAnalytics, InstagramProfile, EngagementMetrics } from '@/types/instagram';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST || 'instagram-statistics-api.p.rapidapi.com';

const api = axios.create({
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': RAPIDAPI_HOST,
  },
});

export class InstagramService {
  /**
   * Obtiene la información del perfil de Instagram
   */
  static async getProfile(username: string): Promise<InstagramProfile> {
    try {
      const response = await api.get(`https://${RAPIDAPI_HOST}/user/info`, {
        params: { username },
      });

      const data = response.data;

      return {
        username: data.username || username,
        fullName: data.full_name || '',
        profilePicUrl: data.profile_pic_url || '',
        followers: data.follower_count || 0,
        following: data.following_count || 0,
        posts: data.media_count || 0,
        biography: data.biography || '',
        isVerified: data.is_verified || false,
        isPrivate: data.is_private || false,
      };
    } catch (error) {
      console.error('Error fetching Instagram profile:', error);
      throw new Error('No se pudo obtener el perfil de Instagram');
    }
  }

  /**
   * Obtiene las métricas de engagement
   */
  static async getEngagementMetrics(username: string): Promise<EngagementMetrics> {
    try {
      const response = await api.get(`https://${RAPIDAPI_HOST}/user/engagement`, {
        params: { username },
      });

      const data = response.data;

      return {
        engagementRate: data.engagement_rate || 0,
        avgLikes: data.avg_likes || 0,
        avgComments: data.avg_comments || 0,
        totalEngagement: data.total_engagement || 0,
      };
    } catch (error) {
      console.error('Error fetching engagement metrics:', error);
      // Retornar valores por defecto si falla
      return {
        engagementRate: 0,
        avgLikes: 0,
        avgComments: 0,
        totalEngagement: 0,
      };
    }
  }

  /**
   * Obtiene el análisis completo del perfil
   */
  static async getCompleteAnalytics(username: string): Promise<InstagramAnalytics> {
    try {
      const [profile, engagement] = await Promise.all([
        this.getProfile(username),
        this.getEngagementMetrics(username),
      ]);

      // Datos simulados para demostración (reemplazar con llamadas reales a la API)
      return {
        profile,
        engagement,
        audienceQuality: {
          realFollowers: Math.floor(profile.followers * 0.85),
          suspiciousFollowers: Math.floor(profile.followers * 0.15),
          qualityScore: 85,
        },
        categories: [
          { name: 'Agencias de viajes', icon: '✈️' },
          { name: 'Viajes', icon: '✈️' },
          { name: 'Viajes culturales e históricos', icon: '🏛️' },
          { name: 'Hoteles', icon: '🏨' },
          { name: 'Navegar', icon: '⛵' },
          { name: 'Energía solar', icon: '☀️' },
        ],
        followerGrowth: this.generateMockFollowerGrowth(profile.followers),
        rankings: {
          globalRank: 87380,
          countryRank: 1878,
          categoryRank: 23,
          country: 'España',
          category: 'Viajes',
        },
      };
    } catch (error) {
      console.error('Error fetching complete analytics:', error);
      throw error;
    }
  }

  /**
   * Genera datos de ejemplo para el crecimiento de seguidores
   */
  private static generateMockFollowerGrowth(currentFollowers: number) {
    const data = [];
    const months = 12;
    let followers = currentFollowers;

    for (let i = months; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);

      data.push({
        date: date.toISOString().split('T')[0],
        followers: Math.floor(followers - (Math.random() * 5000 * i)),
      });
    }

    return data;
  }
}
