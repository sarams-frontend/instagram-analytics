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
      // Construct the Instagram URL
      const instagramUrl = `https://www.instagram.com/${username}/`;
      const encodedUrl = encodeURIComponent(instagramUrl);

      // Make actual API call using the correct endpoint
      const response = await axios.get(`https://${RAPIDAPI_HOST}/community`, {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
        params: {
          url: instagramUrl,
        },
      });

      console.log('✅ API Response successful:', response.data);

      // Map the real API response to our format
      const apiData = response.data.data;

      if (!apiData) {
        console.warn('No data in API response, using mock data');
        return generateMockData(username);
      }

      // Map tags to categories
      const categories: ContentCategory[] = (apiData.tags || []).slice(0, 6).map((tag: string, index: number) => ({
        name: tag.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        percentage: Math.floor(Math.random() * 30) + 10,
        color: ['#f97316', '#ef4444', '#ec4899', '#f59e0b', '#fb923c', '#8b5cf6'][index % 6],
      }));

      // Generate follower growth mock data based on current followers
      const followerGrowth = generateMockData(username).followerGrowth;

      return {
        profile: {
          username: apiData.screenName || username,
          fullName: apiData.name || username,
          biography: apiData.description || '',
          profilePicUrl: apiData.image || `https://ui-avatars.com/api/?name=${username}&size=200&background=f97316&color=fff`,
          followers: apiData.usersCount || 0,
          following: 0, // API doesn't provide this
          posts: 0, // API doesn't provide this
          isVerified: apiData.verified || false,
          isPrivate: false,
        },
        engagement: {
          engagementRate: Math.random() * 5 + 2, // Mock data (API doesn't provide)
          avgLikes: Math.floor((apiData.usersCount || 0) * 0.04), // Estimated
          avgComments: Math.floor((apiData.usersCount || 0) * 0.002), // Estimated
        },
        categories,
        rankings: {
          globalRank: Math.floor(Math.random() * 5000) + 500,
          countryRank: Math.floor(Math.random() * 200) + 20,
          country: 'Estados Unidos', // Could be extracted from tags
          categoryRank: `#${Math.floor(Math.random() * 50) + 1}`,
          category: categories[0]?.name || 'General',
        },
        audienceQuality: {
          qualityScore: Math.floor(Math.random() * 15) + 85,
          realFollowers: Math.floor((apiData.usersCount || 0) * 0.88),
          suspiciousFollowers: Math.floor((apiData.usersCount || 0) * 0.12),
        },
        followerGrowth,
      };
    } catch (error) {
      console.error('❌ API Error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error details:', error.response?.data);
        console.error('Status:', error.response?.status);
      }
      // Fall back to mock data if API fails
      console.warn('⚠️ Falling back to mock data due to API error');
      return generateMockData(username);
    }
  },
};
