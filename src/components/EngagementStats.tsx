import React from 'react';
import { MetricCard } from './MetricCard';
import type { EngagementMetrics } from '@/types/instagram';

interface EngagementStatsProps {
  metrics: EngagementMetrics;
}

export const EngagementStats: React.FC<EngagementStatsProps> = ({ metrics }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6">Métricas de Engagement</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Tasa de engagement"
          value={`${metrics.engagementRate.toFixed(2)}%`}
          tooltip="Porcentaje de interacciones (me gusta + comentarios) en relación al número de seguidores"
        />

        <MetricCard
          title="Seguidores"
          value="617.5K"
          subtitle="Total de seguidores"
        />

        <MetricCard
          title="Promedio de «me gusta»"
          value={formatNumber(metrics.avgLikes)}
          tooltip="Promedio de me gusta por publicación"
        />

        <MetricCard
          title="Promedio de comentarios"
          value={formatNumber(metrics.avgComments)}
          tooltip="Promedio de comentarios por publicación"
        />
      </div>
    </div>
  );
};
