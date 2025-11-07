import React from 'react';
import { Users, AlertTriangle, CheckCircle } from 'lucide-react';
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

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6">Calidad de la Audiencia</h2>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Puntuación de Calidad</span>
          <span className="text-2xl font-bold text-green-600">{quality.qualityScore}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${quality.qualityScore}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <h3 className="font-semibold text-gray-900">Seguidores Reales</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {quality.realFollowers.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">{realFollowersPercentage}% del total</div>
        </div>

        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <h3 className="font-semibold text-gray-900">Seguidores Sospechosos</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {quality.suspiciousFollowers.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">{suspiciousPercentage}% del total</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <Users className="text-blue-600 mt-1" size={20} />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">¿Qué significa esto?</h4>
            <p className="text-sm text-gray-600">
              Una puntuación alta indica que la mayoría de los seguidores son cuentas reales y
              activas. Los seguidores sospechosos pueden incluir bots, cuentas inactivas o
              seguidores comprados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
