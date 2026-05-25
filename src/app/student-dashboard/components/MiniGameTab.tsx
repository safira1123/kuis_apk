'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Star, RotateCcw, Trophy, Zap, Clock } from 'lucide-react';

type GameMode = 'idle' | 'playing' | 'finished';

type WordCard = {
  id: string;
  arabic: string;
  indonesian: string;
  category: string;
};

const WORD_BANK: WordCard[] = [
  { id: 'w-001', arabic: 'الله', indonesian: 'Allah', category: 'Tauhid' },
  { id: 'w-002', arabic: 'صَلَاة', indonesian: 'Sholat', category: 'Ibadah' },
  { id: 'w-003', arabic: 'زَكَاة', indonesian: 'Zakat', category: 'Ibadah' },
  { id: 'w-004', arabic: 'صَوْم', indonesian: 'Puasa', category: 'Ibadah' },
  { id: 'w-005', arabic: 'حَج', indonesian: 'Haji', category: 'Ibadah' },
  { id: 'w-006', arabic: 'قُرْآن', indonesian: 'Al-Quran', category: 'Kitab' },
  { id: 'w-007', arabic: 'مَسْجِد', indonesian: 'Masjid', category: 'Tempat' },
  { id: 'w-008', arabic: 'مَلَك', indonesian: 'Malaikat', category: 'Iman' },
  { id: 'w-009', arabic: 'نَبِي', indonesian: 'Nabi', category: 'Iman' },
  { id: 'w-010', arabic: 'جَنَّة', indonesian: 'Surga', category: 'Akhirat' },
  { id: 'w-011', arabic: 'نَار', indonesian: 'Neraka', category: 'Akhirat' },
  { id: 'w-012', arabic: 'تَوْبَة', indonesian: 'Taubat', category: 'Akhlak' },
  { id: 'w-013', arabic: 'شُكْر', indonesian: 'Syukur', category: 'Akhlak' },
  { id: 'w-014', arabic: 'صَبْر', indonesian: 'Sabar', category: 'Akhlak' },
  { id: 'w-015', arabic: 'أَمَانَة', indonesian: 'Amanah', category: 'Akhlak' },
  { id: 'w-016', arabic: 'عِلْم', indonesian: 'Ilmu', category: 'Pendidikan' },
  { id: 'w-017', arabic: 'دُعَاء', indonesian: 'Doa', category: 'Ibadah' },
  { id: 'w-018', arabic: 'رَحْمَة', indonesian: 'Rahmat', category: 'Sifat Allah' },
  { id: 'w-019', arabic: 'إِيمَان', indonesian: 'Iman', category: 'Tauhid' },
  { id: 'w-020', arabic: 'إِسْلَام', indonesian: 'Islam', category: 'Tauhid' },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getWrongOptions(correct: WordCard, all: WordCard[]): WordCard[] {
  const others = all.filter(w => w.id !== correct.id);
  const shuffled = shuffleArray(others);
  return shuffled.slice(0, 3);
}

type GameQuestion = {
  id: string;
  word: WordCard;
  options: string[];
  correctAnswer: string;
};

export default function MiniGameTab() {
  const [mode, setMode] = useState<GameMode>('idle');
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showStarBurst, setShowStarBurst] = useState(false);
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(7);
  const [highScore, setHighScore] = useState(9);

  const generateQuestions = useCallback(() => {
    const shuffled = shuffleArray(WORD_BANK).slice(0, 10);
    return shuffled.map(word => {
      const wrong = getWrongOptions(word, WORD_BANK);
      const opts = shuffleArray([word.indonesian, ...wrong.map(w => w.indonesian)]);
      return {
        id: `gq-${word.id}`,
        word,
        options: opts,
        correctAnswer: word.indonesian,
      };
    });
  }, []);

  const startGame = () => {
    const qs = generateQuestions();
    setQuestions(qs);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setTimeLeft(10);
    setMode('playing');
  };

  useEffect(() => {
    if (mode !== 'playing' || feedback !== null) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  });

  const handleTimeOut = () => {
    setFeedback('wrong');
    setStreak(0);
    setTimeout(() => moveNext(), 1200);
  };

  const handleSelect = (answer: string) => {
    if (feedback !== null) return;
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentIndex].correctAnswer;

    if (isCorrect) {
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setFeedback('correct');
      setShowStarBurst(true);
      setTimeout(() => setShowStarBurst(false), 800);
      setTimeout(() => moveNext(), 1000);
    } else {
      setStreak(0);
      setFeedback('wrong');
      setTimeout(() => moveNext(), 1200);
    }
  };

  const moveNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      const finalScore = score + (feedback === 'correct' ? 0 : 0);
      if (finalScore > highScore) setHighScore(finalScore);
      setTotalGamesPlayed(prev => prev + 1);
      setMode('finished');
    } else {
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
      setFeedback(null);
      setTimeLeft(10);
    }
  };

  const currentQ = questions[currentIndex];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-foreground text-lg">🎮 Mini Game: Tebak Kata Islami</h3>
          <p className="text-muted-foreground text-sm">Tebak arti kata Arab — asah hafalan sambil bermain!</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="badge-gold flex items-center gap-1">
            <Trophy size={11} /> Rekor: {highScore}/10
          </div>
          <div className="badge-teal">
            🎮 {totalGamesPlayed} game
          </div>
        </div>
      </div>

      {mode === 'idle' && (
        <div className="text-center py-10 fade-in">
          <div className="float-animation text-7xl mb-5">🌙</div>
          <h4 className="text-xl font-bold text-foreground mb-2">Siap Bermain?</h4>
          <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
            Tebak arti kata Arab Islami! Jawab 10 soal dengan timer 10 detik per soal. Dapatkan streak untuk bonus bintang! ⭐
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
            <div className="card-soft p-3 text-center">
              <p className="text-2xl font-bold text-foreground">10</p>
              <p className="text-xs text-muted-foreground">Soal</p>
            </div>
            <div className="card-soft p-3 text-center">
              <p className="text-2xl font-bold text-foreground">10s</p>
              <p className="text-xs text-muted-foreground">Per Soal</p>
            </div>
            <div className="card-soft p-3 text-center">
              <p className="text-2xl font-bold text-gold-dark">{highScore}</p>
              <p className="text-xs text-muted-foreground">Rekormu</p>
            </div>
          </div>

          <div className="bg-muted rounded-2xl p-4 max-w-sm mx-auto mb-6">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Contoh Kata</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-foreground" style={{ fontFamily: 'serif' }}>صَبْر</span>
              <span className="text-sm font-bold text-muted-foreground">= ?</span>
              <span className="badge-green">Sabar</span>
            </div>
          </div>

          <button onClick={startGame} className="btn-primary px-8 text-base flex items-center gap-2 mx-auto">
            <Zap size={18} /> Mulai Game!
          </button>
        </div>
      )}

      {mode === 'playing' && currentQ && (
        <div className="max-w-md mx-auto fade-in">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="badge-green flex items-center gap-1">
                <Star size={12} /> {score}/{questions.length}
              </div>
              {streak >= 2 && (
                <div className="badge-gold flex items-center gap-1 sparkle-animation">
                  🔥 Streak {streak}x
                </div>
              )}
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm ${timeLeft <= 3 ? 'bg-red-100 text-red-600 quiz-timer-ring' : timeLeft <= 6 ? 'bg-gold bg-opacity-20 text-gold-dark' : 'bg-pastel-green-light text-primary-foreground'}`}>
              <Clock size={14} />
              {timeLeft}s
            </div>
          </div>

          {/* Timer Bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-5">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${timeLeft <= 3 ? 'bg-red-400' : timeLeft <= 6 ? 'bg-gold' : 'bg-pastel-green'}`}
              style={{ width: `${(timeLeft / 10) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="card-soft p-6 text-center mb-5 relative overflow-hidden">
            {showStarBurst && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={`burst-${i}`}
                    className="absolute text-2xl star-pop"
                    style={{
                      transform: `rotate(${i * 60}deg) translateY(-40px)`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            )}
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              {currentQ.word.category} · Soal {currentIndex + 1}/{questions.length}
            </p>
            <p className="text-5xl font-bold text-foreground mb-2" style={{ fontFamily: 'serif', direction: 'rtl' }}>
              {currentQ.word.arabic}
            </p>
            <p className="text-muted-foreground text-sm font-medium">Apa artinya kata di atas? 🤔</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === currentQ.correctAnswer;
              const showResult = feedback !== null;

              let btnClass = 'border-2 border-border bg-white hover:border-pastel-green hover:bg-pastel-green-light text-foreground';
              if (showResult) {
                if (isCorrect) btnClass = 'border-2 border-pastel-green bg-pastel-green text-primary-foreground';
                else if (isSelected) btnClass = 'border-2 border-red-300 bg-red-100 text-red-700';
                else btnClass = 'border-2 border-border bg-muted text-muted-foreground opacity-50';
              } else if (isSelected) {
                btnClass = 'border-2 border-pastel-green-dark bg-pastel-green-light text-primary-foreground';
              }

              return (
                <button
                  key={`game-opt-${i}`}
                  onClick={() => handleSelect(opt)}
                  disabled={feedback !== null}
                  className={`p-4 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-95 ${btnClass}`}
                >
                  {opt}
                  {showResult && isCorrect && ' ✓'}
                  {showResult && isSelected && !isCorrect && ' ✗'}
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className={`mt-4 rounded-2xl p-3 text-center ${feedback === 'correct' ? 'bg-pastel-green-light' : 'bg-red-50'}`}>
              <p className={`font-bold text-sm ${feedback === 'correct' ? 'text-primary-foreground' : 'text-red-600'}`}>
                {feedback === 'correct'
                  ? streak >= 3 ? `🔥 ${streak}x Streak! Masya Allah!` : '✨ Benar! Alhamdulillah!'
                  : `😔 Kurang tepat. Jawaban: ${currentQ.correctAnswer}`}
              </p>
            </div>
          )}
        </div>
      )}

      {mode === 'finished' && (
        <div className="max-w-md mx-auto text-center fade-in">
          <div className="card-soft p-8">
            <div className="bounce-in text-6xl mb-4">
              {score >= 9 ? '🌟' : score >= 7 ? '🎉' : score >= 5 ? '👍' : '📚'}
            </div>
            <h4 className="text-2xl font-bold text-foreground mb-1">Game Selesai!</h4>
            <p className="text-muted-foreground text-sm mb-5">
              {score >= 9 ? 'Luar biasa! Kamu hafal banyak kata Arab!' : score >= 7 ? 'Bagus sekali! Terus berlatih!' : score >= 5 ? 'Lumayan! Masih bisa lebih baik!' : 'Terus belajar ya, jangan menyerah!'}
            </p>

            <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto mb-5 ${score >= 8 ? 'bg-pastel-green text-primary-foreground' : score >= 5 ? 'bg-gold bg-opacity-30 text-accent-foreground' : 'bg-soft-pink text-secondary-foreground'}`}>
              <span className="text-3xl font-black">{score}</span>
              <span className="text-xs font-bold opacity-75">/10</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-muted rounded-2xl p-3">
                <p className="text-xl font-bold text-foreground">{score}</p>
                <p className="text-xs text-muted-foreground">Benar</p>
              </div>
              <div className="bg-muted rounded-2xl p-3">
                <p className="text-xl font-bold text-foreground">{bestStreak}</p>
                <p className="text-xs text-muted-foreground">Best Streak</p>
              </div>
              <div className="bg-muted rounded-2xl p-3">
                <p className="text-xl font-bold text-gold-dark">{highScore}</p>
                <p className="text-xs text-muted-foreground">Rekor</p>
              </div>
            </div>

            {score > highScore - 1 && score === highScore && (
              <div className="badge-gold inline-flex items-center gap-1 mb-4 px-4 py-2">
                <Trophy size={14} /> Rekor Baru! Alhamdulillah! 🎊
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={startGame} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <RotateCcw size={16} /> Main Lagi
              </button>
              <button onClick={() => setMode('idle')} className="btn-ghost flex-1">Kembali</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}