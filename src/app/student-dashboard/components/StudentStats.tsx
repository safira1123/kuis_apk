'use client';

import React from 'react';
import StatCard from '../../StatCard';
import { Trophy, CheckCircle, BookOpen, Star } from 'lucide-react';

export default function StudentStats() {
  const stats = [
    {
      id: 'stat-rank',
      title: 'Peringkat Saya',
      value: '#3',
      subtitle: 'dari 28 murid',
      icon: Trophy,
      variant: 'gold' as const,
      trend: { value: '+2 naik', positive: true },
    },
    {
      id: 'stat-completed',
      title: 'Kuis Selesai',
      value: '5/7',
      subtitle: '2 kuis belum dikerjakan',
      icon: CheckCircle,
      variant: 'green' as const,
      trend: { value: '+1 minggu ini', positive: true },
    },
    {
      id: 'stat-materials',
      title: 'Materi Dibaca',
      value: '6/8',
      subtitle: '2 materi baru tersedia',
      icon: BookOpen,
      variant: 'pink' as const,
    },
    {
      id: 'stat-score',
      title: 'Total Poin',
      value: '420',
      subtitle: 'Rata-rata: 84 per kuis',
      icon: Star,
      variant: 'teal' as const,
      trend: { value: '+85 minggu ini', positive: true },
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
}