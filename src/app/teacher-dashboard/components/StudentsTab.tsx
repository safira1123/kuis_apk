'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, Edit2, X, Save, Search, Eye, EyeOff } from 'lucide-react';
import ConfirmModal from '../../ConfirmModal';

type Student = {
  id: string;
  name: string;
  username: string;
  password: string;
  grade: string;
  totalScore: number;
  quizCompleted: number;
  joinedAt: string;
  status: 'active' | 'inactive';
};

type StudentForm = {
  name: string;
  username: string;
  password: string;
  grade: string;
  status: 'active' | 'inactive';
};

const INITIAL_STUDENTS: Student[] = [
  { id: 'stu-001', name: 'Fatimah Az-Zahra', username: 'fatimah.azzahra', password: 'murid1234', grade: 'Kelas 7A', totalScore: 420, quizCompleted: 5, joinedAt: '2026-01-15', status: 'active' },
  { id: 'stu-002', name: 'Umar Al-Hakim', username: 'umar.hakim', password: 'murid5678', grade: 'Kelas 7A', totalScore: 385, quizCompleted: 5, joinedAt: '2026-01-15', status: 'active' },
  { id: 'stu-003', name: 'Maryam Sari', username: 'maryam.sari', password: 'murid9012', grade: 'Kelas 7B', totalScore: 450, quizCompleted: 5, joinedAt: '2026-01-16', status: 'active' },
  { id: 'stu-004', name: 'Abdullah Rasyid', username: 'abdullah.rasyid', password: 'murid3456', grade: 'Kelas 7A', totalScore: 360, quizCompleted: 4, joinedAt: '2026-01-16', status: 'active' },
  { id: 'stu-005', name: 'Khadijah Nur', username: 'khadijah.nur', password: 'murid7890', grade: 'Kelas 7B', totalScore: 410, quizCompleted: 5, joinedAt: '2026-01-17', status: 'active' },
  { id: 'stu-006', name: 'Ibrahim Malik', username: 'ibrahim.malik', password: 'murid2468', grade: 'Kelas 8A', totalScore: 395, quizCompleted: 5, joinedAt: '2026-01-17', status: 'active' },
  { id: 'stu-007', name: 'Zainab Hasan', username: 'zainab.hasan', password: 'murid1357', grade: 'Kelas 8A', totalScore: 340, quizCompleted: 4, joinedAt: '2026-01-18', status: 'active' },
  { id: 'stu-008', name: 'Yusuf Ramadhan', username: 'yusuf.ramadhan', password: 'murid9753', grade: 'Kelas 8B', totalScore: 375, quizCompleted: 5, joinedAt: '2026-01-18', status: 'active' },
  { id: 'stu-009', name: 'Aisyah Putri', username: 'aisyah.putri', password: 'murid8642', grade: 'Kelas 7B', totalScore: 430, quizCompleted: 5, joinedAt: '2026-01-19', status: 'active' },
  { id: 'stu-010', name: 'Hasan Al-Bashri', username: 'hasan.bashri', password: 'murid1593', grade: 'Kelas 8A', totalScore: 290, quizCompleted: 3, joinedAt: '2026-01-19', status: 'inactive' },
  { id: 'stu-011', name: 'Ruqayyah Dewi', username: 'ruqayyah.dewi', password: 'murid7531', grade: 'Kelas 7A', totalScore: 445, quizCompleted: 5, joinedAt: '2026-01-20', status: 'active' },
  { id: 'stu-012', name: 'Khalid Bin Walid', username: 'khalid.walid', password: 'murid2580', grade: 'Kelas 8B', totalScore: 315, quizCompleted: 4, joinedAt: '2026-01-20', status: 'active' },
];

