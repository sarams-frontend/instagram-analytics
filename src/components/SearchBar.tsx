import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { formatNumber } from '@/config';

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

// Sugerencias estáticas de usuarios populares (NO requiere llamadas a API)
// Base de datos ampliada con más de 100 usuarios para mejores coincidencias
const POPULAR_SUGGESTIONS: SearchResult[] = [
  // Deportes - Fútbol
  { username: 'cristiano', fullName: 'Cristiano Ronaldo', profilePicUrl: '', followers: 617500000, isVerified: true },
  { username: 'leomessi', fullName: 'Leo Messi', profilePicUrl: '', followers: 504000000, isVerified: true },
  { username: 'neymarjr', fullName: 'Neymar Jr', profilePicUrl: '', followers: 224000000, isVerified: true },
  { username: 'k.mbappe', fullName: 'Kylian Mbappé', profilePicUrl: '', followers: 110000000, isVerified: true },
  { username: 'lewy_official', fullName: 'Robert Lewandowski', profilePicUrl: '', followers: 35000000, isVerified: true },
  { username: 'paulpogba', fullName: 'Paul Pogba', profilePicUrl: '', followers: 59000000, isVerified: true },
  { username: 'davidbeckham', fullName: 'David Beckham', profilePicUrl: '', followers: 88000000, isVerified: true },
  { username: 'fcbarcelona', fullName: 'FC Barcelona', profilePicUrl: '', followers: 127000000, isVerified: true },
  { username: 'realmadrid', fullName: 'Real Madrid', profilePicUrl: '', followers: 149000000, isVerified: true },
  { username: 'championsleague', fullName: 'UEFA Champions League', profilePicUrl: '', followers: 113000000, isVerified: true },

  // Deportes - Otros
  { username: 'therock', fullName: 'Dwayne Johnson', profilePicUrl: '', followers: 397000000, isVerified: true },
  { username: 'lebronjames', fullName: 'LeBron James', profilePicUrl: '', followers: 159000000, isVerified: true },
  { username: 'stephencurry30', fullName: 'Stephen Curry', profilePicUrl: '', followers: 56000000, isVerified: true },
  { username: 'kingjames', fullName: 'LeBron James', profilePicUrl: '', followers: 159000000, isVerified: true },
  { username: 'virat.kohli', fullName: 'Virat Kohli', profilePicUrl: '', followers: 271000000, isVerified: true },

  // Música - Pop/Internacional
  { username: 'selenagomez', fullName: 'Selena Gomez', profilePicUrl: '', followers: 429000000, isVerified: true },
  { username: 'arianagrande', fullName: 'Ariana Grande', profilePicUrl: '', followers: 380000000, isVerified: true },
  { username: 'taylorswift', fullName: 'Taylor Swift', profilePicUrl: '', followers: 283000000, isVerified: true },
  { username: 'justinbieber', fullName: 'Justin Bieber', profilePicUrl: '', followers: 294000000, isVerified: true },
  { username: 'beyonce', fullName: 'Beyoncé', profilePicUrl: '', followers: 316000000, isVerified: true },
  { username: 'billieeilish', fullName: 'Billie Eilish', profilePicUrl: '', followers: 119000000, isVerified: true },
  { username: 'ddlovato', fullName: 'Demi Lovato', profilePicUrl: '', followers: 157000000, isVerified: true },
  { username: 'ladygaga', fullName: 'Lady Gaga', profilePicUrl: '', followers: 56000000, isVerified: true },
  { username: 'katyperry', fullName: 'Katy Perry', profilePicUrl: '', followers: 206000000, isVerified: true },
  { username: 'shakira', fullName: 'Shakira', profilePicUrl: '', followers: 91000000, isVerified: true },
  { username: 'rihanna', fullName: 'Rihanna', profilePicUrl: '', followers: 152000000, isVerified: true },

  // Música - Hip Hop/Rap
  { username: 'nickiminaj', fullName: 'Nicki Minaj', profilePicUrl: '', followers: 228000000, isVerified: true },
  { username: 'drake', fullName: 'Drake', profilePicUrl: '', followers: 146000000, isVerified: true },
  { username: 'cardib', fullName: 'Cardi B', profilePicUrl: '', followers: 165000000, isVerified: true },
  { username: 'badgalriri', fullName: 'Rihanna', profilePicUrl: '', followers: 152000000, isVerified: true },
  { username: 'snoopdogg', fullName: 'Snoop Dogg', profilePicUrl: '', followers: 87000000, isVerified: true },
  { username: 'eminem', fullName: 'Eminem', profilePicUrl: '', followers: 43000000, isVerified: true },

  // Música - Latina
  { username: 'jlo', fullName: 'Jennifer Lopez', profilePicUrl: '', followers: 251000000, isVerified: true },
  { username: 'maluma', fullName: 'Maluma', profilePicUrl: '', followers: 64000000, isVerified: true },
  { username: 'jbalvin', fullName: 'J Balvin', profilePicUrl: '', followers: 58000000, isVerified: true },
  { username: 'badgalriri', fullName: 'Bad Bunny', profilePicUrl: '', followers: 47000000, isVerified: true },

  // Actores/Actrices
  { username: 'chrisevans', fullName: 'Chris Evans', profilePicUrl: '', followers: 18000000, isVerified: true },
  { username: 'chrishemsworth', fullName: 'Chris Hemsworth', profilePicUrl: '', followers: 58000000, isVerified: true },
  { username: 'prattprattpratt', fullName: 'Chris Pratt', profilePicUrl: '', followers: 46000000, isVerified: true },
  { username: 'vindiesel', fullName: 'Vin Diesel', profilePicUrl: '', followers: 102000000, isVerified: true },
  { username: 'zendaya', fullName: 'Zendaya', profilePicUrl: '', followers: 184000000, isVerified: true },
  { username: 'tomholland2013', fullName: 'Tom Holland', profilePicUrl: '', followers: 67000000, isVerified: true },
  { username: 'robertdowneyjr', fullName: 'Robert Downey Jr.', profilePicUrl: '', followers: 57000000, isVerified: true },
  { username: 'gal_gadot', fullName: 'Gal Gadot', profilePicUrl: '', followers: 109000000, isVerified: true },
  { username: 'jasonmomoa', fullName: 'Jason Momoa', profilePicUrl: '', followers: 17000000, isVerified: true },
  { username: 'willsmith', fullName: 'Will Smith', profilePicUrl: '', followers: 73000000, isVerified: true },
  { username: 'kevinhart4real', fullName: 'Kevin Hart', profilePicUrl: '', followers: 179000000, isVerified: true },

  // Actrices
  { username: 'sydney_sweeney', fullName: 'Sydney Sweeney', profilePicUrl: '', followers: 22000000, isVerified: true },
  { username: 'margotrobbie', fullName: 'Margot Robbie', profilePicUrl: '', followers: 29000000, isVerified: true },
  { username: 'scarlettjohansson', fullName: 'Scarlett Johansson', profilePicUrl: '', followers: 8000000, isVerified: true },
  { username: 'milliebobbybrown', fullName: 'Millie Bobby Brown', profilePicUrl: '', followers: 63000000, isVerified: true },
  { username: 'emmawatson', fullName: 'Emma Watson', profilePicUrl: '', followers: 74000000, isVerified: true },
  { username: 'jenniferaniston', fullName: 'Jennifer Aniston', profilePicUrl: '', followers: 45000000, isVerified: true },

  // Kardashian/Jenner Family
  { username: 'kyliejenner', fullName: 'Kylie Jenner', profilePicUrl: '', followers: 399000000, isVerified: true },
  { username: 'kimkardashian', fullName: 'Kim Kardashian', profilePicUrl: '', followers: 364000000, isVerified: true },
  { username: 'khloekardashian', fullName: 'Khloé Kardashian', profilePicUrl: '', followers: 311000000, isVerified: true },
  { username: 'kendalljenner', fullName: 'Kendall Jenner', profilePicUrl: '', followers: 293000000, isVerified: true },
  { username: 'kourtneykardash', fullName: 'Kourtney Kardashian', profilePicUrl: '', followers: 224000000, isVerified: true },
  { username: 'krisjenner', fullName: 'Kris Jenner', profilePicUrl: '', followers: 53000000, isVerified: true },

  // Modelos
  { username: 'gigihadid', fullName: 'Gigi Hadid', profilePicUrl: '', followers: 79000000, isVerified: true },
  { username: 'bellahadid', fullName: 'Bella Hadid', profilePicUrl: '', followers: 61000000, isVerified: true },
  { username: 'caradelevingne', fullName: 'Cara Delevingne', profilePicUrl: '', followers: 45000000, isVerified: true },
  { username: 'hoskelsa', fullName: 'Elsa Hosk', profilePicUrl: '', followers: 11000000, isVerified: true },

  // Influencers/Creadores
  { username: 'charlidamelio', fullName: 'Charli D\'Amelio', profilePicUrl: '', followers: 155000000, isVerified: true },
  { username: 'addisonre', fullName: 'Addison Rae', profilePicUrl: '', followers: 88000000, isVerified: true },
  { username: 'khabylame', fullName: 'Khaby Lame', profilePicUrl: '', followers: 80000000, isVerified: true },

  // Marcas
  { username: 'nike', fullName: 'Nike', profilePicUrl: '', followers: 306000000, isVerified: true },
  { username: 'adidas', fullName: 'Adidas', profilePicUrl: '', followers: 40000000, isVerified: true },
  { username: 'puma', fullName: 'PUMA', profilePicUrl: '', followers: 26000000, isVerified: true },
  { username: 'chanelofficial', fullName: 'CHANEL', profilePicUrl: '', followers: 58000000, isVerified: true },
  { username: 'gucci', fullName: 'Gucci', profilePicUrl: '', followers: 52000000, isVerified: true },
  { username: 'louisvuitton', fullName: 'Louis Vuitton', profilePicUrl: '', followers: 57000000, isVerified: true },
  { username: 'dior', fullName: 'Dior', profilePicUrl: '', followers: 50000000, isVerified: true },
  { username: 'versace', fullName: 'Versace', profilePicUrl: '', followers: 30000000, isVerified: true },

  // Entretenimiento/Medios
  { username: 'natgeo', fullName: 'National Geographic', profilePicUrl: '', followers: 283000000, isVerified: true },
  { username: 'nasa', fullName: 'NASA', profilePicUrl: '', followers: 97000000, isVerified: true },
  { username: 'marvel', fullName: 'Marvel Entertainment', profilePicUrl: '', followers: 37000000, isVerified: true },
  { username: 'netflix', fullName: 'Netflix', profilePicUrl: '', followers: 34000000, isVerified: true },
  { username: 'spotify', fullName: 'Spotify', profilePicUrl: '', followers: 7000000, isVerified: true },

  // Youtubers/Gamers
  { username: 'mrbeast', fullName: 'MrBeast', profilePicUrl: '', followers: 54000000, isVerified: true },
  { username: 'pewdiepie', fullName: 'PewDiePie', profilePicUrl: '', followers: 27000000, isVerified: true },
  { username: 'ninja', fullName: 'Ninja', profilePicUrl: '', followers: 19000000, isVerified: true },
];

