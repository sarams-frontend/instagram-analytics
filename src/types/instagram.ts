export interface InstagramProfile {
  username: string;
  fullName: string;
  biography: string;
  profilePicUrl: string;
  followers: number;
  following: number;
  posts: number;
  isVerified: boolean;
  isPrivate: boolean;
}

export interface EngagementMetrics {
  engagementRate: number;
  avgLikes: number;
  avgComments: number;
}

export interface ContentCategory {
  name: string;
  percentage: number;
  color: string;
}

export interface Rankings {
  globalRank: number;
  countryRank: number;
  country: string;
  categoryRank: string;
  category: string;
}

export interface AudienceQuality {
  qualityScore: number;
  realFollowers: number;
  suspiciousFollowers: number;
}

export interface FollowerGrowth {
  date: string;
  followers: number;
}

export interface InstagramAnalytics {
  profile: InstagramProfile;
  engagement: EngagementMetrics;
  categories: ContentCategory[];
  rankings: Rankings;
  audienceQuality: AudienceQuality;
  followerGrowth: FollowerGrowth[];
}
