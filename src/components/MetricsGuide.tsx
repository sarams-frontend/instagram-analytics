import React, { useState } from 'react';
import { TrendingUp, Heart, MessageCircle, Users, Target, Award, Shield, Calendar, X, Info } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  emoji: string;
  title: string;
  tagline: string;
  value: string;
  gradient: string;
  description: string;
  howToCalculate: string;
  goodValue: string;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  emoji,
  title,
  tagline,
  value,
  gradient,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-gray-100 hover:border-orange-300 cursor-pointer flex flex-col"
      style={{ minHeight: '100%' }}
    >
      {/* Icono - Altura fija */}
      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-4 group-hover:scale-110 transition-transform duration-300 self-start`}>
        {icon}
      </div>

      {/* Título - Altura fija con line-clamp */}
      <div className="flex items-center gap-2 mb-2 min-h-[40px]">
        <span className="text-3xl leading-none">{emoji}</span>
        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{title}</h3>
      </div>

      {/* Tagline - Altura fija de 2 líneas */}
      <p className="text-gray-600 font-medium mb-4 min-h-[48px] line-clamp-2">{tagline}</p>

      {/* Espaciador flexible */}
      <div className="flex-grow"></div>

      {/* Valor - Siempre al fondo */}
      <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg p-3 border border-orange-200 mb-3 min-h-[52px] flex items-center justify-center">
        <p className="text-sm text-gray-800 font-semibold text-center">{value}</p>
      </div>

      {/* Footer - Siempre al fondo */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 group-hover:text-orange-600 transition-colors min-h-[20px]">
        <Info size={14} />
        <span className="font-medium">Click para saber más</span>
      </div>
    </div>
  );
};

interface MetricModalProps {
  isOpen: boolean;
  onClose: () => void;
  metric: MetricCardProps | null;
}

const MetricModal: React.FC<MetricModalProps> = ({ isOpen, onClose, metric }) => {
  if (!isOpen || !metric) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Compacto y responsive */}
        <div className={`bg-gradient-to-br ${metric.gradient} p-3 sm:p-4 text-white rounded-t-xl sm:rounded-t-2xl relative`}>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} className="sm:hidden" />
            <X size={24} className="hidden sm:block" />
          </button>

          <div className="flex items-center gap-2 sm:gap-3 pr-8">
            <div className="p-2 sm:p-3 bg-white/20 rounded-lg backdrop-blur-sm flex-shrink-0">
              {metric.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <span className="text-xl sm:text-2xl flex-shrink-0">{metric.emoji}</span>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold truncate">{metric.title}</h2>
              </div>
              <p className="text-white/90 text-xs sm:text-sm lg:text-base line-clamp-2">{metric.tagline}</p>
            </div>
          </div>
        </div>

        {/* Content - Grid responsive de 2 columnas en desktop */}
        <div className="p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {/* Descripción */}
            <div className="lg:col-span-2">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Info className="text-orange-500 flex-shrink-0" size={18} />
                <span>¿Qué es?</span>
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{metric.description}</p>
            </div>

            {/* Cómo se calcula */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 sm:p-4 border border-blue-200">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-base sm:text-lg">📊</span>
                <span>¿Cómo se calcula?</span>
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{metric.howToCalculate}</p>
            </div>

            {/* Valores buenos */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 border border-green-200">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-base sm:text-lg">✅</span>
                <span>¿Qué es un buen valor?</span>
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{metric.goodValue}</p>
            </div>

            {/* Valor actual */}
            <div className="lg:col-span-2 bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg p-3 sm:p-4 border border-orange-200">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-base sm:text-lg">💡</span>
                <span>Resumen</span>
              </h3>
              <p className="text-gray-800 font-semibold text-sm sm:text-base">{metric.value}</p>
            </div>
          </div>
        </div>

        {/* Footer - Compacto */}
        <div className="p-3 sm:p-4 bg-gray-50 rounded-b-xl sm:rounded-b-2xl border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export const MetricsGuide: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricCardProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMetricClick = (metric: MetricCardProps) => {
    setSelectedMetric(metric);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMetric(null), 300);
  };

  const metrics: MetricCardProps[] = [
    {
      icon: <TrendingUp className="text-white" size={28} />,
      emoji: '🚀',
      title: 'Engagement Rate',
      tagline: '¿Cuánta gente realmente interactúa?',
      value: '>3% = Audiencia real y activa ✨',
      gradient: 'from-orange-500 to-red-500',
      description: 'El Engagement Rate es el porcentaje de seguidores que realmente interactúan con el contenido del influencer. Es la métrica más importante para medir la calidad de una audiencia, ya que indica cuántos seguidores están activos y comprometidos con el contenido.',
      howToCalculate: 'Se calcula dividiendo el total de interacciones (likes + comentarios + guardados + compartidos) entre el número de seguidores, multiplicado por 100. Por ejemplo: si un influencer tiene 10,000 seguidores y recibe 500 interacciones por publicación, su engagement rate es del 5%.',
      goodValue: 'Un engagement rate superior al 3% es excelente e indica una audiencia real y comprometida. Entre 1-3% es bueno. Menos del 1% puede indicar seguidores falsos o inactivos. Los micro-influencers suelen tener tasas más altas (5-10%) que los mega-influencers.',
    },
    {
      icon: <Heart className="text-white" size={28} />,
      emoji: '❤️',
      title: 'Likes Promedio',
      tagline: 'El alcance real de cada post',
      value: 'Promedio de últimas 20 publicaciones',
      gradient: 'from-pink-500 to-red-500',
      description: 'Los likes promedio muestran cuántas personas aprecian el contenido del influencer en cada publicación. Es un indicador directo del alcance y atractivo del contenido, aunque por sí solo no es tan valioso como el engagement rate.',
      howToCalculate: 'Se toma el número total de likes de las últimas 20-30 publicaciones y se divide entre el número de publicaciones analizadas. Esto nos da un promedio consistente que elimina variaciones por publicaciones virales puntuales.',
      goodValue: 'Un buen número de likes depende del tamaño de la audiencia. Lo ideal es que sea al menos el 2-5% del número total de seguidores. Por ejemplo, una cuenta con 100,000 seguidores debería tener al menos 2,000-5,000 likes por publicación para ser considerada de calidad.',
    },
    {
      icon: <MessageCircle className="text-white" size={28} />,
      emoji: '💬',
      title: 'Comentarios',
      tagline: 'La conexión verdadera con fans',
      value: 'Más valiosos que los likes 🎯',
      gradient: 'from-blue-500 to-purple-500',
      description: 'Los comentarios representan el nivel más alto de compromiso de una audiencia. Mientras que dar un "like" requiere un solo tap, dejar un comentario requiere tiempo, esfuerzo y una conexión genuina con el contenido. Son el indicador más fuerte de una comunidad activa y comprometida.',
      howToCalculate: 'Se calcula el promedio de comentarios de las últimas 20-30 publicaciones. También se analiza la calidad de estos comentarios para detectar si son genuinos o spam/bots (comentarios genéricos como "nice!" o emojis solos pueden ser sospechosos).',
      goodValue: 'Una proporción saludable es 1 comentario por cada 10-20 likes. Por ejemplo, si una publicación tiene 1,000 likes, debería tener entre 50-100 comentarios. Menos de esto puede indicar baja conexión con la audiencia, y mucho más puede indicar un nicho muy comprometido.',
    },
    {
      icon: <Users className="text-white" size={28} />,
      emoji: '👥',
      title: 'Seguidores',
      tagline: 'Alcance potencial total',
      value: 'Cantidad ≠ Calidad (mira engagement)',
      gradient: 'from-purple-500 to-pink-500',
      description: 'El número de seguidores indica el tamaño potencial de la audiencia que el influencer puede alcanzar. Sin embargo, es la métrica más fácil de manipular comprando seguidores falsos, por lo que NUNCA debe evaluarse de forma aislada. Siempre debe analizarse en conjunto con el engagement rate.',
      howToCalculate: 'Es el número total de cuentas que siguen al perfil. Este dato se obtiene directamente de Instagram. También analizamos el crecimiento histórico para detectar picos sospechosos que puedan indicar compra de seguidores.',
      goodValue: 'No existe un número "bueno" o "malo" de seguidores per se. Lo importante es la relación con el engagement. Un influencer con 10,000 seguidores reales (5% engagement) es más valioso que uno con 1 millón de seguidores falsos (0.5% engagement). Para campañas de marketing, busca calidad sobre cantidad.',
    },
    {
      icon: <Calendar className="text-white" size={28} />,
      emoji: '📈',
      title: 'Crecimiento',
      tagline: '¿Natural o comprado?',
      value: 'Detectamos picos sospechosos 🔍',
      gradient: 'from-green-500 to-teal-500',
      description: 'El análisis de crecimiento muestra cómo ha evolucionado el número de seguidores a lo largo del tiempo. Un crecimiento orgánico es gradual y constante, mientras que picos repentinos pueden indicar compra de seguidores o contenido viral (que debe verificarse).',
      howToCalculate: 'Rastreamos el número de seguidores mes a mes durante los últimos 12 meses. Calculamos la tasa de crecimiento mensual y detectamos anomalías estadísticas. Un algoritmo identifica patrones sospechosos como aumentos de más del 20% en un solo día.',
      goodValue: 'Un crecimiento orgánico saludable está entre 3-10% mensual para cuentas pequeñas/medianas, y 1-5% para cuentas grandes. Crecimiento superior al 50% en un mes es sospechoso a menos que haya una razón clara (cobertura mediática, colaboración viral, etc.). La consistencia es clave.',
    },
    {
      icon: <Target className="text-white" size={28} />,
      emoji: '🎯',
      title: 'Categorías',
      tagline: '¿De qué habla el creador?',
      value: 'Moda, fitness, viajes... clasificado por IA',
      gradient: 'from-yellow-500 to-orange-500',
      description: 'Las categorías de contenido clasifican automáticamente los temas principales sobre los que publica el influencer. Esto ayuda a identificar si el influencer es relevante para tu nicho de mercado y si su audiencia está interesada en productos o servicios similares.',
      howToCalculate: 'Utilizamos algoritmos de procesamiento de lenguaje natural (IA) que analizan los hashtags, descripciones y contenido visual de las publicaciones. El sistema identifica patrones y clasifica el contenido en categorías como: Lifestyle, Moda, Fitness, Viajes, Tecnología, Comida, etc.',
      goodValue: 'Lo ideal es que un influencer tenga 1-3 categorías principales bien definidas (60-80% del contenido), lo que indica un nicho claro. Demasiadas categorías dispersas pueden indicar falta de enfoque y una audiencia menos comprometida. Para colaboraciones, busca alineación del 70%+ con tu marca.',
    },
    {
      icon: <Award className="text-white" size={28} />,
      emoji: '🏆',
      title: 'Rankings',
      tagline: 'Top influencers de cada nicho',
      value: 'Posición global, país y categoría',
      gradient: 'from-indigo-500 to-blue-500',
      description: 'Los rankings posicionan al influencer en comparación con otros creadores a nivel global, nacional y dentro de su categoría específica. Esto proporciona contexto sobre su nivel de influencia y relevancia en su nicho de mercado.',
      howToCalculate: 'Comparamos métricas clave (seguidores, engagement, calidad de audiencia) con millones de otros perfiles en nuestra base de datos. Calculamos scores ponderados donde el engagement vale más que los seguidores absolutos, y asignamos posiciones relativas en diferentes categorías.',
      goodValue: 'Top 10% global = Elite. Top 25% = Muy bueno. Top 50% = Bueno. La posición en la categoría específica suele ser más relevante que el ranking global. Un influencer #5 en "Fitness Vegano" puede ser más valioso que #1000 en "Lifestyle" general para una marca de nutrición vegana.',
    },
    {
      icon: <Shield className="text-white" size={28} />,
      emoji: '🛡️',
      title: 'Calidad de Audiencia',
      tagline: '¿Seguidores reales o bots?',
      value: '>80% calidad = Perfil confiable ✅',
      gradient: 'from-red-500 to-pink-500',
      description: 'El score de calidad de audiencia evalúa qué porcentaje de los seguidores son cuentas reales y activas versus bots, cuentas inactivas o seguidores comprados. Es crucial para evitar desperdiciar presupuesto de marketing en audiencias falsas.',
      howToCalculate: 'Analizamos una muestra de seguidores buscando patrones de bots: cuentas sin foto de perfil, sin biografía, sin publicaciones, con nombres aleatorios, ratio sospechoso de seguidos/seguidores, engagement nulo. También detectamos granjas de bots por geolocalización y patrones de actividad.',
      goodValue: 'Score superior al 80% = Excelente, audiencia muy genuina. 60-80% = Bueno, normal para cuentas grandes. 40-60% = Precaución, puede haber comprado algunos seguidores. Menos del 40% = Alerta roja, la mayoría son seguidores falsos. No trabajes con perfiles bajo 50% de calidad.',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
            ¿Qué medimos?
            <div className="inline-flex rounded-xl shadow-lg animate-pulse w-12 h-12">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="metricGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect width="100" height="100" rx="20" fill="url(#metricGrad)"/>
                <g fill="white" opacity="0.95">
                  <rect x="20" y="65" width="12" height="15" rx="2"/>
                  <rect x="37" y="50" width="12" height="30" rx="2"/>
                  <rect x="54" y="35" width="12" height="45" rx="2"/>
                  <rect x="71" y="20" width="12" height="60" rx="2"/>
                  <path d="M 25 45 L 43 35 L 60 28 L 77 15" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
                  <polygon points="77,15 72,18 75,23" fill="white" opacity="0.8"/>
                </g>
              </svg>
            </div>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitas saber para evaluar influencers
          </p>
        </div>

        {/* Metrics Grid - Todas las tarjetas con la misma altura */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 auto-rows-fr">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} onClick={() => handleMetricClick(metric)} />
          ))}
        </div>

        {/* Modal */}
        <MetricModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          metric={selectedMetric}
        />

        {/* Simple Info Box */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-center text-white shadow-2xl mb-8">
          <p className="text-xl font-bold mb-2">
            💡 No todos los seguidores valen lo mismo
          </p>
          <p className="text-white/90 text-lg">
            10K seguidores reales {'>'} 1M seguidores falsos
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl p-8 text-center text-white shadow-xl">
          <h3 className="text-3xl font-bold mb-2">🚀 ¡Pruébalo ahora!</h3>
          <p className="text-white/90 text-lg mb-6">
            Busca cualquier usuario arriba y obtén su análisis completo
          </p>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <div className="flex items-center gap-2 text-lg">
              <span className="text-2xl">⚡</span>
              <span>Instantáneo</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <span className="text-2xl">📈</span>
              <span>Datos reales</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🎯</span>
              <span>100% preciso</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
