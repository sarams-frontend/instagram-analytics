import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {/* Logo con degradado matching el favicon */}
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>

                {/* Fondo con degradado */}
                <rect width="100" height="100" rx="20" fill="url(#logoGrad)"/>

                {/* Icono de gráfica de barras ascendente */}
                <g fill="white" opacity="0.95">
                  {/* Barra 1 (corta) */}
                  <rect x="20" y="65" width="12" height="15" rx="2"/>

                  {/* Barra 2 (media) */}
                  <rect x="37" y="50" width="12" height="30" rx="2"/>

                  {/* Barra 3 (alta) */}
                  <rect x="54" y="35" width="12" height="45" rx="2"/>

                  {/* Barra 4 (más alta) */}
                  <rect x="71" y="20" width="12" height="60" rx="2"/>

                  {/* Flecha de tendencia hacia arriba */}
                  <path d="M 25 45 L 43 35 L 60 28 L 77 15"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        opacity="0.8"/>

                  {/* Punta de flecha */}
                  <polygon points="77,15 72,18 75,23" fill="white" opacity="0.8"/>
                </g>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Instagram Analytics
              </h1>
              <p className="text-xs text-gray-600">Analiza cualquier creador</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
