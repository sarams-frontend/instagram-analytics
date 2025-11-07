import React from 'react';
import { Trophy, MapPin, Tag } from 'lucide-react';
import type { Rankings as RankingsType } from '@/types/instagram';

interface RankingsProps {
  rankings: RankingsType;
}

export const Rankings: React.FC<RankingsProps> = ({ rankings }) => {
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6">Clasificaciones</h2>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Trophy className="text-yellow-600" size={24} />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900 mb-1">
              Clasificación global: {rankings.globalRank.toLocaleString()} mundial
            </div>
            <div className="text-sm text-gray-600">
              Según el rendimiento general de la cuenta y de la calidad de la audiencia en todo el mundo
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MapPin className="text-blue-600" size={24} />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900 mb-1">
              Clasificación nacional: {rankings.countryRank.toLocaleString()} en {rankings.country}
            </div>
            <div className="text-sm text-gray-600">
              Según el rendimiento general de la cuenta y de la calidad de la audiencia en {rankings.country}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Tag className="text-purple-600" size={24} />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900 mb-1">
              Rango de categoría: {rankings.categoryRank} en {rankings.category} ({rankings.country})
            </div>
            <div className="text-sm text-gray-600">
              Según el rendimiento general de la cuenta y de la calidad de la audiencia en {rankings.category} en {rankings.country}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
