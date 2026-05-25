'use client';

import React, { useState } from 'react';
import { Clock, Calendar, ChevronRight, AlertCircle, CheckCircle, Lock } from 'lucide-react';
import QuizPlayer from './QuizPlayer';

type QuizStatus = 'available' | 'completed' | 'expired' | 'upcoming';

type StudentQuiz = {
  id: string;
  title: string;
  subject: string;
  grade: string;
  timer: number;
  deadline: string;
  status: QuizStatus;
  score?: number;
  totalQuestions: number;
  questions: Array<{
    id: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: 'A' | 'B' | 'C' | 'D';
  }>;
};

const STUDENT_QUIZZES: StudentQuiz[] = [
  {
    id: 'quiz-001',
    title: 'Kuis Rukun Islam & Iman',
    subject: 'Akidah',
    grade: 'Kelas 7',
    timer: 20,
    deadline: '2026-05-15',
    status: 'completed',
    score: 85,
    totalQuestions: 5,
    questions: [
      { id: 'q-001-1', question: 'Berapa jumlah Rukun Islam?', optionA: '4', optionB: '5', optionC: '6', optionD: '7', correctAnswer: 'B' },
      { id: 'q-001-2', question: 'Rukun Islam yang pertama adalah...', optionA: 'Sholat', optionB: 'Puasa', optionC: 'Syahadat', optionD: 'Zakat', correctAnswer: 'C' },
      { id: 'q-001-3', question: 'Berapa jumlah Rukun Iman?', optionA: '4', optionB: '5', optionC: '6', optionD: '7', correctAnswer: 'C' },
      { id: 'q-001-4', question: 'Rukun Iman yang ke-5 adalah iman kepada...', optionA: 'Malaikat', optionB: 'Rasul', optionC: 'Hari Kiamat', optionD: 'Qada dan Qadar', correctAnswer: 'C' },
      { id: 'q-001-5', question: 'Syahadat terdiri dari berapa kalimat?', optionA: '1', optionB: '2', optionC: '3', optionD: '4', correctAnswer: 'B' },
    ],
  },
  {
    id: 'quiz-002',
    title: 'Kuis Tata Cara Wudhu',
    subject: 'Fiqih',
    grade: 'Kelas 7',
    timer: 15,
    deadline: '2026-05-12',
    status: 'available',
    totalQuestions: 4,
    questions: [
      { id: 'q-002-1', question: 'Berapa fardhu wudhu?', optionA: '4', optionB: '5', optionC: '6', optionD: '7', correctAnswer: 'C' },
      { id: 'q-002-2', question: 'Anggota wudhu pertama yang dibasuh adalah...', optionA: 'Tangan', optionB: 'Kaki', optionC: 'Muka', optionD: 'Kepala', correctAnswer: 'C' },
      { id: 'q-002-3', question: 'Membasuh tangan dalam wudhu dilakukan hingga...', optionA: 'Pergelangan', optionB: 'Siku', optionC: 'Bahu', optionD: 'Jari saja', correctAnswer: 'B' },
      { id: 'q-002-4', question: 'Yang membatalkan wudhu adalah...', optionA: 'Tidur duduk', optionB: 'Makan', optionC: 'Buang angin', optionD: 'Minum', correctAnswer: 'C' },
    ],
  },
  {
    id: 'quiz-004',
    title: 'Kuis Asmaul Husna',
    subject: 'Akidah',
    grade: 'Kelas 7',
    timer: 25,
    deadline: '2026-05-20',
    status: 'available',
    totalQuestions: 5,
    questions: [
      { id: 'q-004-1', question: 'Ar-Rahman artinya...', optionA: 'Yang Maha Penyayang', optionB: 'Yang Maha Pengasih', optionC: 'Yang Maha Suci', optionD: 'Yang Maha Kuasa', correctAnswer: 'B' },
      { id: 'q-004-2', question: 'Al-Malik artinya...', optionA: 'Yang Maha Suci', optionB: 'Yang Maha Kuat', optionC: 'Yang Maha Merajai', optionD: 'Yang Maha Bijaksana', correctAnswer: 'C' },
      { id: 'q-004-3', question: 'Berapa jumlah Asmaul Husna?', optionA: '77', optionB: '88', optionC: '99', optionD: '100', correctAnswer: 'C' },
      { id: 'q-004-4', question: 'As-Salam artinya...', optionA: 'Yang Maha Damai', optionB: 'Yang Maha Memberi Keselamatan', optionC: 'Yang Maha Aman', optionD: 'Yang Maha Sejahtera', correctAnswer: 'B' },
      { id: 'q-004-5', question: 'Al-Aziz artinya...', optionA: 'Yang Maha Gagah', optionB: 'Yang Maha Mulia', optionC: 'Yang Maha Kaya', optionD: 'Yang Maha Besar', correctAnswer: 'A' },
    ],
  },
  {
    id: 'quiz-003',
    title: 'Kuis Sejarah Nabi Muhammad SAW',
    subject: 'Sejarah Islam',
    grade: 'Kelas 8',
    timer: 30,
    deadline: '2026-05-10',
    status: 'expired',
    totalQuestions: 6,
    questions: [],
  },
  {
    id: 'quiz-005',
    title: 'Kuis Akhlak Terpuji',
    subject: 'Akhlak',
    grade: 'Kelas 8',
    timer: 20,
    deadline: '2026-05-25',
    status: 'upcoming',
    totalQuestions: 5,
    questions: [],
  },
];

