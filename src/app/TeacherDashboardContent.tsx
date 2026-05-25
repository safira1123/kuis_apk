'use client';

import React, { useState, useEffect } from 'react';
import AppLayout from './AppLayout';
import AppSidebar from './AppSidebar';
import TeacherStats from './TeacherStats';
import TabsNav from './TabsNav';
import MaterialsTab from './teacher-dashboard/components/MaterialsTab';
import QuizzesTab from './teacher-dashboard/components/QuizzesTab';
import StudentsTab from './teacher-dashboard/components/StudentsTab';
import LeaderboardTab from './teacher-dashboard/components/LeaderboardTab';

export type TabId = 'materials' | 'quizzes' | 'students' | 'leaderboard';

export default function TeacherDashboardContent() {
  const [activeTab, setActiveTab] = useState<TabId>('materials');

  const tabs = [
    { id: 'materials' as TabId, label: '📚 Materi' },
    { id: 'quizzes' as TabId, label: '📝 Kuis' },
    { id: 'students' as TabId, label: '👩‍🎓 Murid' },
    { id: 'leaderboard' as TabId, label: '🏆 Leaderboard' },
  ];

  return (
    <AppLayout
      sidebar={<AppSidebar role="teacher" userName="Guru Solecha" />}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">☀️</span>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Guru</h1>
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          Assalamu&apos;alaikum, Bu Solecha! Semangat mengajar hari ini 🌿
        </p>
      </div>

      {/* Stats */}
      <TeacherStats />

      {/* Tabs */}
      <div className="mt-6 card-soft p-6">
<TabsNav tabs={tabs} activeTab={activeTab} onTabChange={(id) => setActiveTab(id as TabId)} />        <div className="mt-5">
          {activeTab === 'materials' && <MaterialsTab />}
          {activeTab === 'quizzes' && <QuizzesTab />}
          {activeTab === 'students' && <StudentsTab />}
          {activeTab === 'leaderboard' && <LeaderboardTab />}
        </div>
      </div>
    </AppLayout>
  );
}
