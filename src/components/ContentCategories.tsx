import React from 'react';
import type { ContentCategory } from '@/types/instagram';

interface ContentCategoriesProps {
  categories: ContentCategory[];
}

export const ContentCategories: React.FC<ContentCategoriesProps> = ({ categories }) => {
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Categorías de Contenido</h2>
      <p className="text-sm text-gray-600 mb-6">
        EL CONTENIDO ESTÁ RELACIONADO CON LAS SIGUIENTES CATEGORÍAS:
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="text-3xl mb-2">{category.icon}</div>
            <div className="text-sm text-center text-gray-700 font-medium">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
