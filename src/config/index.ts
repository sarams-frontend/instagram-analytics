/**
 * Configuración centralizada de la aplicación
 */

// Re-export utility constants to avoid duplication
export { NUMBER_FORMAT, ENGAGEMENT_CONSTANTS, formatNumber } from '@/lib/utils';

// API Configuration
export const API_CONFIG = {
  PROXY_URL: import.meta.env.VITE_PROXY_URL || '',
  TIMEOUT: 15000, // 15 seconds
} as const;

// Content Category Colors
export const CATEGORY_COLORS = [
  '#f97316',
  '#ef4444',
  '#ec4899',
  '#f59e0b',
  '#fb923c',
] as const;

// Tag to Category Mapping
export const TAG_CATEGORY_MAP: Record<string, string> = {
  'lifestyle': 'Lifestyle',
  'fitness-and-gym': 'Fitness',
  'cinema-and-Actors-actresses': 'Entertainment',
  'business-and-careers': 'Business',
  'art-artists': 'Art',
  'celebrities': 'Celebrity',
  'fashion-and-style': 'Fashion',
  'travel-and-tourism': 'Travel',
  'food-and-Cooking': 'Food',
} as const;

// Fallback Categories
export const FALLBACK_CATEGORIES = [
  'Lifestyle',
  'Entertainment',
  'Creative',
  'Personal',
  'Other',
] as const;

// App Meta
export const APP_META = {
  NAME: 'Instagram Analytics',
  DESCRIPTION: 'Análisis completo de perfiles de Instagram',
  VERSION: '1.0.0',
} as const;

// Environment
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
