'use client';

import React, { useState } from 'react';
import AppLayout from './AppLayout';
import AppSidebar from './AppSidebar';
import StudentStats from './StudentStats';
import TabsNav from './TabsNav';
import StudentMaterialsTab from './student-dashboard/components/StudentMaterialsTab';
import StudentQuizzesTab from './student-dashboard/components/StudentQuizzesTab';
import StudentRankingTab from './student-dashboard/components/StudentRankingTab';
import MiniGameTab from './student-dashboard/components/MiniGameTab';

type TabId = 'materials' | 'quizzes' | 'ranking' | 'game';

export default function StudentDashboardContent() {
  const [activeTab, setActiveTab] = useState<TabId>('quizzes');

  const tabs = [
    { id: 'quizzes' as TabId, label: '📝 Kuis Saya' },
    { id: 'materials' as TabId, label: '📚 Materi' },
    { id: 'ranking' as TabId, label: '🏆 Ranking' },
    { id: 'game' as TabId, label: '🎮 Mini Game' },
  ];

  return (
    <AppLayout sidebar={<AppSidebar role="student" userName="Fatimah Az-Zahra" />}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🌙</span>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Murid</h1>
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          Assalamu&apos;alaikum, Fatimah! Semangat belajar hari ini 📚✨
        </p>
      </div>

      {/* Stats */}
      <StudentStats />

      {/* Tabs */}
      <div className="mt-6 card-soft p-6">
        <TabsNav tabs={tabs} activeTab={activeTab} onTabChange={(id) => setActiveTab(id as TabId)} />
        <div className="mt-5">
          {activeTab === 'quizzes' && <StudentQuizzesTab />}
          {activeTab === 'materials' && <StudentMaterialsTab />}
          {activeTab === 'ranking' && <StudentRankingTab />}
          {activeTab === 'game' && <MiniGameTab />}
        </div>
      </div>
    </AppLayout>
  );
}
