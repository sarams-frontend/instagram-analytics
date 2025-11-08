import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading = false }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 focus-within:border-orange-500 transition-colors">
          <div className="pl-4 pr-2">
            <Search className="text-gray-400" size={24} />
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa el nombre de usuario de Instagram (ej: noelbayarri)"
            className="flex-1 py-4 px-2 text-lg text-gray-900 placeholder:text-gray-400 outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="btn-primary m-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Buscando...' : 'Analizar'}
          </button>
        </div>
      </form>
      <p className="text-sm text-gray-600 mt-3 text-center">
        Introduce el nombre de usuario sin @ para obtener el análisis completo
      </p>
    </div>
  );
};
