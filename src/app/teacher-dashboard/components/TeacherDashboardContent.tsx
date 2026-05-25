'use client';

import React from 'react';
import AppLayout from '../../AppLayout';
import AppSidebar from '../../AppSidebar';
import TeacherStats from '../../TeacherStats';
import TabsNav from '../../TabsNav';
import MaterialsTab from './MaterialsTab';
import QuizzesTab from './QuizzesTab';
import StudentsTab from './StudentsTab';
import LeaderboardTab from './LeaderboardTab';

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
      sidebar={<AppSidebar role="teacher" userName="Ustadzah Aisyah" />}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">☀️</span>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Guru</h1>
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          Assalamu&apos;alaikum, Ustadzah Solecha! Semangat mengajar hari ini 🌿
        </p>
      </div>

      {/* Stats */}
      <TeacherStats />

      {/* Tabs */}
      <div className="mt-6 card-soft p-6">
        <TabsNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-5">
          {activeTab === 'materials' && <MaterialsTab />}
          {activeTab === 'quizzes' && <QuizzesTab />}
          {activeTab === 'students' && <StudentsTab />}
          {activeTab === 'leaderboard' && <LeaderboardTab />}
        </div>
      </div>
    </AppLayout>
  );
}