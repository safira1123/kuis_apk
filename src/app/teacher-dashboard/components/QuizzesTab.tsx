'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Clock, Calendar, ChevronDown, ChevronUp, X, Save, PlusCircle, MinusCircle } from 'lucide-react';
import ConfirmModal from '../../ConfirmModal';

type QuizQuestion = {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
};

type Quiz = {
  id: string;
  title: string;
  subject: string;
  grade: string;
  timer: number;
  deadline: string;
  status: 'active' | 'expired' | 'draft';
  questions: QuizQuestion[];
  submissionCount: number;
  avgScore: number;
};

type QuizForm = {
  title: string;
  subject: string;
  grade: string;
  timer: number;
  deadline: string;
  status: 'active' | 'draft';
  questions: QuizQuestion[];
};

const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-001',
    title: 'Kuis Rukun Islam & Iman',
    subject: 'Akidah',
    grade: 'Kelas 7',
    timer: 20,
    deadline: '2026-05-15',
    status: 'active',
    submissionCount: 18,
    avgScore: 85,
    questions: [
      { question: 'Berapa jumlah Rukun Islam?', optionA: '4', optionB: '5', optionC: '6', optionD: '7', correctAnswer: 'B' },
      { question: 'Rukun Islam yang pertama adalah...', optionA: 'Sholat', optionB: 'Puasa', optionC: 'Syahadat', optionD: 'Zakat', correctAnswer: 'C' },
    ],
  },
  {
    id: 'quiz-002',
    title: 'Kuis Tata Cara Wudhu',
    subject: 'Fiqih',
    grade: 'Kelas 7',
    timer: 15,
    deadline: '2026-05-12',
    status: 'active',
    submissionCount: 22,
    avgScore: 79,
    questions: [
      { question: 'Berapa fardhu wudhu?', optionA: '4', optionB: '5', optionC: '6', optionD: '7', correctAnswer: 'C' },
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
    submissionCount: 25,
    avgScore: 88,
    questions: [],
  },
  {
    id: 'quiz-004',
    title: 'Kuis Asmaul Husna',
    subject: 'Akidah',
    grade: 'Kelas 7',
    timer: 25,
    deadline: '2026-05-20',
    status: 'active',
    submissionCount: 10,
    avgScore: 72,
    questions: [],
  },
  {
    id: 'quiz-005',
    title: 'Kuis Akhlak Terpuji',
    subject: 'Akhlak',
    grade: 'Kelas 8',
    timer: 20,
    deadline: '2026-05-25',
    status: 'draft',
    submissionCount: 0,
    avgScore: 0,
    questions: [],
  },
];