export default function StudentQuizzesTab() {
  const [quizzes, setQuizzes] = useState<StudentQuiz[]>(STUDENT_QUIZZES);
  const [activeQuiz, setActiveQuiz] = useState<StudentQuiz | null>(null);

  const handleQuizComplete = (quizId: string, score: number) => {
    setQuizzes(prev => prev.map(q => q.id === quizId ? { ...q, status: 'completed', score } : q));
    setActiveQuiz(null);
  };

  const statusConfig: Record<QuizStatus, { label: string; badgeClass: string; icon: React.ElementType; actionLabel: string; canStart: boolean }> = {
    available: { label: '✅ Tersedia', badgeClass: 'badge-green', icon: ChevronRight, actionLabel: 'Mulai Kuis', canStart: true },
    completed: { label: '🏆 Selesai', badgeClass: 'badge-teal', icon: CheckCircle, actionLabel: 'Lihat Nilai', canStart: false },
    expired: { label: '❌ Berakhir', badgeClass: 'badge-red', icon: Lock, actionLabel: 'Kadaluarsa', canStart: false },
    upcoming: { label: '⏳ Belum Buka', badgeClass: 'badge-gold', icon: Clock, actionLabel: 'Belum Tersedia', canStart: false },
  };

  const available = quizzes.filter(q => q.status === 'available');
  const completed = quizzes.filter(q => q.status === 'completed');
  const others = quizzes.filter(q => q.status === 'expired' || q.status === 'upcoming');

  if (activeQuiz) {
    return (
      <QuizPlayer
        quiz={activeQuiz}
        onComplete={(score) => handleQuizComplete(activeQuiz.id, score)}
        onExit={() => setActiveQuiz(null)}
      />
    );
  }

  const renderQuizCard = (quiz: StudentQuiz) => {
    const config = statusConfig[quiz.status];
    const StatusIcon = config.icon;
    return (
      <div key={quiz.id} className={`card-soft p-4 slide-up ${quiz.status === 'available' ? 'border-pastel-green border-2' : ''}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-3">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="badge-teal text-xs">{quiz.subject}</span>
              <span className={`${config.badgeClass} text-xs`}>{config.label}</span>
            </div>
            <h4 className="font-bold text-foreground text-sm mb-1">{quiz.title}</h4>
            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><Clock size={11} /> {quiz.timer} menit</span>
              <span className="flex items-center gap-1"><Calendar size={11} /> Deadline: {quiz.deadline}</span>
              <span>📝 {quiz.totalQuestions} soal</span>
            </div>
          </div>
          {quiz.status === 'completed' && quiz.score !== undefined && (
            <div className="text-center flex-shrink-0">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg ${quiz.score >= 80 ? 'bg-pastel-green text-primary-foreground' : quiz.score >= 60 ? 'bg-gold bg-opacity-30 text-accent-foreground' : 'bg-soft-pink text-secondary-foreground'}`}>
                {quiz.score}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">nilai</p>
            </div>
          )}
        </div>

        {quiz.status === 'available' && (
          <div className="bg-soft-pink bg-opacity-20 rounded-xl p-2.5 mb-3 flex items-center gap-2">
            <AlertCircle size={14} className="text-secondary-foreground flex-shrink-0" />
            <p className="text-xs font-medium text-secondary-foreground">Deadline: {quiz.deadline} — Segera kerjakan!</p>
          </div>
        )}

        <button
          onClick={() => config.canStart ? setActiveQuiz(quiz) : null}
          disabled={!config.canStart}
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all duration-150 active:scale-95 ${
            config.canStart
              ? 'btn-primary' :'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          <StatusIcon size={14} />
          {config.actionLabel}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {available.length > 0 && (
        <div>
          <h3 className="font-bold text-foreground text-base mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pastel-green inline-block" />
            Kuis Tersedia ({available.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {available.map(renderQuizCard)}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h3 className="font-bold text-foreground text-base mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal inline-block" />
            Kuis Selesai ({completed.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {completed.map(renderQuizCard)}
          </div>
        </div>
      )}

      {others.length > 0 && (
        <div>
          <h3 className="font-bold text-foreground text-base mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-muted-foreground inline-block" />
            Kuis Lainnya ({others.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {others.map(renderQuizCard)}
          </div>
        </div>
      )}
    </div>
  );
}