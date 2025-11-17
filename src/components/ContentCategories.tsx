import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { ContentCategory } from '@/types/instagram';

interface ContentCategoriesProps {
  categories: ContentCategory[];
}

export const ContentCategories: React.FC<ContentCategoriesProps> = ({ categories }) => {
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6">Categorías de Contenido</h2>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categories}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} ${percentage}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="percentage"
            >
              {categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: category.color }}
            />
            <div>
              <div className="text-sm font-medium text-gray-900">{category.name}</div>
              <div className="text-xs text-gray-600">{category.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
