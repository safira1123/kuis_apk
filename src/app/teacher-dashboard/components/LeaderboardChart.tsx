'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type LeaderboardChartProps = {
  data: Array<{ name: string; totalScore: number; avgScore: number; rank: number }>;
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="card-soft p-3 text-sm shadow-soft">
        <p className="font-bold text-foreground mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={`tooltip-${i}`} className="text-muted-foreground">
            <span className="font-bold text-primary-foreground">{p.value}</span> {p.name === 'totalScore' ? 'total poin' : 'avg nilai'}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function LeaderboardChart({ data }: LeaderboardChartProps) {
  const chartData = data.map(d => ({
    name: d.name.split(' ')[0],
    totalScore: d.totalScore,
    avgScore: d.avgScore,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }} />
        <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="totalScore" fill="var(--primary)" radius={[6, 6, 0, 0]} name="totalScore" />
        <Bar dataKey="avgScore" fill="var(--secondary)" radius={[6, 6, 0, 0]} name="avgScore" />
      </BarChart>
    </ResponsiveContainer>
  );
}