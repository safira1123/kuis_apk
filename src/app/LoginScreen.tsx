'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, BookOpen, Star, Moon, Sparkles, GraduationCap, Users } from 'lucide-react';
import CelebrationPopup from './CelebrationPopup';
import IslamicOrnament from './IslamicOrnament';

type LoginForm = {
  username: string;
  password: string;
};

type Role = 'teacher' | 'student';

const MOCK_CREDENTIALS = {
  teacher: [
    { username: 'siti.solecha', password: 'guru1234', name: 'siti solecha', role: 'teacher' as Role },
  ],
  student: [
    { username: 'fatimah.azzahra', password: 'murid1234', name: 'Fatimah Az-Zahra', role: 'student' as Role },
    { username: 'umar.hakim', password: 'murid5678', name: 'Umar Al-Hakim', role: 'student' as Role },
    { username: 'maryam.sari', password: 'murid9012', name: 'Maryam Sari', role: 'student' as Role },
  ],
};

export default function LoginScreen() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [loggedInName, setLoggedInName] = useState('');
  const [loginError, setLoginError] = useState('');

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setLoginError('');

    await new Promise(r => setTimeout(r, 800));

    const credentials = MOCK_CREDENTIALS[role];
    const match = credentials.find(c => c.username === data.username && c.password === data.password);

    if (match) {
      setLoggedInName(match.name);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        if (role === 'teacher') {
          router.push('/teacher-dashboard');
        } else {
          router.push('/student-dashboard');
        }
      }, 2500);
    } else {
      setLoginError('Username atau password salah — gunakan akun demo di bawah untuk masuk');
    }
    setIsLoading(false);
  };

  const fillCredentials = (username: string, password: string) => {
    setValue('username', username);
    setValue('password', password);
  };

  const currentCredentials = MOCK_CREDENTIALS[role];

  return (
    <div className="min-h-screen flex islamic-pattern-bg relative overflow-hidden">
      <IslamicOrnament />

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 islamic-pattern-green flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="crescent-ornament top-8 left-8 text-8xl">☽</div>
        <div className="crescent-ornament bottom-12 right-8 text-6xl">✦</div>
        <div className="crescent-ornament top-1/3 right-4 text-4xl">❋</div>

        <div className="relative z-10 text-center">
          <div className="float-animation mb-8">
            <div className="w-32 h-32 rounded-full bg-white bg-opacity-30 flex items-center justify-center mx-auto shadow-soft-green">
              <BookOpen size={64} className="text-primary-foreground" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-primary-foreground mb-3">
            QuizLMS ✨
          </h1>
          <p className="text-primary-foreground text-opacity-80 text-lg font-medium mb-2">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
          <p className="text-primary-foreground text-lg font-semibold mb-6 opacity-90">
            Platform Belajar Islami yang Menyenangkan
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            {[
              { icon: BookOpen, label: 'Materi Lengkap', sub: 'Belajar kapan saja' },
              { icon: Star, label: 'Kuis Seru', sub: 'Tantang dirimu!' },
              { icon: GraduationCap, label: 'Leaderboard', sub: 'Raih peringkat 1!' },
              { icon: Sparkles, label: 'Mini Game', sub: 'Belajar sambil main' },
            ].map((item) => (
              <div key={`feature-${item.label}`} className="bg-white bg-opacity-25 rounded-2xl p-3 text-center">
                <item.icon size={24} className="text-primary-foreground mx-auto mb-1" />
                <p className="text-primary-foreground font-bold text-sm">{item.label}</p>
                <p className="text-primary-foreground opacity-75 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-soft-pink via-gold to-pastel-green opacity-60" />
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md slide-up">
          {/* Logo Mobile */}
          <div className="lg:hidden text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-3 shadow-soft-green">
              <BookOpen size={32} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-gradient-green">QuizLMS ✨</h1>
          </div>

          <div className="card-soft p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-1">Selamat Datang! 👋</h2>
              <p className="text-muted-foreground text-sm">Masuk ke akun kamu untuk mulai belajar</p>
            </div>

            {/* Role Toggle */}
            <div className="flex bg-muted rounded-full p-1 mb-6">
              <button
                type="button"
                onClick={() => { setRole('student'); setLoginError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${role === 'student' ? 'bg-soft-pink text-secondary-foreground shadow-soft-pink' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <GraduationCap size={16} />
                Murid
              </button>
              <button
                type="button"
                onClick={() => { setRole('teacher'); setLoginError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${role === 'teacher' ? 'bg-pastel-green text-primary-foreground shadow-soft-green' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Users size={16} />
                Guru
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1.5">Username</label>
                <input
                  {...register('username', { required: 'Username wajib diisi' })}
                  className="input-soft"
                  placeholder={role === 'teacher' ? 'siti.solecha' : 'fatimah.azzahra'}
                  autoComplete="username"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1 font-medium">⚠️ {errors.username.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-1.5">Password</label>
                <div className="relative">
                  <input
                    {...register('password', { required: 'Password wajib diisi', minLength: { value: 6, message: 'Password minimal 6 karakter' } })}
                    type={showPassword ? 'text' : 'password'}
                    className="input-soft pr-12"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 font-medium">⚠️ {errors.password.message}</p>
                )}
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-3">
                  <p className="text-red-600 text-sm font-medium">⚠️ {loginError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2"
                style={{ minHeight: '48px' }}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memverifikasi...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Moon size={16} />
                    Masuk Sekarang
                  </span>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                ✦ Akun Demo {role === 'teacher' ? 'Guru' : 'Murid'} ✦
              </p>
              <div className="space-y-2">
                {currentCredentials.map((cred) => (
                  <div
                    key={`cred-${cred.username}`}
                    className="flex items-center justify-between bg-muted rounded-xl p-2.5 gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">{cred.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{cred.username} / {cred.password}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => fillCredentials(cred.username, cred.password)}
                      className="text-xs bg-primary text-primary-foreground rounded-full px-3 py-1 font-bold hover:opacity-80 transition-opacity whitespace-nowrap"
                    >
                      Gunakan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            ❤️ Dibuat dengan cinta untuk generasi Muslim yang cerdas
          </p>
        </div>
      </div>

      {/* Celebration Popup */}
      {showCelebration && (
        <CelebrationPopup
          name={loggedInName}
          message={`Ahlan wa Sahlan, ${loggedInName}! 🌙`}
          subMessage={role === 'teacher' ? 'Selamat mengajar, Ustadz/Ustadzah!' : 'Semangat belajar hari ini! 📚'}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </div>
  );
}
