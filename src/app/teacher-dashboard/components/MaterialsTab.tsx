'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2, Eye, X, Save } from 'lucide-react';
import ConfirmModal from '../../ConfirmModal';

type Material = {
  id: string;
  title: string;
  subject: string;
  content: string;
  grade: string;
  status: 'published' | 'draft';
  createdAt: string;
  readCount: number;
};

type MaterialForm = {
  title: string;
  subject: string;
  content: string;
  grade: string;
  status: 'published' | 'draft';
};

const INITIAL_MATERIALS: Material[] = [
  { id: 'mat-001', title: 'Rukun Islam & Rukun Iman', subject: 'Akidah', content: 'Rukun Islam ada lima, yaitu: Syahadat, Sholat, Zakat, Puasa, dan Haji. Rukun Iman ada enam...', grade: 'Kelas 7', status: 'published', createdAt: '2026-05-08', readCount: 24 },
  { id: 'mat-002', title: 'Tata Cara Wudhu yang Benar', subject: 'Fiqih', content: 'Wudhu adalah syarat sah sholat. Berikut tata caranya: Niat, membasuh muka, tangan hingga siku...', grade: 'Kelas 7', status: 'published', createdAt: '2026-05-07', readCount: 21 },
  { id: 'mat-003', title: 'Sejarah Nabi Muhammad SAW', subject: 'Sejarah Islam', content: 'Nabi Muhammad SAW lahir di Makkah pada tahun 570 M, dikenal sebagai Al-Amin...', grade: 'Kelas 8', status: 'published', createdAt: '2026-05-06', readCount: 19 },
  { id: 'mat-004', title: 'Asmaul Husna 1-25', subject: 'Akidah', content: 'Asmaul Husna adalah 99 nama-nama Allah yang indah. Kita akan mempelajari 25 pertama...', grade: 'Kelas 7', status: 'published', createdAt: '2026-05-05', readCount: 28 },
  { id: 'mat-005', title: 'Surat Al-Fatihah & Artinya', subject: 'Al-Qur\'an', content: 'Al-Fatihah adalah surat pembuka dalam Al-Qur\'an, terdiri dari 7 ayat...', grade: 'Kelas 7', status: 'published', createdAt: '2026-05-04', readCount: 26 },
  { id: 'mat-006', title: 'Akhlak Terpuji dalam Islam', subject: 'Akhlak', content: 'Akhlak terpuji (mahmudah) meliputi: jujur, amanah, sabar, syukur, tawadhu...', grade: 'Kelas 8', status: 'draft', createdAt: '2026-05-09', readCount: 0 },
  { id: 'mat-007', title: 'Thaharah & Najis', subject: 'Fiqih', content: 'Thaharah berarti bersuci. Macam-macam najis dan cara mensucikannya...', grade: 'Kelas 8', status: 'published', createdAt: '2026-05-03', readCount: 17 },
  { id: 'mat-008', title: 'Doa Sehari-hari', subject: 'Ibadah', content: 'Kumpulan doa harian: doa makan, doa tidur, doa belajar, doa masuk kamar mandi...', grade: 'Kelas 7', status: 'published', createdAt: '2026-05-02', readCount: 30 },
];

