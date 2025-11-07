import React from 'react';
import { BarChart3 } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500 rounded-lg">
              <BarChart3 className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Instagram Analytics</h1>
              <p className="text-xs text-gray-600">Analiza cualquier creador</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="btn-secondary text-sm">
              Iniciar sesión
            </button>
            <button className="btn-primary text-sm">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
