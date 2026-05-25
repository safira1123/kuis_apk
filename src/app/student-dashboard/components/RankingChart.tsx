'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type RankingChartProps = {
  data: Array<{ quiz: string; score: number; classAvg: number }>;
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="card-soft p-3 text-sm shadow-soft">
        <p className="font-bold text-foreground mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={`rtt-${i}`} style={{ color: p.color }} className="font-medium">
            {p.name === 'score' ? 'Nilai Saya' : 'Avg Kelas'}: <span className="font-bold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function RankingChart({ data }: RankingChartProps) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="quiz" tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }} />
        <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={(v) => v === 'score' ? 'Nilai Saya' : 'Avg Kelas'} wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-sans)' }} />
        <Line type="monotone" dataKey="score" stroke="var(--primary-foreground)" strokeWidth={2.5} dot={{ fill: 'var(--primary)', r: 4 }} activeDot={{ r: 6 }} name="score" />
        <Line type="monotone" dataKey="classAvg" stroke="var(--secondary-foreground)" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: 'var(--secondary)', r: 3 }} name="classAvg" />
      </LineChart>
    </ResponsiveContainer>
  );
}