export default function StudentsTab() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<StudentForm>({
    defaultValues: { grade: 'Kelas 7A', status: 'active' },
  });

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.username.toLowerCase().includes(search.toLowerCase()) ||
    s.grade.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    reset({ name: '', username: '', password: '', grade: 'Kelas 7A', status: 'active' });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (s: Student) => {
    setValue('name', s.name);
    setValue('username', s.username);
    setValue('password', s.password);
    setValue('grade', s.grade);
    setValue('status', s.status);
    setEditingId(s.id);
    setShowForm(true);
  };

  // Backend integration point: POST/PUT /api/students
  const onSubmit = (data: StudentForm) => {
    if (editingId) {
      setStudents(prev => prev.map(s => s.id === editingId ? { ...s, ...data } : s));
    } else {
      const newStudent: Student = {
        id: `stu-${Date.now()}`,
        ...data,
        totalScore: 0,
        quizCompleted: 0,
        joinedAt: new Date().toISOString().split('T')[0],
      };
      setStudents(prev => [newStudent, ...prev]);
    }
    setShowForm(false);
    reset();
  };

  const confirmDelete = () => {
    if (deleteId) {
      setStudents(prev => prev.filter(s => s.id !== deleteId));
      setDeleteId(null);
    }
  };

  const togglePassword = (id: string) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h3 className="font-bold text-foreground text-lg">Manajemen Murid</h3>
          <p className="text-muted-foreground text-sm">{students.length} murid terdaftar</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-soft pl-9 py-2 text-sm"
              placeholder="Cari murid..."
              style={{ minWidth: '220px' }}
            />
          </div>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-4">
            <Plus size={16} />
            Tambah Murid
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Nama Murid</th>
              <th className="text-left py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Username</th>
              <th className="text-left py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Password</th>
              <th className="text-left py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Kelas</th>
              <th className="text-left py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Kuis Selesai</th>
              <th className="text-left py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Nilai</th>
              <th className="text-left py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-right py-3 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, i) => (
              <tr
                key={student.id}
                className={`border-b border-border hover:bg-muted transition-colors ${i % 2 === 0 ? '' : 'bg-muted bg-opacity-30'}`}
              >
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-pastel-green flex items-center justify-center text-primary-foreground font-bold text-xs">
                      {student.name.charAt(0)}
                    </div>
                    <span className="font-bold text-foreground text-sm">{student.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-muted-foreground font-mono text-xs">{student.username}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-xs text-muted-foreground">
                      {showPasswords[student.id] ? student.password : '••••••••'}
                    </span>
                    <button onClick={() => togglePassword(student.id)} className="text-muted-foreground hover:text-foreground ml-1">
                      {showPasswords[student.id] ? <EyeOff size={12} /> : <Eye size={12} />}
                    </button>
                  </div>
                </td>
                <td className="py-3 px-3"><span className="badge-teal">{student.grade}</span></td>
                <td className="py-3 px-3 text-center font-bold text-foreground">{student.quizCompleted}</td>
                <td className="py-3 px-3 font-bold text-primary-foreground tabular-nums">{student.totalScore}</td>
                <td className="py-3 px-3">
                  <span className={student.status === 'active' ? 'badge-green' : 'badge-red'}>
                    {student.status === 'active' ? '✓ Aktif' : '✗ Nonaktif'}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <button onClick={() => openEdit(student)} className="p-1.5 rounded-xl bg-muted text-muted-foreground hover:bg-border transition-colors">
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => setDeleteId(student.id)} className="p-1.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-bold text-foreground">Murid tidak ditemukan</p>
            <p className="text-muted-foreground text-sm">Coba kata kunci yang berbeda</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="popup-overlay fade-in">
          <div className="bounce-in w-full max-w-md mx-4">
            <div className="card-soft p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-foreground text-lg">
                  {editingId ? '✏️ Edit Data Murid' : '👩‍🎓 Tambah Murid Baru'}
                </h3>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5">Nama Lengkap</label>
                  <input {...register('name', { required: 'Nama wajib diisi' })} className="input-soft" placeholder="Fatimah Az-Zahra" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">⚠️ {errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5">Username</label>
                  <p className="text-xs text-muted-foreground mb-1.5">Digunakan untuk login. Gunakan huruf kecil dan titik.</p>
                  <input {...register('username', { required: 'Username wajib diisi', pattern: { value: /^[a-z0-9_.]+$/, message: 'Hanya huruf kecil, angka, titik, underscore' } })} className="input-soft" placeholder="fatimah.azzahra" />
                  {errors.username && <p className="text-red-500 text-xs mt-1">⚠️ {errors.username.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5">Password</label>
                  <input {...register('password', { required: 'Password wajib diisi', minLength: { value: 6, message: 'Minimal 6 karakter' } })} className="input-soft" placeholder="Minimal 6 karakter" />
                  {errors.password && <p className="text-red-500 text-xs mt-1">⚠️ {errors.password.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5">Kelas</label>
                    <select {...register('grade')} className="input-soft">
                      <option>Kelas 7A</option>
                      <option>Kelas 7B</option>
                      <option>Kelas 8A</option>
                      <option>Kelas 8B</option>
                      <option>Kelas 9A</option>
                      <option>Kelas 9B</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5">Status</label>
                    <select {...register('status')} className="input-soft">
                      <option value="active">Aktif</option>
                      <option value="inactive">Nonaktif</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="btn-ghost flex-1">Batal</button>
                  <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <Save size={16} />
                    {editingId ? 'Simpan Perubahan' : 'Tambah Murid'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <ConfirmModal
          title="Hapus Data Murid"
          message="Data murid ini akan dihapus permanen termasuk semua nilai dan riwayat kuis. Yakin?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
          confirmLabel="Hapus Murid"
          danger
        />
      )}
    </div>
  );
}