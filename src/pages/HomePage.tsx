import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { SearchBar, SearchBarRef } from '@/components/SearchBar';
import { ProfileHeader } from '@/components/ProfileHeader';
import { EngagementStats } from '@/components/EngagementStats';
import { Rankings } from '@/components/Rankings';
import { AudienceQuality } from '@/components/AudienceQuality';
import { MetricsGuide } from '@/components/MetricsGuide';
import { InstagramService } from '@/services/instagram.service';
import type { InstagramAnalytics } from '@/types/instagram';
import { AlertCircle, Home, Search } from 'lucide-react';

// Lazy load heavy components
const FollowerGrowthChart = lazy(() => import('@/components/FollowerGrowthChart').then(module => ({ default: module.FollowerGrowthChart })));
const ContentCategories = lazy(() => import('@/components/ContentCategories').then(module => ({ default: module.ContentCategories })));

export const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<InstagramAnalytics | null>(null);
  const searchBarRef = useRef<SearchBarRef>(null);

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

  const handleNewSearch = () => {
    setAnalytics(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Focus the search input after a brief delay to allow for DOM updates
    setTimeout(() => {
      searchBarRef.current?.focus();
    }, 100);
  };

  // Auto-focus search bar when no analytics are shown
  useEffect(() => {
    if (!analytics && !loading) {
      searchBarRef.current?.focus();
    }
  }, [analytics, loading]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white transition-all duration-500 ${
        analytics ? 'py-6' : 'py-16'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {analytics ? (
            // Compact Header con botón de Nueva Búsqueda - Responsive
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm flex-shrink-0">
                  <Search className="text-white" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold truncate">Análisis de @{analytics.profile.username}</h2>
                  <p className="text-xs sm:text-sm text-white/80">Resultados de Instagram Analytics</p>
                </div>
              </div>
              <button
                onClick={handleNewSearch}
                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto justify-center flex-shrink-0"
              >
                <Home size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Nueva Búsqueda</span>
              </button>
            </div>
          ) : (
            // Hero Section completo
            <>
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Analiza Influencers de Instagram
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Obtén métricas detalladas, análisis de audiencia y estadísticas de engagement
                </p>
              </div>

              <SearchBar ref={searchBarRef} onSearch={handleSearch} loading={loading} />
            </>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <EngagementStats metrics={analytics.engagement} profile={analytics.profile} />
            <Suspense fallback={
              <div className="card animate-pulse">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            }>
              <ContentCategories categories={analytics.categories} />
            </Suspense>
            <Rankings rankings={analytics.rankings} />
            <AudienceQuality quality={analytics.audienceQuality} />
            <Suspense fallback={
              <div className="card animate-pulse">
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
            }>
              <FollowerGrowthChart data={analytics.followerGrowth} />
            </Suspense>
          </div>
        )}

        {!analytics && !loading && !error && (
          <MetricsGuide />
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
