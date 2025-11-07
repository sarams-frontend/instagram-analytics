import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { FollowerGrowth } from '@/types/instagram';

interface FollowerGrowthChartProps {
  data: FollowerGrowth[];
}

export const FollowerGrowthChart: React.FC<FollowerGrowthChartProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6">Tendencias de Seguidores</h2>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              tickFormatter={formatNumber}
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              formatter={(value: number) => [value.toLocaleString(), 'Seguidores']}
              labelFormatter={formatDate}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '10px',
              }}
            />
            <Line
              type="monotone"
              dataKey="followers"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ fill: '#f97316', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-600 mb-1">Crecimiento Total</div>
            <div className="text-xl font-bold text-gray-900">
              +{formatNumber(data[data.length - 1].followers - data[0].followers)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Seguidores Actuales</div>
            <div className="text-xl font-bold text-gray-900">
              {formatNumber(data[data.length - 1].followers)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Período</div>
            <div className="text-xl font-bold text-gray-900">12 meses</div>
          </div>
        </div>
      </div>
    </div>
  );
};
