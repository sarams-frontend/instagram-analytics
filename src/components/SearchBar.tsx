import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import axios from 'axios';
import { API_CONFIG, formatNumber } from '@/config';

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading?: boolean;
}

export interface SearchBarRef {
  focus: () => void;
}

interface SearchResult {
  username: string;
  fullName: string;
  profilePicUrl: string;
  followers: number;
  isVerified: boolean;
}

const DEBOUNCE_DELAY = 500;

export const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(({ onSearch, loading = false }, ref) => {
  const [username, setUsername] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Expose focus method to parent component
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }), []);

  // Función de búsqueda optimizada con useCallback
  const searchUsers = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSuggestions(false);
      setSearching(false);
      return;
    }

    setSearching(true);

    try {
      const response = await axios.get(`${API_CONFIG.PROXY_URL}/api/instagram/search`, {
        params: { query: searchQuery.trim() },
        timeout: API_CONFIG.TIMEOUT,
      });

      if (response.data.results) {
        setSearchResults(response.data.results);
        setShowSuggestions(true);
      }
    } catch (error) {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  // Buscar usuarios con debounce
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (username.trim().length > 0) {
      debounceTimerRef.current = setTimeout(() => {
        searchUsers(username);
      }, DEBOUNCE_DELAY);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
      setSearching(false);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [username, searchUsers]);

  // Handlers optimizados con useCallback
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
      setShowSuggestions(false);
    }
  }, [username, onSearch]);

  const handleSuggestionClick = useCallback((suggestedUsername: string) => {
    setUsername(suggestedUsername);
    setShowSuggestions(false);
    onSearch(suggestedUsername);
  }, [onSearch]);

  const handleClear = useCallback(() => {
    setUsername('');
    setShowSuggestions(false);
    setSearchResults([]);
  }, []);

  // Cerrar sugerencias al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 focus-within:border-orange-500 transition-colors">
          <div className="pl-4 pr-2">
            <Search className="text-gray-400" size={24} />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => username.trim().length > 0 && setShowSuggestions(true)}
            placeholder="Busca cualquier usuario de Instagram... (cristiano, therock, nike, tu_cuenta...)"
            className="flex-1 py-4 px-4 text-lg text-gray-900 placeholder:text-gray-400 outline-none"
            disabled={loading}
            autoComplete="off"
          />
          {username && !loading && !searching && (
            <button
              type="button"
              onClick={handleClear}
              className="px-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          )}
          {searching && (
            <div className="px-3">
              <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full"></div>
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="btn-primary m-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Buscando...' : 'Analizar'}
          </button>
        </div>

        {/* Dropdown de sugerencias con resultados reales */}
        {showSuggestions && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[500px] overflow-y-auto">
            <div className="p-2">
              <p className="text-xs text-gray-500 px-3 py-2 font-semibold uppercase tracking-wide">
                Resultados de búsqueda
              </p>
              {searchResults.map((result) => (
                <button
                  key={result.username}
                  type="button"
                  onClick={() => handleSuggestionClick(result.username)}
                  className="w-full flex items-center gap-4 px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left group"
                >
                  {/* Imagen de perfil */}
                  <div className="flex-shrink-0">
                    {result.profilePicUrl ? (
                      <img
                        src={result.profilePicUrl}
                        alt={result.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-orange-400 transition-colors"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                        {result.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Información del usuario */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors truncate">
                        @{result.username}
                      </span>
                      {result.isVerified && (
                        <svg
                          aria-label="Verificado"
                          className="flex-shrink-0"
                          width="14"
                          height="14"
                          viewBox="0 0 512 512"
                          fill="none"
                        >
                          <title>Verificado</title>
                          <defs>
                            <linearGradient id="verifiedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" style={{ stopColor: '#4B9CE5', stopOpacity: 1 }} />
                              <stop offset="100%" style={{ stopColor: '#1689FC', stopOpacity: 1 }} />
                            </linearGradient>
                          </defs>
                          <circle cx="256" cy="256" r="256" fill="url(#verifiedGradient)" />
                          <path
                            d="M369 174L223 320L143 240"
                            stroke="white"
                            strokeWidth="40"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{result.fullName}</p>
                    {result.followers > 0 && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        <span className="font-semibold text-gray-700">
                          {formatNumber(result.followers)}
                        </span>
                        {' '}seguidores
                      </p>
                    )}
                    {result.followers === 0 && (
                      <p className="text-xs text-gray-400 mt-0.5 italic">
                        Click para ver datos completos
                      </p>
                    )}
                  </div>

                  {/* Icono de flecha */}
                  <div className="flex-shrink-0">
                    <Search className="text-gray-400 group-hover:text-orange-500 transition-colors" size={18} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mensaje cuando no hay sugerencias PERO puede buscar igual */}
        {showSuggestions && !searching && searchResults.length === 0 && username.trim().length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-700 text-center font-semibold">
              No hay sugerencias para "{username}"
            </p>
            <p className="text-xs text-gray-500 text-center mt-2">
              💡 ¡Pero puedes analizar CUALQUIER usuario!
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              Presiona "Analizar" para buscar este perfil en Instagram
            </p>
          </div>
        )}
      </form>
      <p className="text-sm text-gray-600 mt-3 text-center">
        💡 <strong>Escribe cualquier usuario</strong> y presiona "Analizar" - Las sugerencias son solo ayuda para usuarios populares
      </p>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
