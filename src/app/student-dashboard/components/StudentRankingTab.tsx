'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import dynamic from 'next/dynamic';

const RankingChart = dynamic(() => import('../../RankingChart'), { ssr: false });

const RANKING_DATA = [
  { id: 'stu-003', rank: 1, prevRank: 1, name: 'Maryam Sari', grade: 'Kelas 7B', totalScore: 450, quizCompleted: 5, avgScore: 90, isMe: false },
  { id: 'stu-011', rank: 2, prevRank: 3, name: 'Ruqayyah Dewi', grade: 'Kelas 7A', totalScore: 445, quizCompleted: 5, avgScore: 89, isMe: false },
  { id: 'stu-001', rank: 3, prevRank: 2, name: 'Fatimah Az-Zahra', grade: 'Kelas 7A', totalScore: 420, quizCompleted: 5, avgScore: 84, isMe: true },
  { id: 'stu-009', rank: 4, prevRank: 4, name: 'Aisyah Putri', grade: 'Kelas 7B', totalScore: 430, quizCompleted: 5, avgScore: 86, isMe: false },
  { id: 'stu-005', rank: 5, prevRank: 6, name: 'Khadijah Nur', grade: 'Kelas 7B', totalScore: 410, quizCompleted: 5, avgScore: 82, isMe: false },
  { id: 'stu-006', rank: 6, prevRank: 5, name: 'Ibrahim Malik', grade: 'Kelas 8A', totalScore: 395, quizCompleted: 5, avgScore: 79, isMe: false },
  { id: 'stu-002', rank: 7, prevRank: 7, name: 'Umar Al-Hakim', grade: 'Kelas 7A', totalScore: 385, quizCompleted: 5, avgScore: 77, isMe: false },
  { id: 'stu-008', rank: 8, prevRank: 9, name: 'Yusuf Ramadhan', grade: 'Kelas 8B', totalScore: 375, quizCompleted: 5, avgScore: 75, isMe: false },
  { id: 'stu-004', rank: 9, prevRank: 8, name: 'Abdullah Rasyid', grade: 'Kelas 7A', totalScore: 360, quizCompleted: 4, avgScore: 90, isMe: false },
  { id: 'stu-007', rank: 10, prevRank: 10, name: 'Zainab Hasan', grade: 'Kelas 8A', totalScore: 340, quizCompleted: 4, avgScore: 85, isMe: false },
  { id: 'stu-012', rank: 11, prevRank: 12, name: 'Khalid Bin Walid', grade: 'Kelas 8B', totalScore: 315, quizCompleted: 4, avgScore: 79, isMe: false },
  { id: 'stu-010', rank: 12, prevRank: 11, name: 'Hasan Al-Bashri', grade: 'Kelas 8A', totalScore: 290, quizCompleted: 3, avgScore: 97, isMe: false },
];

const SCORE_HISTORY = [
  { quiz: 'Kuis 1', score: 80, classAvg: 76 },
  { quiz: 'Kuis 2', score: 90, classAvg: 78 },
  { quiz: 'Kuis 3', score: 75, classAvg: 82 },
  { quiz: 'Kuis 4', score: 85, classAvg: 79 },
  { quiz: 'Kuis 5', score: 88, classAvg: 83 },
];

const me = RANKING_DATA.find(s => s.isMe)!;

export default function StudentRankingTab() {
  const getRankTrend = (curr: number, prev: number) => {
    if (curr < prev) return { icon: TrendingUp, label: `+${prev - curr}`, color: 'text-primary-foreground' };
    if (curr > prev) return { icon: TrendingDown, label: `-${curr - prev}`, color: 'text-red-500' };
    return { icon: Minus, label: '=', color: 'text-muted-foreground' };
  };

  return (
    <div>
      {/* My Rank Card */}
      <div className="card-gold p-5 mb-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white bg-opacity-30 flex items-center justify-center font-black text-2xl text-accent-foreground flex-shrink-0">
          #{me.rank}
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-accent-foreground opacity-75 uppercase tracking-wider mb-0.5">Peringkat Saya</p>
          <h3 className="font-bold text-accent-foreground text-xl">{me.name}</h3>
          <div className="flex items-center gap-3 text-sm text-accent-foreground opacity-80 mt-1 flex-wrap">
            <span>⭐ {me.totalScore} poin total</span>
            <span>📊 Avg: {me.avgScore}</span>
            <span>✅ {me.quizCompleted}/5 kuis</span>
            <span className="flex items-center gap-1">
              <TrendingDown size={13} /> Turun 1 peringkat minggu ini
            </span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-4xl">🥉</p>
          <p className="text-xs text-accent-foreground font-bold mt-1">Terus semangat!</p>
        </div>
      </div>

      {/* Score History Chart */}
      <div className="card-soft p-4 mb-5">
        <p className="text-sm font-bold text-foreground mb-1">📈 Riwayat Nilai Saya vs Rata-rata Kelas</p>
        <p className="text-xs text-muted-foreground mb-3">5 kuis terakhir</p>
        <RankingChart data={SCORE_HISTORY} />
      </div>

      {/* Full Ranking Table */}
      <div>
        <h3 className="font-bold text-foreground text-base mb-3">🏆 Peringkat Lengkap Kelas</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider w-16">Rank</th>
                <th className="text-left py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Nama</th>
                <th className="text-left py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Kelas</th>
                <th className="text-center py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Kuis</th>
                <th className="text-center py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Avg</th>
                <th className="text-right py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Poin</th>
                <th className="text-center py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Tren</th>
              </tr>
            </thead>
            <tbody>
              {RANKING_DATA.map((student, i) => {
                const trend = getRankTrend(student.rank, student.prevRank);
                const TrendIcon = trend.icon;
                const medal = student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : student.rank === 3 ? '🥉' : null;
                return (
                  <tr
                    key={student.id}
                    className={`border-b border-border transition-colors ${student.isMe ? 'bg-gold bg-opacity-10 border-gold border-opacity-30' : 'hover:bg-muted'} ${i % 2 === 0 ? '' : 'bg-muted bg-opacity-20'}`}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        {medal ? <span className="text-lg">{medal}</span> : <span className="text-sm font-bold text-muted-foreground">#{student.rank}</span>}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${student.isMe ? 'bg-gold text-accent-foreground' : i < 3 ? 'bg-pastel-green text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <span className={`font-bold text-sm ${student.isMe ? 'text-accent-foreground' : 'text-foreground'}`}>
                            {student.name}
                          </span>
                          {student.isMe && <span className="badge-gold text-xs ml-2">Saya</span>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 hidden md:table-cell"><span className="badge-teal">{student.grade}</span></td>
                    <td className="py-3 px-3 text-center text-foreground font-medium">{student.quizCompleted}/5</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`font-bold tabular-nums ${student.avgScore >= 85 ? 'text-primary-foreground' : student.avgScore >= 70 ? 'text-gold-dark' : 'text-red-500'}`}>
                        {student.avgScore}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-foreground tabular-nums">{student.totalScore}</td>
                    <td className="py-3 px-3 text-center hidden sm:table-cell">
                      <div className={`flex items-center justify-center gap-0.5 text-xs font-bold ${trend.color}`}>
                        <TrendIcon size={12} />
                        {trend.label}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}