export default function QuizzesTab() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(INITIAL_QUIZZES);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<QuizForm>({
    defaultValues: {
      grade: 'Kelas 7',
      status: 'active',
      timer: 20,
      questions: [{ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A' }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'questions' });

  const openCreate = () => {
    reset({
      title: '', subject: '', grade: 'Kelas 7', timer: 20, deadline: '', status: 'active',
      questions: [{ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A' }],
    });
    setEditingId(null);
    setShowForm(true);
  };

  // Backend integration point: POST/PUT /api/quizzes
  const onSubmit = (data: QuizForm) => {
    if (editingId) {
      setQuizzes(prev => prev.map(q => q.id === editingId ? { ...q, ...data } : q));
    } else {
      const newQuiz: Quiz = {
        id: `quiz-${Date.now()}`,
        ...data,
        submissionCount: 0,
        avgScore: 0,
      };
      setQuizzes(prev => [newQuiz, ...prev]);
    }
    setShowForm(false);
    reset();
  };

  const confirmDelete = () => {
    if (deleteId) {
      setQuizzes(prev => prev.filter(q => q.id !== deleteId));
      setDeleteId(null);
    }
  };

  const statusColor: Record<string, string> = {
    active: 'badge-green',
    expired: 'badge-red',
    draft: 'badge-gold',
  };

  const statusLabel: Record<string, string> = {
    active: '✅ Aktif',
    expired: '❌ Berakhir',
    draft: '⏳ Draft',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-foreground text-lg">Manajemen Kuis</h3>
          <p className="text-muted-foreground text-sm">{quizzes.length} kuis dibuat · {quizzes.filter(q => q.status === 'active').length} aktif</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-4">
          <Plus size={16} />
          Buat Kuis
        </button>
      </div>

      <div className="space-y-3">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="card-soft overflow-hidden">
            <div
              className="p-4 flex items-center gap-3 cursor-pointer hover:bg-muted transition-colors"
              onClick={() => setExpandedId(expandedId === quiz.id ? null : quiz.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="font-bold text-foreground text-sm">{quiz.title}</h4>
                  <span className={statusColor[quiz.status]}>{statusLabel[quiz.status]}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                  <span>📚 {quiz.subject}</span>
                  <span>🎓 {quiz.grade}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {quiz.timer} menit</span>
                  <span className="flex items-center gap-1"><Calendar size={11} /> Deadline: {quiz.deadline}</span>
                  <span>📝 {quiz.questions.length} soal</span>
                  <span>✅ {quiz.submissionCount} dikerjakan</span>
                  {quiz.avgScore > 0 && <span>⭐ Avg: {quiz.avgScore}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setDeleteId(quiz.id); }}
                  className="p-1.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
                {expandedId === quiz.id ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
              </div>
            </div>

            {expandedId === quiz.id && quiz.questions.length > 0 && (
              <div className="border-t border-border p-4 bg-muted bg-opacity-50 slide-up">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Daftar Soal</p>
                <div className="space-y-3">
                  {quiz.questions.map((q, qi) => (
                    <div key={`${quiz.id}-q-${qi}`} className="bg-white rounded-2xl p-3">
                      <p className="text-sm font-bold text-foreground mb-2">{qi + 1}. {q.question}</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {(['A', 'B', 'C', 'D'] as const).map(opt => (
                          <div
                            key={`${quiz.id}-q-${qi}-opt-${opt}`}
                            className={`text-xs rounded-xl px-2.5 py-1.5 font-medium ${q.correctAnswer === opt ? 'bg-pastel-green text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                          >
                            {opt}. {q[`option${opt}` as keyof QuizQuestion]}
                            {q.correctAnswer === opt && ' ✓'}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Quiz Modal */}
      {showForm && (
        <div className="popup-overlay fade-in">
          <div className="bounce-in w-full max-w-2xl mx-4 my-4 max-h-screen overflow-y-auto scrollbar-soft">
            <div className="card-soft p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-foreground text-lg">📝 Buat Kuis Baru</h3>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5">Judul Kuis</label>
                    <input {...register('title', { required: 'Judul wajib diisi' })} className="input-soft" placeholder="Kuis Rukun Islam..." />
                    {errors.title && <p className="text-red-500 text-xs mt-1">⚠️ {errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5">Mata Pelajaran</label>
                    <input {...register('subject', { required: 'Mata pelajaran wajib' })} className="input-soft" placeholder="Akidah, Fiqih..." />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">⚠️ {errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5">Kelas</label>
                    <select {...register('grade')} className="input-soft">
                      <option>Kelas 7</option>
                      <option>Kelas 8</option>
                      <option>Kelas 9</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5">Timer (menit)</label>
                    <input type="number" {...register('timer', { required: true, min: 1, max: 120 })} className="input-soft" min={1} max={120} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5">Deadline Pengerjaan</label>
                    <input type="date" {...register('deadline', { required: 'Deadline wajib diisi' })} className="input-soft" />
                    {errors.deadline && <p className="text-red-500 text-xs mt-1">⚠️ {errors.deadline.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5">Status</label>
                    <select {...register('status')} className="input-soft">
                      <option value="active">Aktif</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                {/* Questions */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-foreground">Soal-soal ({fields.length} soal)</label>
                    <button
                      type="button"
                      onClick={() => append({ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A' })}
                      className="flex items-center gap-1 text-xs text-primary-foreground font-bold hover:opacity-80"
                    >
                      <PlusCircle size={14} /> Tambah Soal
                    </button>
                  </div>

                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <div key={field.id} className="bg-muted rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-foreground">Soal {index + 1}</span>
                          {fields.length > 1 && (
                            <button type="button" onClick={() => remove(index)} className="text-red-400 hover:text-red-600">
                              <MinusCircle size={16} />
                            </button>
                          )}
                        </div>
                        <div className="space-y-2">
                          <input
                            {...register(`questions.${index}.question`, { required: true })}
                            className="input-soft"
                            placeholder="Tulis pertanyaan..."
                          />
                          <div className="grid grid-cols-2 gap-2">
                            {(['A', 'B', 'C', 'D'] as const).map(opt => (
                              <input
                                key={`field-${field.id}-opt-${opt}`}
                                {...register(`questions.${index}.option${opt}` as `questions.${number}.optionA`, { required: true })}
                                className="input-soft text-sm"
                                placeholder={`Pilihan ${opt}`}
                              />
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="text-xs font-bold text-foreground">Jawaban Benar:</label>
                            <select {...register(`questions.${index}.correctAnswer`)} className="input-soft text-sm w-auto">
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="btn-ghost flex-1">Batal</button>
                  <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <Save size={16} />
                    Simpan Kuis
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <ConfirmModal
          title="Hapus Kuis"
          message="Kuis ini akan dihapus beserta semua soal dan data pengerjaan. Yakin?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
          confirmLabel="Hapus Kuis"
          danger
        />
      )}
    </div>
  );
}