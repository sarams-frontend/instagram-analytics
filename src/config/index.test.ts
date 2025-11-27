import { describe, it, expect } from 'vitest';
import {
  API_CONFIG,
  CATEGORY_COLORS,
  TAG_CATEGORY_MAP,
  FALLBACK_CATEGORIES,
  formatNumber,
} from './index';

describe('API_CONFIG', () => {
  it('should have PROXY_URL property', () => {
    expect(API_CONFIG).toHaveProperty('PROXY_URL');
  });

  it('should have TIMEOUT property', () => {
    expect(API_CONFIG.TIMEOUT).toBe(15000);
  });
});

describe('CATEGORY_COLORS', () => {
  it('should have 5 colors', () => {
    expect(CATEGORY_COLORS).toHaveLength(5);
  });

  it('should have valid hex colors', () => {
    CATEGORY_COLORS.forEach(color => {
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
});

describe('TAG_CATEGORY_MAP', () => {
  it('should map lifestyle tags', () => {
    expect(TAG_CATEGORY_MAP['lifestyle']).toBe('Lifestyle');
  });

  it('should map fitness tags', () => {
    expect(TAG_CATEGORY_MAP['fitness-and-gym']).toBe('Fitness');
  });

  it('should have at least 5 mappings', () => {
    expect(Object.keys(TAG_CATEGORY_MAP).length).toBeGreaterThanOrEqual(5);
  });
});

describe('FALLBACK_CATEGORIES', () => {
  it('should have 5 categories', () => {
    expect(FALLBACK_CATEGORIES).toHaveLength(5);
  });

  it('should include Lifestyle', () => {
    expect(FALLBACK_CATEGORIES).toContain('Lifestyle');
  });
});

describe('formatNumber re-export', () => {
  it('should format numbers correctly', () => {
    expect(formatNumber(1500000)).toBe('1.5M');
  });
});
