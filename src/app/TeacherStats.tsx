'use client';

import React from 'react';
import StatCard from './StatCard';
import { BookOpen, ClipboardList, Users, TrendingUp } from 'lucide-react';

export default function TeacherStats() {
  const stats = [
    {
      id: 'stat-materials',
      title: 'Total Materi',
      value: 14,
      subtitle: '3 diterbitkan minggu ini',
      icon: BookOpen,
      variant: 'green' as const,
      trend: { value: '+3', positive: true },
    },
    {
      id: 'stat-quizzes',
      title: 'Kuis Aktif',
      value: 5,
      subtitle: '2 deadline hari ini',
      icon: ClipboardList,
      variant: 'pink' as const,
      trend: { value: '+2', positive: true },
    },
    {
      id: 'stat-students',
      title: 'Total Murid',
      value: 28,
      subtitle: '26 aktif minggu ini',
      icon: Users,
      variant: 'gold' as const,
      trend: { value: '+1', positive: true },
    },
    {
      id: 'stat-avg',
      title: 'Rata-rata Nilai',
      value: '82.4',
      subtitle: 'Naik dari 78.1 minggu lalu',
      icon: TrendingUp,
      variant: 'teal' as const,
      trend: { value: '+4.3', positive: true },
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
