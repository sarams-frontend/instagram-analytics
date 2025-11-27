import React, { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Activity, Calendar, ArrowUp, ArrowDown, Info } from 'lucide-react';
import type { FollowerGrowth } from '@/types/instagram';
import { formatNumber } from '@/lib/utils';

interface FollowerGrowthChartProps {
  data: FollowerGrowth[];
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

export const FollowerGrowthChart: React.FC<FollowerGrowthChartProps> = ({ data }) => {
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
  };

  // Calcular estadísticas
  const firstValue = data[0]?.followers || 0;
  const lastValue = data[data.length - 1]?.followers || 0;
  const totalGrowth = lastValue - firstValue;
  const growthPercentage = ((totalGrowth / firstValue) * 100).toFixed(1);
  const isPositiveGrowth = totalGrowth >= 0;

  // Calcular promedio de crecimiento mensual
  const avgMonthlyGrowth = Math.floor(totalGrowth / data.length);

  // Encontrar el mes con mayor crecimiento
  let maxGrowth = 0;
  let maxGrowthMonth = '';
  for (let i = 1; i < data.length; i++) {
    const growth = data[i].followers - data[i - 1].followers;
    if (growth > maxGrowth) {
      maxGrowth = growth;
      maxGrowthMonth = formatDate(data[i].date);
    }
  }

  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length && label) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border-2 border-purple-200 rounded-xl shadow-2xl p-4">
          <p className="text-sm font-semibold text-gray-900 mb-2">{formatDate(label)}</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            <p className="text-lg font-bold text-gray-900">
              {payload[0].value.toLocaleString()}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1">seguidores</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Tendencia de Crecimiento</h2>
          <p className="text-sm text-gray-500">Evolución de seguidores en el tiempo</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Toggle Chart Type */}
          <div className="flex bg-gray-100 rounded-xl p-1 flex-1 sm:flex-initial">
            <button
              onClick={() => setChartType('area')}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                chartType === 'area'
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Área
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                chartType === 'line'
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Línea
            </button>
          </div>
          <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl shadow-lg flex-shrink-0">
            <Activity className="text-white" size={24} />
          </div>
        </div>
      </div>

      {/* Stats Cards - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {/* Crecimiento Total */}
        <div className={`group relative rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${
          isPositiveGrowth
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
            : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200'
        }`}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"
            style={{ backgroundColor: isPositiveGrowth ? '#10b981' : '#ef4444' }}
          />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${isPositiveGrowth ? 'bg-green-500' : 'bg-red-500'}`}>
                {isPositiveGrowth ? (
                  <ArrowUp className="text-white" size={20} />
                ) : (
                  <ArrowDown className="text-white" size={20} />
                )}
              </div>
              <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                isPositiveGrowth ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
              }`}>
                {isPositiveGrowth ? '+' : ''}{growthPercentage}%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {isPositiveGrowth ? '+' : ''}{formatNumber(totalGrowth)}
            </div>
            <div className="text-sm font-medium text-gray-600">Crecimiento Total</div>
          </div>
        </div>

        {/* Seguidores Actuales */}
        <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-300 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <TrendingUp className="text-white" size={20} />
              </div>
              <div className="text-xs font-bold text-purple-600 bg-purple-200 px-2 py-1 rounded-full">
                Actual
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {formatNumber(lastValue)}
            </div>
            <div className="text-sm font-medium text-gray-600">Seguidores Actuales</div>
          </div>
        </div>

        {/* Promedio Mensual */}
        <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Calendar className="text-white" size={20} />
              </div>
              <div className="text-xs font-bold text-blue-600 bg-blue-200 px-2 py-1 rounded-full">
                /mes
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              +{formatNumber(avgMonthlyGrowth)}
            </div>
            <div className="text-sm font-medium text-gray-600">Promedio Mensual</div>
          </div>
        </div>

        {/* Mayor Crecimiento */}
        <div className="group relative bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-300 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Activity className="text-white" size={20} />
              </div>
              <div className="text-xs font-bold text-orange-600 bg-orange-200 px-2 py-1 rounded-full">
                Pico
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              +{formatNumber(maxGrowth)}
            </div>
            <div className="text-sm font-medium text-gray-600">Mejor Mes</div>
          </div>
        </div>
      </div>

      {/* Chart - Responsive */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 sm:p-6 border-2 border-gray-200">
        <div className="w-full h-64 sm:h-80 lg:h-96">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="#9ca3af"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis
                  tickFormatter={formatNumber}
                  stroke="#9ca3af"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="natural"
                  dataKey="followers"
                  stroke="url(#colorGradient)"
                  strokeWidth={3}
                  fill="url(#colorFollowers)"
                  dot={false}
                  activeDot={{ r: 6, fill: '#a855f7', strokeWidth: 2, stroke: '#fff' }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </AreaChart>
            ) : (
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="#9ca3af"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis
                  tickFormatter={formatNumber}
                  stroke="#9ca3af"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="natural"
                  dataKey="followers"
                  stroke="url(#colorGradient)"
                  strokeWidth={3}
                  dot={{ fill: '#a855f7', r: 5, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, fill: '#a855f7', strokeWidth: 3, stroke: '#fff' }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
        <div className="flex items-start gap-3">
          <Info className="text-purple-600 mt-1 flex-shrink-0" size={22} />
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-2">Interpretación del crecimiento</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {isPositiveGrowth ? (
                <>
                  <span className="font-semibold text-green-700">Tendencia positiva:</span> Has ganado{' '}
                  <span className="font-bold">{formatNumber(totalGrowth)}</span> seguidores ({growthPercentage}%) en el período analizado.
                  {maxGrowth > avgMonthlyGrowth * 2 && (
                    <> El mes de <span className="font-semibold">{maxGrowthMonth}</span> mostró un crecimiento excepcional.</>
                  )}
                </>
              ) : (
                <>
                  <span className="font-semibold text-red-700">Tendencia negativa:</span> Has perdido{' '}
                  <span className="font-bold">{formatNumber(Math.abs(totalGrowth))}</span> seguidores ({Math.abs(Number(growthPercentage))}%) en el período analizado.
                  Considera revisar tu estrategia de contenido.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
