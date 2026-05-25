import React from 'react';
import { LucideIcon } from 'lucide-react';
import Icon from '../../app/AppIcon';


type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant: 'green' | 'pink' | 'gold' | 'teal';
  trend?: { value: string; positive: boolean };
};

const variantStyles: Record<string, string> = {
  green: 'card-green text-primary-foreground',
  pink: 'card-pink text-secondary-foreground',
  gold: 'card-gold text-accent-foreground',
  teal: 'card-teal text-white',
};

const iconBgStyles: Record<string, string> = {
  green: 'bg-white bg-opacity-25',
  pink: 'bg-white bg-opacity-25',
  gold: 'bg-white bg-opacity-25',
  teal: 'bg-white bg-opacity-25',
};

export default function StatCard({ title, value, subtitle, icon: Icon, variant, trend }: StatCardProps) {
  return (
    <div className={`${variantStyles[variant]} p-5 slide-up`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`${iconBgStyles[variant]} rounded-2xl p-2.5`}>
          <Icon size={22} />
        </div>
        {trend && (
          <span className={`text-xs font-bold rounded-full px-2 py-0.5 ${trend.positive ? 'bg-white bg-opacity-25' : 'bg-black bg-opacity-10'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold tabular-nums mb-0.5">{value}</p>
      <p className="font-bold text-sm opacity-90">{title}</p>
      {subtitle && <p className="text-xs opacity-70 mt-0.5">{subtitle}</p>}
    </div>
  );
}