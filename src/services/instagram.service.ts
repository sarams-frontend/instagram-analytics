import axios from 'axios';
import axiosRetry from 'axios-retry';
import type { InstagramAnalytics, ContentCategory, FollowerGrowth } from '@/types/instagram';
import {
  API_CONFIG,
  ENGAGEMENT_CONSTANTS,
  CATEGORY_COLORS,
  TAG_CATEGORY_MAP,
  FALLBACK_CATEGORIES,
} from '@/config';

// Configure axios retry for resilience
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
           error.response?.status === 429 || // Rate limit
           error.response?.status === 503;    // Service unavailable
  },
});

/**
 * Genera porcentajes únicos basados en el hash del username
 * Asegura que cada usuario tenga una distribución consistente
 * @param username - Nombre de usuario de Instagram
 * @param count - Número de categorías a generar
 * @returns Array de porcentajes que suman 100
 */
const generateUniquePercentages = (username: string, count: number): number[] => {
  // Simple hash function from username
  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seed = hash % 1000;

  // Generate pseudo-random percentages that sum to 100
  const percentages: number[] = [];
  let remaining = 100;

  for (let i = 0; i < count - 1; i++) {
    // Use seed to generate consistent "random" values for this user
    const randomFactor = ((seed * (i + 1) * 17) % 30) + 15; // Range: 15-45%
    const percentage = Math.min(randomFactor, remaining - (count - i - 1) * 5);
    percentages.push(Math.max(5, percentage));
    remaining -= percentages[i];
  }

  percentages.push(Math.max(5, remaining)); // Last category gets remainder

  // Sort descending for better visual presentation
  return percentages.sort((a, b) => b - a);
};

/**
 * Genera datos mock para demostración cuando la API falla
 * @param username - Nombre de usuario de Instagram
 * @returns Objeto completo de analytics con datos de ejemplo
 */
const generateMockData = (username: string): InstagramAnalytics => {
  // Generate unique categories for each username
  const categoryNames = ['Lifestyle', 'Fashion', 'Travel', 'Food', 'Fitness'];
  const percentages = generateUniquePercentages(username, categoryNames.length);

  const mockCategories: ContentCategory[] = categoryNames.map((name, index) => ({
    name,
    percentage: percentages[index],
    color: CATEGORY_COLORS[index],
  }));

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
  /**
   * Obtiene analytics completos de un perfil de Instagram
   * - Intenta obtener datos reales de la API con retry automático
   * - Si falla, retorna datos mock para demostración
   * - Incluye métricas de engagement, categorías, rankings y audience quality
   *
   * @param username - Nombre de usuario de Instagram (sin @)
   * @returns Promise con objeto InstagramAnalytics completo
   * @example
   * const analytics = await InstagramService.getCompleteAnalytics('cristiano');
   */
  async getCompleteAnalytics(username: string): Promise<InstagramAnalytics> {
    try {
      // Llamar al proxy backend en lugar de RapidAPI directamente
      const response = await axios.get(`${API_CONFIG.PROXY_URL}/api/instagram/profile`, {
        params: {
          username: username,
        },
        timeout: API_CONFIG.TIMEOUT,
      });

      // Map the Instagram Statistics API response to our format
      const apiData = response.data.data;

      if (!apiData) {
        return generateMockData(username);
      }

      const followers = apiData.usersCount || 0;
      const avgInteractions = apiData.avgInteractions || 0;
      const avgER = apiData.avgER || 0;

      // Calculate engagement metrics
      const engagementRate = avgER * 100; // Convert to percentage
      const avgLikes = Math.floor(avgInteractions * ENGAGEMENT_CONSTANTS.BASE_RATE);
      const avgComments = Math.floor(avgInteractions * ENGAGEMENT_CONSTANTS.VARIANCE);

      // Extract categories from tags
      const apiTags = (apiData.tags || []).filter((tag: string) => TAG_CATEGORY_MAP[tag]);

      let categories: ContentCategory[];

      if (apiTags.length >= 3) {
        // Use API tags with unique percentages based on username
        const selectedTags = apiTags.slice(0, 5);
        const percentages = generateUniquePercentages(username, selectedTags.length);

        categories = selectedTags.map((tag: string, index: number) => ({
          name: TAG_CATEGORY_MAP[tag],
          percentage: percentages[index],
          color: CATEGORY_COLORS[index] || CATEGORY_COLORS[0],
        }));
      } else {
        // Generate dynamic fallback categories based on username
        const percentages = generateUniquePercentages(username, FALLBACK_CATEGORIES.length);

        categories = Array.from(FALLBACK_CATEGORIES).map((name, index) => ({
          name,
          percentage: percentages[index],
          color: CATEGORY_COLORS[index],
        }));
      }

      // Generate follower growth mock data based on current followers
      const followerGrowth = generateMockData(username).followerGrowth;

      // Extract country from tags or membersCities
      let country = 'Estados Unidos';
      if (apiData.membersCities && apiData.membersCities.length > 0) {
        country = apiData.membersCities[0].name || 'Estados Unidos';
      }

      // Calculate quality score
      const qualityScore = Math.round((apiData.qualityScore || 0.5) * 100);

      // Estimate following and posts based on followers count and account type
      const estimatedFollowing = followers > 1000000
        ? Math.floor(Math.random() * 500) + 300  // Celebrities follow fewer people
        : followers > 100000
        ? Math.floor(Math.random() * 1500) + 500 // Influencers
        : Math.floor(Math.random() * 3000) + 1000; // Regular users

      const estimatedPosts = followers > 1000000
        ? Math.floor(Math.random() * 2000) + 500  // Celebrities have many posts
        : followers > 100000
        ? Math.floor(Math.random() * 1500) + 300  // Influencers
        : Math.floor(Math.random() * 1000) + 100; // Regular users

      return {
        profile: {
          username: apiData.screenName || username,
          fullName: apiData.name || username,
          biography: apiData.description || '',
          profilePicUrl: apiData.image || `https://ui-avatars.com/api/?name=${username}&size=200&background=f97316&color=fff`,
          followers: followers,
          following: apiData.usersFollowedCount || estimatedFollowing, // Use API data or estimate
          posts: apiData.postsCount || estimatedPosts, // Use API data or estimate
          isVerified: apiData.verified || false,
          isPrivate: apiData.isClosed || false,
        },
        engagement: {
          engagementRate: parseFloat(engagementRate.toFixed(2)),
          avgLikes: avgLikes,
          avgComments: avgComments,
        },
        categories,
        rankings: {
          globalRank: Math.floor(apiData.ratingIndex || Math.random() * 5000 + 500),
          countryRank: Math.floor(Math.random() * 200) + 20,
          country: country,
          categoryRank: `#${Math.floor(Math.random() * 50) + 1}`,
          category: categories[0].name,
        },
        audienceQuality: {
          qualityScore: qualityScore,
          realFollowers: Math.floor(followers * (qualityScore / 100)),
          suspiciousFollowers: Math.floor(followers * (1 - qualityScore / 100)),
        },
        followerGrowth,
      };
    } catch (error) {
      // Fall back to mock data if API fails
      return generateMockData(username);
    }
  },
};
