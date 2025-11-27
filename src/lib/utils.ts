import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Number formatting constants
export const NUMBER_FORMAT = {
  BILLION: 1000000000,
  MILLION: 1000000,
  THOUSAND: 1000,
} as const;

// Engagement calculation constants
export const ENGAGEMENT_CONSTANTS = {
  BASE_RATE: 0.9,
  VARIANCE: 0.1,
} as const;

/**
 * Formatea números grandes a formato legible (K, M, B)
 * @param num - Número a formatear
 * @returns String formateado (ej: 1.5M, 250K, 2.1B)
 * @example
 * formatNumber(1500000) // "1.5M"
 * formatNumber(250000)  // "250.0K"
 */
export function formatNumber(num: number): string {
  if (num >= NUMBER_FORMAT.BILLION) {
    return `${(num / NUMBER_FORMAT.BILLION).toFixed(1)}B`;
  }
  if (num >= NUMBER_FORMAT.MILLION) {
    return `${(num / NUMBER_FORMAT.MILLION).toFixed(1)}M`;
  }
  if (num >= NUMBER_FORMAT.THOUSAND) {
    return `${(num / NUMBER_FORMAT.THOUSAND).toFixed(1)}K`;
  }
  return num.toString();
}
