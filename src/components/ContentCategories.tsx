import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Tag, TrendingUp, Info } from 'lucide-react';
import type { ContentCategory } from '@/types/instagram';

interface ContentCategoriesProps {
  categories: ContentCategory[];
}

export const ContentCategories: React.FC<ContentCategoriesProps> = ({ categories }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [chartSize, setChartSize] = useState({ outer: 120, inner: 60 });
  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: ContentCategory | null }>({
    x: 0,
    y: 0,
    data: null,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPercentage = categories.reduce((acc, cat) => acc + cat.percentage, 0);
  const mainCategory = categories.length > 0 ? categories[0] : null;

  // Normalizar categorías para que sumen 100%
  const normalizedCategories = categories.map(cat => ({
    ...cat,
    percentage: totalPercentage > 0 ? (cat.percentage / totalPercentage) * 100 : 0,
  }));

  useEffect(() => {
    const updateChartSize = () => {
      if (window.innerWidth < 640) {
        setChartSize({ outer: 90, inner: 70 });
      } else {
        setChartSize({ outer: 120, inner: 95 });
      }
    };

    updateChartSize();
    window.addEventListener('resize', updateChartSize);
    return () => window.removeEventListener('resize', updateChartSize);
  }, []);

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Categorías de Contenido</h2>
          <p className="text-gray-500">Distribución temática de publicaciones</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl shadow-lg">
          <Tag className="text-white" size={28} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Gráfica de pastel mejorada - Responsive */}
        <div className="relative">
          <div
            ref={containerRef}
            className="w-full h-64 sm:h-80 relative"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setTooltip(prev => ({
                ...prev,
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              }));
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setTooltip({ x: 0, y: 0, data: null });
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={normalizedCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={false}
                  outerRadius={chartSize.outer}
                  innerRadius={chartSize.inner}
                  fill="#8884d8"
                  dataKey="percentage"
                  onMouseEnter={(_, index) => {
                    setHoveredIndex(index);
                    setTooltip(prev => ({ ...prev, data: categories[index] }));
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setTooltip({ x: 0, y: 0, data: null });
                  }}
                >
                  {normalizedCategories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.3}
                      className="transition-opacity duration-300 cursor-pointer"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Custom Tooltip que mantiene distancia fija del borde del donut */}
            {tooltip.data && containerRef.current && (() => {
              // Obtener dimensiones reales del contenedor
              const rect = containerRef.current.getBoundingClientRect();
              const containerWidth = rect.width;
              const containerHeight = rect.height;

              // Centro exacto del gráfico
              const centerX = containerWidth / 2;
              const centerY = containerHeight / 2;

              // Calcular ángulo desde el centro hacia el cursor
              const dx = tooltip.x - centerX;
              const dy = tooltip.y - centerY;
              const angle = Math.atan2(dy, dx);

              // Radio del círculo exterior + margen fijo de separación
              const outerRadius = chartSize.outer;
              const margin = 60; // Distancia fija desde el borde del donut
              const tooltipDistance = outerRadius + margin;

              // Calcular posición del tooltip usando coordenadas polares
              // Posicionar en el borde del círculo imaginario a distancia fija
              const tooltipCenterX = centerX + Math.cos(angle) * tooltipDistance;
              const tooltipCenterY = centerY + Math.sin(angle) * tooltipDistance;

              // Ajustar para centrar el tooltip en esa posición
              const tooltipWidth = 140;
              const tooltipHeight = 90;
              const finalX = tooltipCenterX - tooltipWidth / 2;
              const finalY = tooltipCenterY - tooltipHeight / 2;

              return (
                <div
                  className="absolute pointer-events-none z-50"
                  style={{
                    left: `${finalX}px`,
                    top: `${finalY}px`,
                  }}
                >
                  <div className="bg-white/98 border-2 border-orange-300 rounded-xl shadow-2xl p-3 min-w-[120px]">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: tooltip.data.color }}
                      />
                      <p className="text-sm font-semibold text-gray-900">{tooltip.data.name}</p>
                    </div>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                      {tooltip.data.percentage}%
                    </p>
                    <p className="text-xs text-gray-500">del total</p>
                  </div>
                </div>
              );
            })()}

            {/* Centro del donut con info principal - Responsive y dinámico */}
            {mainCategory && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
                <div className="text-center max-w-[100px] sm:max-w-[120px]">
                  <div className="text-[10px] sm:text-xs text-gray-500 font-medium mb-0.5">Principal</div>
                  <div
                    className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 line-clamp-2 leading-tight mb-0.5"
                    title={mainCategory.name}
                  >
                    {mainCategory.name}
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                    {mainCategory.percentage}%
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lista de categorías mejorada */}
        <div className="space-y-3">
          {categories.map((category, index) => {
            const isHovered = hoveredIndex === index;
            const isMain = index === 0;

            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer
                  ${isHovered ? 'border-gray-300 shadow-lg -translate-y-1' : 'border-gray-200'}
                  ${isMain ? 'ring-2 ring-orange-200' : ''}
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {isMain && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    Principal
                  </div>
                )}

                <div className="flex items-center gap-4">
                  {/* Color dot */}
                  <div
                    className="w-12 h-12 rounded-xl shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: category.color }}
                  >
                    <Tag className="text-white" size={20} />
                  </div>

                  {/* Category info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {category.name}
                      </h3>
                      {index === 0 && <TrendingUp size={16} className="text-orange-500" />}
                    </div>

                    {/* Progress bar */}
                    <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${category.percentage}%`,
                          backgroundColor: category.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Percentage */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {category.percentage}%
                    </div>
                    <div className="text-xs text-gray-500">del total</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info adicional */}
      <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
        <div className="flex items-start gap-3">
          <Info className="text-blue-600 mt-1 flex-shrink-0" size={22} />
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-2">Análisis de contenido</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              Esta distribución muestra los temas principales de las publicaciones. Una buena estrategia de contenido
              mantiene un balance entre las categorías principales mientras se enfoca en el nicho específico.
              {mainCategory && (
                <span className="font-semibold text-gray-900"> Tu contenido se centra principalmente en {mainCategory.name}.</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
