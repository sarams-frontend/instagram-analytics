export interface InstagramProfile {
  username: string;
  fullName: string;
  profilePicUrl: string;
  followers: number;
  following: number;
  posts: number;
  biography: string;
  isVerified: boolean;
  isPrivate: boolean;
}

export interface EngagementMetrics {
  engagementRate: number;
  avgLikes: number;
  avgComments: number;
  totalEngagement: number;
}

export interface AudienceQuality {
  realFollowers: number;
  suspiciousFollowers: number;
  qualityScore: number;
}

export interface ContentCategory {
  name: string;
  icon: string;
  percentage?: number;
}

export interface FollowerGrowth {
  date: string;
  followers: number;
}

export interface Rankings {
  globalRank: number;
  countryRank: number;
  categoryRank: number;
  country: string;
  category: string;
}

export interface InstagramAnalytics {
  profile: InstagramProfile;
  engagement: EngagementMetrics;
  audienceQuality: AudienceQuality;
  categories: ContentCategory[];
  followerGrowth: FollowerGrowth[];
  rankings: Rankings;
}
