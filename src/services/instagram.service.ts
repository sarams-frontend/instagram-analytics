import axios from 'axios';
import type { InstagramAnalytics, ContentCategory, FollowerGrowth } from '@/types/instagram';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST || 'instagram-statistics-api.p.rapidapi.com';

// Mock data generator for demo purposes
const generateMockData = (username: string): InstagramAnalytics => {
  const mockCategories: ContentCategory[] = [
    { name: 'Lifestyle', percentage: 35, color: '#f97316' },
    { name: 'Fashion', percentage: 25, color: '#ef4444' },
    { name: 'Travel', percentage: 20, color: '#ec4899' },
    { name: 'Food', percentage: 12, color: '#f59e0b' },
    { name: 'Fitness', percentage: 8, color: '#fb923c' },
  ];

  const mockFollowerGrowth: FollowerGrowth[] = [];
  const baseFollowers = 550000;
  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const growth = Math.floor((11 - i) * 5000 + Math.random() * 3000);
    mockFollowerGrowth.push({
      date: date.toISOString().split('T')[0],
      followers: baseFollowers + growth,
    });
  }

  return {
    profile: {
      username,
      fullName: 'Noel Bayarri',
      biography: 'Content creator | Digital influencer | Inspiring people around the world 🌎',
      profilePicUrl: `https://ui-avatars.com/api/?name=${username}&size=200&background=f97316&color=fff`,
      followers: 617500,
      following: 450,
      posts: 1234,
      isVerified: true,
      isPrivate: false,
    },
    engagement: {
      engagementRate: 4.18,
      avgLikes: 25800,
      avgComments: 1234,
    },
    categories: mockCategories,
    rankings: {
      globalRank: 1250,
      countryRank: 45,
      country: 'España',
      categoryRank: '#12',
      category: 'Lifestyle',
    },
    audienceQuality: {
      qualityScore: 92,
      realFollowers: 568000,
      suspiciousFollowers: 49500,
    },
    followerGrowth: mockFollowerGrowth,
  };
};

export const InstagramService = {
  async getCompleteAnalytics(username: string): Promise<InstagramAnalytics> {
    // Check if API key is configured
    if (!RAPIDAPI_KEY) {
      console.warn('API Key not configured, using mock data');
      return new Promise((resolve) => {
        setTimeout(() => resolve(generateMockData(username)), 1000);
      });
    }

    try {
      // Make actual API call when configured
      const response = await axios.get(`https://${RAPIDAPI_HOST}/user/${username}`, {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
      });

      // Transform API response to our format
      // This will need to be adjusted based on actual API response structure
      return generateMockData(username);
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('No se pudo obtener los datos del perfil');
    }
  },
};