export default function MaterialsTab() {
  const [materials, setMaterials] = useState<Material[]>(INITIAL_MATERIALS);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewMaterial, setViewMaterial] = useState<Material | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<MaterialForm>({
    defaultValues: { status: 'published' },
  });

  const openCreate = () => {
    reset({ title: '', subject: '', content: '', grade: 'Kelas 7', status: 'published' });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (mat: Material) => {
    setValue('title', mat.title);
    setValue('subject', mat.subject);
    setValue('content', mat.content);
    setValue('grade', mat.grade);
    setValue('status', mat.status);
    setEditingId(mat.id);
    setShowForm(true);
  };

  // Backend integration point: POST/PUT /api/materials
  const onSubmit = (data: MaterialForm) => {
    if (editingId) {
      setMaterials(prev => prev.map(m => m.id === editingId ? { ...m, ...data } : m));
    } else {
      const newMat: Material = {
        id: `mat-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString().split('T')[0],
        readCount: 0,
      };
      setMaterials(prev => [newMat, ...prev]);
    }
    setShowForm(false);
    reset();
  };

  // Backend integration point: DELETE /api/materials/:id
  const confirmDelete = () => {
    if (deleteId) {
      setMaterials(prev => prev.filter(m => m.id !== deleteId));
      setDeleteId(null);
    }
  };

  const subjectColors: Record<string, string> = {
    'Akidah': 'badge-green',
    'Fiqih': 'badge-teal',
    'Al-Qur\'an': 'badge-gold',
    'Sejarah Islam': 'badge-pink',
    'Akhlak': 'badge-pink',
    'Ibadah': 'badge-green',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-foreground text-lg">Materi Pelajaran</h3>
          <p className="text-muted-foreground text-sm">{materials.length} materi tersedia</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-4">
          <Plus size={16} />
          Tambah Materi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {materials.map((mat) => (
          <div key={mat.id} className="card-soft p-4 hover:shadow-soft-green transition-shadow duration-200 slide-up group">
            <div className="flex items-start justify-between mb-2">
              <span className={`${subjectColors[mat.subject] || 'badge-green'} text-xs`}>{mat.subject}</span>
              <span className={mat.status === 'published' ? 'badge-green' : 'badge-gold'}>
                {mat.status === 'published' ? '✓ Terbit' : '⏳ Draft'}
              </span>
            </div>
            <h4 className="font-bold text-foreground text-sm mb-1 line-clamp-2">{mat.title}</h4>
            <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{mat.content}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span>📚 {mat.grade}</span>
              <span>👁️ {mat.readCount} baca</span>
              <span>📅 {mat.createdAt}</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => setViewMaterial(mat)}
                className="flex-1 flex items-center justify-center gap-1 bg-pastel-green-light text-primary-foreground rounded-xl py-1.5 text-xs font-bold hover:bg-pastel-green transition-colors"
              >
                <Eye size={12} /> Lihat
              </button>
              <button
                onClick={() => openEdit(mat)}
                className="flex-1 flex items-center justify-center gap-1 bg-muted text-foreground rounded-xl py-1.5 text-xs font-bold hover:bg-border transition-colors"
              >
                <Edit2 size={12} /> Edit
              </button>
              <button
                onClick={() => setDeleteId(mat.id)}
                className="flex items-center justify-center gap-1 bg-red-50 text-red-500 rounded-xl px-2 py-1.5 text-xs font-bold hover:bg-red-100 transition-colors"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="popup-overlay fade-in">
          <div className="bounce-in w-full max-w-lg mx-4 max-h-screen overflow-y-auto">
            <div className="card-soft p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-foreground text-lg">
                  {editingId ? '✏️ Edit Materi' : '📚 Tambah Materi Baru'}
                </h3>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5">Judul Materi</label>
                  <input
                    {...register('title', { required: 'Judul wajib diisi' })}
                    className="input-soft"
                    placeholder="Contoh: Rukun Islam & Rukun Iman"
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1">⚠️ {errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5">Mata Pelajaran</label>
                    <input
                      {...register('subject', { required: 'Mata pelajaran wajib diisi' })}
                      className="input-soft"
                      placeholder="Akidah, Fiqih, dll."
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">⚠️ {errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5">Kelas</label>
                    <select {...register('grade')} className="input-soft">
                      <option>Kelas 7</option>
                      <option>Kelas 8</option>
                      <option>Kelas 9</option>
                      <option>Semua Kelas</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5">Konten Materi</label>
                  <p className="text-xs text-muted-foreground mb-1.5">Tulis materi pelajaran secara lengkap dan jelas</p>
                  <textarea
                    {...register('content', { required: 'Konten wajib diisi', minLength: { value: 20, message: 'Konten terlalu pendek' } })}
                    className="input-soft"
                    rows={5}
                    placeholder="Tuliskan isi materi di sini..."
                  />
                  {errors.content && <p className="text-red-500 text-xs mt-1">⚠️ {errors.content.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5">Status Publikasi</label>
                  <div className="flex gap-3">
                    {(['published', 'draft'] as const).map(s => (
                      <label key={`status-${s}`} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" {...register('status')} value={s} className="accent-primary" />
                        <span className={`text-sm font-medium ${s === 'published' ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                          {s === 'published' ? '✓ Terbitkan' : '⏳ Simpan Draft'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="btn-ghost flex-1">Batal</button>
                  <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <Save size={16} />
                    {editingId ? 'Simpan Perubahan' : 'Tambah Materi'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewMaterial && (
        <div className="popup-overlay fade-in">
          <div className="bounce-in w-full max-w-lg mx-4 max-h-screen overflow-y-auto">
            <div className="card-soft p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`${subjectColors[viewMaterial.subject] || 'badge-green'} text-xs mb-2 inline-block`}>{viewMaterial.subject}</span>
                  <h3 className="font-bold text-foreground text-xl">{viewMaterial.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">📚 {viewMaterial.grade} · 👁️ {viewMaterial.readCount} dibaca</p>
                </div>
                <button onClick={() => setViewMaterial(null)} className="text-muted-foreground hover:text-foreground ml-3">
                  <X size={20} />
                </button>
              </div>
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">{viewMaterial.content}</p>
              </div>
              <button onClick={() => setViewMaterial(null)} className="btn-primary w-full mt-4">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <ConfirmModal
          title="Hapus Materi"
          message="Materi ini akan dihapus permanen dan tidak bisa dikembalikan. Yakin?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
          confirmLabel="Hapus Materi"
          danger
        />
      )}
    </div>
  );
}