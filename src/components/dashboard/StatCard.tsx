import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: LucideIcon;
  currency?: boolean;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon,
  currency = false 
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border w-full h-full">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
        </div>
        {change && (
          <div
            className={cn(
              "text-xs font-medium flex items-center whitespace-nowrap",
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            )}
          >
            {changeType === 'positive' ? '↗' : '↘'} {change}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs sm:text-sm text-slate-600 mb-1 truncate">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-slate-800">
          {currency && '₹'}
          {value}
        </p>
      </div>
    </div>
  );
}
