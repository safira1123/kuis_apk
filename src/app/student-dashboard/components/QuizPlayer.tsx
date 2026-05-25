'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Clock, X, ChevronRight, ChevronLeft, CheckCircle, XCircle } from 'lucide-react';
import CelebrationPopup from '../../CelebrationPopup';

type Question = {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
};

type QuizPlayerProps = {
  quiz: {
    id: string;
    title: string;
    subject: string;
    timer: number;
    totalQuestions: number;
    questions: Question[];
  };
  onComplete: (score: number) => void;
  onExit: () => void;
};

type AnswerFeedback = 'correct' | 'wrong' | null;

export default function QuizPlayer({ quiz, onComplete, onExit }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [feedback, setFeedback] = useState<AnswerFeedback>(null);
  const [timeLeft, setTimeLeft] = useState(quiz.timer * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const calculateScore = useCallback((ans: Record<string, 'A' | 'B' | 'C' | 'D'>) => {
    const correct = quiz.questions.filter(q => ans[q.id] === q.correctAnswer).length;
    return Math.round((correct / quiz.questions.length) * 100);
  }, [quiz.questions]);

  const finishQuiz = useCallback((ans: Record<string, 'A' | 'B' | 'C' | 'D'>) => {
    const score = calculateScore(ans);
    setFinalScore(score);
    setIsFinished(true);
    if (score >= 70) {
      setShowCelebration(true);
    }
  }, [calculateScore]);

  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          finishQuiz(answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished, answers, finishQuiz]);

  const currentQuestion = quiz.questions[currentIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 60;

  const handleSelectAnswer = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (feedback !== null) return;
    setSelectedAnswer(opt);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: opt }));

    const isCorrect = opt === currentQuestion.correctAnswer;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1500);
    }
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(answers[quiz.questions[currentIndex + 1]?.id] || null);
      setFeedback(null);
    } else {
      finishQuiz(answers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      const prevQ = quiz.questions[currentIndex - 1];
      setSelectedAnswer(answers[prevQ.id] || null);
      setFeedback(answers[prevQ.id] ? (answers[prevQ.id] === prevQ.correctAnswer ? 'correct' : 'wrong') : null);
    }
  };

  const optionLabels = ['A', 'B', 'C', 'D'] as const;
  const optionValues: Record<string, string> = {
    A: currentQuestion?.optionA,
    B: currentQuestion?.optionB,
    C: currentQuestion?.optionC,
    D: currentQuestion?.optionD,
  };

  if (isFinished) {
    const correctCount = quiz.questions.filter(q => answers[q.id] === q.correctAnswer).length;
    return (
      <div className="fade-in">
        {showCelebration && finalScore >= 70 && (
          <CelebrationPopup
            name="Kamu"
            message={finalScore >= 90 ? '🌟 Luar Biasa!' : finalScore >= 70 ? '🎉 Bagus Sekali!' : '💪 Tetap Semangat!'}
            subMessage={`Kamu mendapat nilai ${finalScore} — ${finalScore >= 70 ? 'Alhamdulillah, kamu lulus!' : 'Terus belajar ya!'}`}
            onClose={() => { setShowCelebration(false); onComplete(finalScore); }}
          />
        )}
        <div className="max-w-lg mx-auto">
          <div className="card-soft p-8 text-center">
            <div className="text-6xl mb-4">
              {finalScore >= 90 ? '🌟' : finalScore >= 70 ? '🎉' : '📚'}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Kuis Selesai!</h3>
            <p className="text-muted-foreground mb-6">{quiz.title}</p>

            <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-black ${finalScore >= 80 ? 'bg-pastel-green text-primary-foreground' : finalScore >= 60 ? 'bg-gold bg-opacity-30 text-accent-foreground' : 'bg-soft-pink text-secondary-foreground'}`}>
              {finalScore}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-muted rounded-2xl p-3 text-center">
                <p className="text-2xl font-bold text-primary-foreground">{correctCount}</p>
                <p className="text-xs text-muted-foreground font-medium">Benar</p>
              </div>
              <div className="bg-muted rounded-2xl p-3 text-center">
                <p className="text-2xl font-bold text-red-500">{quiz.questions.length - correctCount}</p>
                <p className="text-xs text-muted-foreground font-medium">Salah</p>
              </div>
              <div className="bg-muted rounded-2xl p-3 text-center">
                <p className="text-2xl font-bold text-foreground">{quiz.questions.length}</p>
                <p className="text-xs text-muted-foreground font-medium">Total</p>
              </div>
            </div>

            <div className="space-y-2 mb-6 text-left">
              {quiz.questions.map((q, i) => {
                const userAns = answers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className={`flex items-start gap-2 p-2.5 rounded-xl text-xs ${isCorrect ? 'bg-pastel-green-light' : 'bg-red-50'}`}>
                    {isCorrect ? <CheckCircle size={14} className="text-primary-foreground flex-shrink-0 mt-0.5" /> : <XCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />}
                    <div className="min-w-0">
                      <p className="font-bold text-foreground truncate">{i + 1}. {q.question}</p>
                      <p className={isCorrect ? 'text-primary-foreground' : 'text-red-600'}>
                        Jawabanmu: {userAns || 'Tidak dijawab'} {!isCorrect && `— Benar: ${q.correctAnswer}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button onClick={() => onComplete(finalScore)} className="btn-primary w-full">
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Quiz Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-foreground text-lg">{quiz.title}</h3>
          <p className="text-muted-foreground text-sm">{quiz.subject} · {quiz.questions.length} soal</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${isUrgent ? 'bg-red-100 text-red-600 quiz-timer-ring' : 'bg-pastel-green-light text-primary-foreground'}`}>
            <Clock size={16} />
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-2 rounded-xl bg-muted text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Soal {currentIndex + 1} dari {quiz.questions.length}</span>
          <span>{Object.keys(answers).length} dijawab</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-pastel-green rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-1 mt-2">
          {quiz.questions.map((q, i) => (
            <div
              key={`progress-${q.id}`}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                i === currentIndex ? 'bg-pastel-green-dark' :
                answers[q.id] ? (answers[q.id] === q.correctAnswer ? 'bg-pastel-green' : 'bg-soft-pink-dark') :
                'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="card-soft p-6 mb-5">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-8 h-8 rounded-full bg-pastel-green flex items-center justify-center font-black text-primary-foreground text-sm flex-shrink-0">
            {currentIndex + 1}
          </div>
          <p className="font-bold text-foreground text-base leading-relaxed">{currentQuestion?.question}</p>
        </div>

        <div className="space-y-3">
          {optionLabels.map((opt) => {
            const isSelected = selectedAnswer === opt;
            const isCorrectOpt = opt === currentQuestion?.correctAnswer;
            const showResult = feedback !== null;

            let optClass = 'border-2 border-border bg-muted hover:border-pastel-green hover:bg-pastel-green-light';
            if (showResult) {
              if (isCorrectOpt) optClass = 'border-2 border-pastel-green bg-pastel-green-light';
              else if (isSelected && !isCorrectOpt) optClass = 'border-2 border-red-300 bg-red-50';
              else optClass = 'border-2 border-border bg-muted opacity-60';
            } else if (isSelected) {
              optClass = 'border-2 border-pastel-green-dark bg-pastel-green-light';
            }

            return (
              <button
                key={`opt-${opt}`}
                onClick={() => handleSelectAnswer(opt)}
                disabled={feedback !== null}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all duration-150 active:scale-98 ${optClass}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  showResult && isCorrectOpt ? 'bg-pastel-green text-primary-foreground' :
                  showResult && isSelected && !isCorrectOpt ? 'bg-red-400 text-white': isSelected ?'bg-pastel-green-dark text-white': 'bg-white text-foreground'
                }`}>
                  {showResult && isCorrectOpt ? '✓' : showResult && isSelected && !isCorrectOpt ? '✗' : opt}
                </div>
                <span className="font-medium text-sm text-foreground">{optionValues[opt]}</span>
                {showResult && isCorrectOpt && (
                  <CheckCircle size={16} className="text-primary-foreground ml-auto" />
                )}
                {showResult && isSelected && !isCorrectOpt && (
                  <XCircle size={16} className="text-red-500 ml-auto" />
                )}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div className={`mt-4 rounded-2xl p-3 flex items-center gap-2 ${feedback === 'correct' ? 'bg-pastel-green-light' : 'bg-red-50'}`}>
            {feedback === 'correct' ? (
              <><CheckCircle size={16} className="text-primary-foreground" /><p className="text-sm font-bold text-primary-foreground">Alhamdulillah, jawaban benar! 🌟</p></>
            ) : (
              <><XCircle size={16} className="text-red-500" /><p className="text-sm font-bold text-red-600">Jawaban kurang tepat. Jawaban benar: <span className="underline">{currentQuestion?.correctAnswer}</span></p></>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="btn-ghost flex items-center gap-2 disabled:opacity-40"
        >
          <ChevronLeft size={16} /> Sebelumnya
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {currentIndex === quiz.questions.length - 1 ? 'Selesai & Kirim' : 'Selanjutnya'}
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Exit Confirm */}
      {showExitConfirm && (
        <div className="popup-overlay fade-in">
          <div className="bounce-in max-w-sm w-full mx-4">
            <div className="card-soft p-6 text-center">
              <p className="text-4xl mb-3">⚠️</p>
              <h3 className="font-bold text-foreground text-lg mb-2">Keluar dari Kuis?</h3>
              <p className="text-muted-foreground text-sm mb-5">Progres kuis akan hilang dan nilaimu tidak tersimpan.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowExitConfirm(false)} className="btn-primary flex-1">Lanjutkan Kuis</button>
                <button onClick={onExit} className="btn-ghost flex-1 text-red-500 border-red-200 hover:bg-red-50">Keluar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Correct Answer Celebration */}
      {showCelebration && feedback === 'correct' && (
        <div className="fixed top-4 right-4 bounce-in z-50">
          <div className="card-soft px-4 py-3 flex items-center gap-2 shadow-soft-green">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-bold text-primary-foreground text-sm">Jawaban Benar!</p>
              <p className="text-xs text-muted-foreground">Masya Allah, bagus! 🌿</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}