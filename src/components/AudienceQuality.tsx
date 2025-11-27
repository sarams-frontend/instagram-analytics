import React from 'react';
import { Users, AlertTriangle, CheckCircle, Shield, Info, TrendingUp } from 'lucide-react';
import type { AudienceQuality as AudienceQualityType } from '@/types/instagram';

interface AudienceQualityProps {
  quality: AudienceQualityType;
}

export const AudienceQuality: React.FC<AudienceQualityProps> = ({ quality }) => {
  const realFollowersPercentage = (
    (quality.realFollowers / (quality.realFollowers + quality.suspiciousFollowers)) * 100
  ).toFixed(1);

  const suspiciousPercentage = (
    (quality.suspiciousFollowers / (quality.realFollowers + quality.suspiciousFollowers)) * 100
  ).toFixed(1);

  const getQualityLevel = (score: number) => {
    if (score >= 80) return { text: 'Excelente', color: 'green', icon: CheckCircle };
    if (score >= 60) return { text: 'Buena', color: 'blue', icon: TrendingUp };
    if (score >= 40) return { text: 'Media', color: 'yellow', icon: AlertTriangle };
    return { text: 'Baja', color: 'red', icon: AlertTriangle };
  };

  const qualityLevel = getQualityLevel(quality.qualityScore);
  const QualityIcon = qualityLevel.icon;

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Calidad de la Audiencia</h2>
          <p className="text-gray-500">Análisis de autenticidad de seguidores</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
          <Shield className="text-white" size={28} />
        </div>
      </div>

      {/* Score Principal - Grande y destacado */}
      <div className="relative mb-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 bg-${qualityLevel.color}-500 rounded-xl`}>
                <QualityIcon size={24} className="text-white" />
              </div>
              <div>
                <div className="text-white/80 text-sm font-medium">Puntuación de Calidad</div>
                <div className={`text-${qualityLevel.color}-400 text-xs font-semibold`}>{qualityLevel.text}</div>
              </div>
            </div>

            <div className="flex items-end gap-2 mb-4">
              <div className="text-7xl font-bold text-white">{quality.qualityScore}</div>
              <div className="text-3xl font-bold text-white/60 mb-2">/100</div>
            </div>

            {/* Barra de progreso */}
            <div className="relative w-full max-w-md">
              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-4 rounded-full transition-all duration-1000 bg-gradient-to-r from-${qualityLevel.color}-500 to-${qualityLevel.color}-400`}
                  style={{ width: `${quality.qualityScore}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/60 mt-2">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Visual de círculo con porcentaje */}
          <div className="hidden lg:block relative">
            <svg className="transform -rotate-90 w-40 h-40">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-white/10"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${(quality.qualityScore * 4.4)} 440`}
                className={`text-${qualityLevel.color}-400`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{quality.qualityScore}%</div>
                <div className="text-xs text-white/60">Calidad</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Seguidores Reales */}
        <div className="group relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          {/* Animated background */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-300 rounded-full -mr-20 -mt-20 opacity-20 group-hover:scale-150 transition-transform duration-500" />

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500 rounded-xl shadow-lg">
                <CheckCircle className="text-white" size={28} />
              </div>
              <div className="text-xs font-bold text-green-700 bg-green-200 px-3 py-1.5 rounded-full">
                {realFollowersPercentage}%
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">Seguidores Reales</h3>

            <div className="text-4xl font-bold text-gray-900 mb-2">
              {quality.realFollowers.toLocaleString()}
            </div>

            <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
              <Users size={16} />
              <span>Cuentas auténticas y activas</span>
            </div>

            {/* Mini barra de progreso */}
            <div className="mt-4 w-full bg-green-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${realFollowersPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Seguidores Sospechosos */}
        <div className="group relative bg-gradient-to-br from-red-50 via-orange-50 to-red-100 rounded-2xl p-6 border-2 border-red-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          {/* Animated background */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-300 rounded-full -mr-20 -mt-20 opacity-20 group-hover:scale-150 transition-transform duration-500" />

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500 rounded-xl shadow-lg">
                <AlertTriangle className="text-white" size={28} />
              </div>
              <div className="text-xs font-bold text-red-700 bg-red-200 px-3 py-1.5 rounded-full">
                {suspiciousPercentage}%
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">Seguidores Sospechosos</h3>

            <div className="text-4xl font-bold text-gray-900 mb-2">
              {quality.suspiciousFollowers.toLocaleString()}
            </div>

            <div className="flex items-center gap-2 text-sm text-red-700 font-medium">
              <AlertTriangle size={16} />
              <span>Bots o cuentas inactivas</span>
            </div>

            {/* Mini barra de progreso */}
            <div className="mt-4 w-full bg-red-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${suspiciousPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info boxes */}
      <div className="space-y-4">
        <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="text-blue-600 mt-1 flex-shrink-0" size={22} />
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-2">¿Qué significa la puntuación de calidad?</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Una puntuación alta (80+) indica que la mayoría de los seguidores son <span className="font-semibold">cuentas reales y activas</span>.
                Los seguidores sospechosos pueden incluir bots, cuentas inactivas o seguidores comprados que no aportan valor real a tu engagement.
              </p>
            </div>
          </div>
        </div>

        {quality.qualityScore < 60 && (
          <div className="p-5 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-orange-600 mt-1 flex-shrink-0" size={22} />
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2">Recomendación</h4>
                <p className="text-sm text-gray-700">
                  Tu puntuación de calidad es mejorable. Considera enfocarte en conseguir seguidores orgánicos a través de contenido de valor en lugar de recurrir a métodos artificiales.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
