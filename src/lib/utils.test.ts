import { describe, it, expect } from 'vitest';
import { formatNumber, NUMBER_FORMAT, ENGAGEMENT_CONSTANTS } from './utils';

describe('formatNumber', () => {
  it('should format numbers in billions', () => {
    expect(formatNumber(1500000000)).toBe('1.5B');
    expect(formatNumber(2000000000)).toBe('2.0B');
  });

  it('should format numbers in millions', () => {
    expect(formatNumber(1500000)).toBe('1.5M');
    expect(formatNumber(2500000)).toBe('2.5M');
  });

  it('should format numbers in thousands', () => {
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(25000)).toBe('25.0K');
  });

  it('should return number as string for values less than 1000', () => {
    expect(formatNumber(999)).toBe('999');
    expect(formatNumber(500)).toBe('500');
    expect(formatNumber(0)).toBe('0');
  });

  it('should handle edge cases', () => {
    expect(formatNumber(1000)).toBe('1.0K');
    expect(formatNumber(1000000)).toBe('1.0M');
    expect(formatNumber(1000000000)).toBe('1.0B');
  });
});

describe('NUMBER_FORMAT constants', () => {
  it('should have correct values', () => {
    expect(NUMBER_FORMAT.THOUSAND).toBe(1000);
    expect(NUMBER_FORMAT.MILLION).toBe(1000000);
    expect(NUMBER_FORMAT.BILLION).toBe(1000000000);
  });
});

describe('ENGAGEMENT_CONSTANTS', () => {
  it('should have correct values', () => {
    expect(ENGAGEMENT_CONSTANTS.BASE_RATE).toBe(0.9);
    expect(ENGAGEMENT_CONSTANTS.VARIANCE).toBe(0.1);
  });

  it('should sum to 1', () => {
    const sum = ENGAGEMENT_CONSTANTS.BASE_RATE + ENGAGEMENT_CONSTANTS.VARIANCE;
    expect(sum).toBe(1);
  });
});