export const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(({ onSearch, loading = false }, ref) => {
  const [username, setUsername] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchResult[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Expose focus method to parent component
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }), []);

  // Filtrar sugerencias estáticas basadas en el texto ingresado (NO llama a API)
  useEffect(() => {
    if (username.trim().length > 0) {
      const searchTerm = username.toLowerCase().trim();
      const matches = POPULAR_SUGGESTIONS.filter(
        (suggestion) =>
          suggestion.username.toLowerCase().includes(searchTerm) ||
          suggestion.fullName.toLowerCase().includes(searchTerm)
      );

      // DEBUG: Ver qué está pasando
      console.log('🔍 SearchBar Debug:', {
        searchTerm,
        totalSuggestions: POPULAR_SUGGESTIONS.length,
        matchesFound: matches.length,
        firstMatches: matches.slice(0, 8).map(m => m.username)
      });

      setFilteredSuggestions(matches.slice(0, 8)); // Mostrar máximo 8 sugerencias
      setShowSuggestions(matches.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [username]);

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
    setFilteredSuggestions([]);
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
          {username && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="px-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          )}
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="btn-primary m-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Buscando...' : 'Analizar'}
          </button>
        </div>

        {/* Dropdown de sugerencias estáticas (sin llamadas a API) */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[500px] overflow-y-auto">
            <div className="p-2">
              <p className="text-xs text-gray-500 px-3 py-2 font-semibold uppercase tracking-wide">
                Sugerencias populares
              </p>
              {filteredSuggestions.map((result) => (
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
        {!showSuggestions && username.trim().length > 0 && (
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
        💡 <strong>Escribe cualquier usuario</strong> y presiona "Analizar" - Las sugerencias filtran por texto coincidente
      </p>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
