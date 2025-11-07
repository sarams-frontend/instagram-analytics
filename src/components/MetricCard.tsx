import React from 'react';
import { HelpCircle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  tooltip?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  tooltip,
  trend,
}) => {
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-gray-600 font-medium">{title}</span>
        {tooltip && (
          <div className="group relative">
            <HelpCircle size={16} className="text-gray-400 cursor-help" />
            <div className="hidden group-hover:block absolute right-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
              {tooltip}
            </div>
          </div>
        )}
      </div>

      <div className="text-2xl font-bold text-gray-900 mb-1">
        {value}
      </div>

      {subtitle && (
        <div className="text-sm text-gray-500">{subtitle}</div>
      )}
    </div>
  );
};
