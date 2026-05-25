'use client';

import React from 'react';

import dynamic from 'next/dynamic';

const LeaderboardChart = dynamic(() => import('../../LeaderboardChart'), { ssr: false });

const LEADERBOARD_DATA = [
  { id: 'stu-003', rank: 1, name: 'Maryam Sari', grade: 'Kelas 7B', totalScore: 450, quizCompleted: 5, avgScore: 90, badge: '🥇' },
  { id: 'stu-011', rank: 2, name: 'Ruqayyah Dewi', grade: 'Kelas 7A', totalScore: 445, quizCompleted: 5, avgScore: 89, badge: '🥈' },
  { id: 'stu-001', rank: 3, name: 'Fatimah Az-Zahra', grade: 'Kelas 7A', totalScore: 420, quizCompleted: 5, avgScore: 84, badge: '🥉' },
  { id: 'stu-009', rank: 4, name: 'Aisyah Putri', grade: 'Kelas 7B', totalScore: 430, quizCompleted: 5, avgScore: 86, badge: '⭐' },
  { id: 'stu-005', rank: 5, name: 'Khadijah Nur', grade: 'Kelas 7B', totalScore: 410, quizCompleted: 5, avgScore: 82, badge: '⭐' },
  { id: 'stu-006', rank: 6, name: 'Ibrahim Malik', grade: 'Kelas 8A', totalScore: 395, quizCompleted: 5, avgScore: 79, badge: '⭐' },
  { id: 'stu-002', rank: 7, name: 'Umar Al-Hakim', grade: 'Kelas 7A', totalScore: 385, quizCompleted: 5, avgScore: 77, badge: '' },
  { id: 'stu-008', rank: 8, name: 'Yusuf Ramadhan', grade: 'Kelas 8B', totalScore: 375, quizCompleted: 5, avgScore: 75, badge: '' },
  { id: 'stu-004', rank: 9, name: 'Abdullah Rasyid', grade: 'Kelas 7A', totalScore: 360, quizCompleted: 4, avgScore: 90, badge: '' },
  { id: 'stu-007', rank: 10, name: 'Zainab Hasan', grade: 'Kelas 8A', totalScore: 340, quizCompleted: 4, avgScore: 85, badge: '' },
  { id: 'stu-012', rank: 11, name: 'Khalid Bin Walid', grade: 'Kelas 8B', totalScore: 315, quizCompleted: 4, avgScore: 79, badge: '' },
  { id: 'stu-010', rank: 12, name: 'Hasan Al-Bashri', grade: 'Kelas 8A', totalScore: 290, quizCompleted: 3, avgScore: 97, badge: '' },
];

export default function LeaderboardTab() {
  const top3 = LEADERBOARD_DATA?.slice(0, 3);
  const rest = LEADERBOARD_DATA?.slice(3);

  return (
    <div>
      <div className="mb-5">
        <h3 className="font-bold text-foreground text-lg mb-1">🏆 Leaderboard Kelas</h3>
        <p className="text-muted-foreground text-sm">Peringkat berdasarkan total nilai kumulatif semua kuis</p>
      </div>
      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[top3?.[1], top3?.[0], top3?.[2]]?.map((student, podiumIdx) => {
          const heights = ['h-24', 'h-32', 'h-20'];
          const podiumColors = ['card-pink', 'card-gold', 'card-teal'];
          return (
            <div key={student?.id} className={`${podiumColors?.[podiumIdx]} p-4 text-center flex flex-col items-center justify-end`} style={{ minHeight: '160px' }}>
              <div className="text-3xl mb-1">{student?.badge}</div>
              <div className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center font-bold text-sm mb-1">
                {student?.name?.charAt(0)}
              </div>
              <p className="font-bold text-sm truncate w-full text-center">{student?.name?.split(' ')?.[0]}</p>
              <p className="text-xs opacity-80">{student?.totalScore} poin</p>
              <div className={`${heights?.[podiumIdx]} w-full bg-white bg-opacity-20 rounded-t-xl mt-2 flex items-center justify-center`}>
                <span className="text-2xl font-black">#{student?.rank}</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Chart */}
      <div className="card-soft p-4 mb-5">
        <p className="text-sm font-bold text-foreground mb-3">📊 Grafik Nilai Top 8 Murid</p>
        <LeaderboardChart data={LEADERBOARD_DATA?.slice(0, 8)} />
      </div>
      {/* Full Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider w-12">Rank</th>
              <th className="text-left py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Nama Murid</th>
              <th className="text-left py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Kelas</th>
              <th className="text-center py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Kuis Selesai</th>
              <th className="text-center py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Rata-rata</th>
              <th className="text-right py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Poin</th>
            </tr>
          </thead>
          <tbody>
            {LEADERBOARD_DATA?.map((student, i) => (
              <tr key={student?.id} className={`border-b border-border hover:bg-muted transition-colors ${i < 3 ? 'bg-gold bg-opacity-5' : i % 2 === 0 ? '' : 'bg-muted bg-opacity-20'}`}>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1">
                    {student?.rank <= 3 ? (
                      <span className="text-lg">{student?.badge}</span>
                    ) : (
                      <span className="text-sm font-bold text-muted-foreground">#{student?.rank}</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${i < 3 ? 'bg-gold text-accent-foreground' : 'bg-pastel-green text-primary-foreground'}`}>
                      {student?.name?.charAt(0)}
                    </div>
                    <span className="font-bold text-foreground">{student?.name}</span>
                    {student?.badge && <span>{student?.badge}</span>}
                  </div>
                </td>
                <td className="py-3 px-3"><span className="badge-teal">{student?.grade}</span></td>
                <td className="py-3 px-3 text-center font-medium text-foreground">{student?.quizCompleted}/5</td>
                <td className="py-3 px-3 text-center">
                  <span className={`font-bold tabular-nums ${student?.avgScore >= 85 ? 'text-primary-foreground' : student?.avgScore >= 70 ? 'text-gold-dark' : 'text-red-500'}`}>
                    {student?.avgScore}
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-bold text-foreground tabular-nums">{student?.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}