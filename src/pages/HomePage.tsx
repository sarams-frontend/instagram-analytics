import React, { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { ProfileHeader } from '@/components/ProfileHeader';
import { EngagementStats } from '@/components/EngagementStats';
import { ContentCategories } from '@/components/ContentCategories';
import { Rankings } from '@/components/Rankings';
import { AudienceQuality } from '@/components/AudienceQuality';
import { FollowerGrowthChart } from '@/components/FollowerGrowthChart';
import { InstagramService } from '@/services/instagram.service';
import type { InstagramAnalytics } from '@/types/instagram';
import { AlertCircle } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<InstagramAnalytics | null>(null);

  const handleSearch = async (username: string) => {
    setLoading(true);
    setError(null);
    setAnalytics(null);

    try {
      const data = await InstagramService.getCompleteAnalytics(username);
      setAnalytics(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al obtener los datos. Verifica que el usuario existe y tu API key está configurada.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Analiza Influencers de Instagram
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Obtén métricas detalladas, análisis de audiencia y estadísticas de engagement
            </p>
          </div>

          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-600 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Analizando perfil...</p>
          </div>
        )}

        {analytics && !loading && (
          <div className="space-y-8">
            <ProfileHeader profile={analytics.profile} />
            <EngagementStats metrics={analytics.engagement} />
            <ContentCategories categories={analytics.categories} />
            <Rankings rankings={analytics.rankings} />
            <AudienceQuality quality={analytics.audienceQuality} />
            <FollowerGrowthChart data={analytics.followerGrowth} />
          </div>
        )}

        {!analytics && !loading && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Comienza tu análisis
            </h2>
            <p className="text-gray-600">
              Ingresa un nombre de usuario de Instagram para ver estadísticas detalladas
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2025 Instagram Analytics. Desarrollado con React y RapidAPI</p>
            <p className="mt-2">
              Última actualización: {new Date().toLocaleDateString('es-ES', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
