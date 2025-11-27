import React from 'react';
import { TrendingUp, Heart, MessageCircle, Zap, Info } from 'lucide-react';
import type { EngagementMetrics, InstagramProfile } from '@/types/instagram';
import { formatNumber } from '@/lib/utils';

interface EngagementStatsProps {
  metrics: EngagementMetrics;
  profile: InstagramProfile;
}

export const EngagementStats: React.FC<EngagementStatsProps> = ({ metrics, profile }) => {

  const getEngagementLevel = (rate: number) => {
    if (rate >= 5) return { text: 'Excelente', color: 'green', bg: 'bg-green-500' };
    if (rate >= 3) return { text: 'Muy Bueno', color: 'blue', bg: 'bg-blue-500' };
    if (rate >= 1) return { text: 'Bueno', color: 'yellow', bg: 'bg-yellow-500' };
    return { text: 'Mejorable', color: 'orange', bg: 'bg-orange-500' };
  };

  const engagementLevel = getEngagementLevel(metrics.engagementRate);

  return (
    <div className="card">
      {/* Header con indicador de nivel */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Métricas de Engagement</h2>
          <p className="text-gray-500">Análisis de interacción con la audiencia</p>
        </div>
        <div className={`px-4 py-2 rounded-full bg-${engagementLevel.color}-100 border-2 border-${engagementLevel.color}-300`}>
          <span className={`text-${engagementLevel.color}-700 font-bold text-sm`}>
            {engagementLevel.text}
          </span>
        </div>
      </div>

      {/* Engagement Rate destacado */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-8 mb-6 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp size={32} />
              </div>
              <div>
                <div className="text-sm font-medium opacity-90">Tasa de Engagement</div>
                <div className="text-xs opacity-75">Promedio de interacciones</div>
              </div>
            </div>
            <div className="text-6xl font-bold mb-2">
              {metrics.engagementRate.toFixed(2)}%
            </div>
            <div className="flex items-start gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p className="text-sm opacity-90">
                {metrics.engagementRate >= 3
                  ? '¡Excelente! Tu audiencia está muy comprometida'
                  : metrics.engagementRate >= 1
                  ? 'Buen nivel de interacción con tu contenido'
                  : 'Hay oportunidad de mejorar la interacción'}
              </p>
            </div>
          </div>
          {/* Visual circular progress */}
          <div className="relative w-32 h-32 hidden lg:block">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-white/20"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${(metrics.engagementRate * 35.2)} 352`}
                className="text-white"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap size={32} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Seguidores */}
        <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-300 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div className="text-xs font-semibold text-purple-600 bg-purple-200 px-3 py-1 rounded-full">
                Total
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {formatNumber(profile.followers)}
            </div>
            <div className="text-sm font-medium text-gray-600 mb-1">Seguidores</div>
            <div className="text-xs text-purple-600 font-semibold">
              {profile.followers.toLocaleString()} personas
            </div>
          </div>
        </div>

        {/* Promedio de Likes */}
        <div className="group relative bg-gradient-to-br from-pink-50 to-red-100 rounded-2xl p-6 border-2 border-pink-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-300 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-pink-500 rounded-xl">
                <Heart className="text-white" size={24} />
              </div>
              <div className="text-xs font-semibold text-pink-600 bg-pink-200 px-3 py-1 rounded-full">
                Promedio
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {formatNumber(metrics.avgLikes)}
            </div>
            <div className="text-sm font-medium text-gray-600 mb-1">Me Gusta</div>
            <div className="text-xs text-pink-600 font-semibold">
              {metrics.avgLikes.toLocaleString()} por post
            </div>
          </div>
        </div>

        {/* Promedio de Comentarios */}
        <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-6 border-2 border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <MessageCircle className="text-white" size={24} />
              </div>
              <div className="text-xs font-semibold text-blue-600 bg-blue-200 px-3 py-1 rounded-full">
                Promedio
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {formatNumber(metrics.avgComments)}
            </div>
            <div className="text-sm font-medium text-gray-600 mb-1">Comentarios</div>
            <div className="text-xs text-blue-600 font-semibold">
              {metrics.avgComments.toLocaleString()} por post
            </div>
          </div>
        </div>
      </div>

      {/* Info adicional */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <div className="flex items-start gap-3">
          <Info className="text-gray-400 mt-1" size={20} />
          <div className="flex-1">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">¿Cómo se calcula?</span> La tasa de engagement se calcula dividiendo el promedio de interacciones (likes + comentarios) entre el número de seguidores y multiplicando por 100.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
