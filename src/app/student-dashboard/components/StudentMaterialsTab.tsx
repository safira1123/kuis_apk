'use client';

import React, { useState } from 'react';
import { BookOpen, Eye, X, CheckCircle } from 'lucide-react';

type Material = {
  id: string;
  title: string;
  subject: string;
  content: string;
  grade: string;
  isRead: boolean;
};

const STUDENT_MATERIALS: Material[] = [
  { id: 'mat-001', title: 'Rukun Islam & Rukun Iman', subject: 'Akidah', content: 'Rukun Islam ada lima, yaitu: 1) Syahadat — Bersaksi bahwa tiada Tuhan selain Allah dan Muhammad adalah utusan-Nya. 2) Sholat — Mendirikan sholat lima waktu sehari semalam. 3) Zakat — Menunaikan zakat bagi yang mampu. 4) Puasa — Berpuasa di bulan Ramadhan. 5) Haji — Menunaikan ibadah haji bagi yang mampu.\n\nRukun Iman ada enam, yaitu: 1) Iman kepada Allah. 2) Iman kepada Malaikat. 3) Iman kepada Kitab-kitab Allah. 4) Iman kepada Rasul-rasul Allah. 5) Iman kepada Hari Kiamat. 6) Iman kepada Qada dan Qadar.', grade: 'Kelas 7', isRead: true },
  { id: 'mat-002', title: 'Tata Cara Wudhu yang Benar', subject: 'Fiqih', content: 'Wudhu adalah syarat sah sholat. Fardhu wudhu ada enam: 1) Niat. 2) Membasuh muka. 3) Membasuh kedua tangan hingga siku. 4) Mengusap sebagian kepala. 5) Membasuh kedua kaki hingga mata kaki. 6) Tertib (berurutan).\n\nSunnah wudhu antara lain: membaca basmalah, bersiwak, berkumur, memasukkan air ke hidung, mengusap seluruh kepala, mengusap kedua telinga, mendahulukan anggota kanan, dan berdoa setelah wudhu.', grade: 'Kelas 7', isRead: true },
  { id: 'mat-003', title: 'Sejarah Nabi Muhammad SAW', subject: 'Sejarah Islam', content: 'Nabi Muhammad SAW lahir di Makkah pada tahun 570 M, bertepatan dengan Tahun Gajah. Beliau adalah putra Abdullah bin Abdul Muthalib dan Aminah binti Wahab.\n\nBeliau dikenal dengan julukan Al-Amin (yang terpercaya) sejak kecil. Pada usia 40 tahun, beliau menerima wahyu pertama di Gua Hira. Wahyu pertama adalah Surat Al-Alaq ayat 1-5.\n\nNabi Muhammad SAW wafat pada tanggal 12 Rabiul Awal 11 H, bertepatan dengan 8 Juni 632 M di Madinah.', grade: 'Kelas 8', isRead: true },
  { id: 'mat-004', title: 'Asmaul Husna 1-25', subject: 'Akidah', content: 'Asmaul Husna adalah 99 nama-nama Allah yang indah. Berikut 25 pertama:\n1. Ar-Rahman (Yang Maha Pengasih)\n2. Ar-Rahim (Yang Maha Penyayang)\n3. Al-Malik (Yang Maha Merajai)\n4. Al-Quddus (Yang Maha Suci)\n5. As-Salam (Yang Maha Memberi Keselamatan)\n6. Al-Mumin (Yang Maha Memberi Keamanan)\n7. Al-Muhaymin (Yang Maha Memelihara)\n8. Al-Aziz (Yang Maha Gagah)\n9. Al-Jabbar (Yang Maha Perkasa)\n10. Al-Mutakabbir (Yang Maha Megah)...', grade: 'Kelas 7', isRead: true },
  { id: 'mat-005', title: 'Surat Al-Fatihah & Artinya', subject: "Al-Qur'an", content: "Al-Fatihah adalah surat pembuka dalam Al-Qur'an, terdiri dari 7 ayat. Disebut juga Ummul Kitab (induk Al-Qur'an).\n\nAyat 1: Bismillahirrahmanirrahim — Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang.\nAyat 2: Alhamdulillahi rabbil 'alamin — Segala puji bagi Allah, Tuhan semesta alam.\nAyat 3: Arrahmanirrahim — Yang Maha Pengasih lagi Maha Penyayang.\nAyat 4: Maliki yaumiddin — Pemilik hari pembalasan.\nAyat 5: Iyyaka na'budu wa iyyaka nasta'in — Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami memohon pertolongan.\nAyat 6: Ihdinas siratal mustaqim — Tunjukkanlah kami jalan yang lurus.\nAyat 7: Siratal ladzina an'amta 'alayhim... — Yaitu jalan orang-orang yang telah Engkau beri nikmat...", grade: 'Kelas 7', isRead: true },
  { id: 'mat-007', title: 'Thaharah & Najis', subject: 'Fiqih', content: 'Thaharah berarti bersuci dari hadats dan najis. Macam-macam najis:\n1. Najis Mughallazhah (berat): najis anjing dan babi. Cara mensucikan: dibasuh 7 kali, salah satunya dengan tanah.\n2. Najis Mutawassithah (sedang): darah, nanah, bangkai, dll. Cara: dicuci hingga hilang warna, bau, dan rasanya.\n3. Najis Mukhaffafah (ringan): air kencing bayi laki-laki yang belum makan selain ASI. Cara: cukup dipercikkan air.', grade: 'Kelas 8', isRead: false },
  { id: 'mat-008', title: 'Doa Sehari-hari', subject: 'Ibadah', content: "Kumpulan doa harian yang penting:\n\n1. Doa Makan: Allahumma barik lana fima razaqtana waqina adzabannar.\n2. Doa Tidur: Bismikallahumma ahya wa amut.\n3. Doa Bangun Tidur: Alhamdulillahilladzi ahyana ba'da ma amatana wa ilayhin nusyur.\n4. Doa Belajar: Rabbi zidni 'ilman warzuqni fahma.\n5. Doa Masuk Rumah: Allahumma inni as'aluka khayral mawlaji wa khayral makhraji.\n6. Doa Keluar Rumah: Bismillahi tawakkaltu 'alallahi la hawla wala quwwata illa billah.", grade: 'Kelas 7', isRead: false },
];

export default function StudentMaterialsTab() {
  const [materials, setMaterials] = useState<Material[]>(STUDENT_MATERIALS);
  const [viewMaterial, setViewMaterial] = useState<Material | null>(null);

  const handleRead = (mat: Material) => {
    setViewMaterial(mat);
    if (!mat.isRead) {
      setMaterials(prev => prev.map(m => m.id === mat.id ? { ...m, isRead: true } : m));
    }
  };

  const subjectColors: Record<string, string> = {
    'Akidah': 'badge-green',
    'Fiqih': 'badge-teal',
    "Al-Qur'an": 'badge-gold',
    'Sejarah Islam': 'badge-pink',
    'Akhlak': 'badge-pink',
    'Ibadah': 'badge-green',
  };

  const readCount = materials.filter(m => m.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-foreground text-lg">Materi Pelajaran</h3>
          <p className="text-muted-foreground text-sm">{readCount}/{materials.length} materi sudah dibaca</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-pastel-green rounded-full transition-all duration-500"
              style={{ width: `${(readCount / materials.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-primary-foreground">{Math.round((readCount / materials.length) * 100)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {materials.map((mat) => (
          <div
            key={mat.id}
            className={`card-soft p-4 cursor-pointer hover:shadow-soft-green transition-all duration-200 slide-up group ${mat.isRead ? 'border-pastel-green border-opacity-50' : ''}`}
            onClick={() => handleRead(mat)}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`${subjectColors[mat.subject] || 'badge-green'} text-xs`}>{mat.subject}</span>
              {mat.isRead ? (
                <span className="badge-green flex items-center gap-1 text-xs">
                  <CheckCircle size={10} /> Sudah Dibaca
                </span>
              ) : (
                <span className="badge-gold text-xs">📖 Baru</span>
              )}
            </div>
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${mat.isRead ? 'bg-pastel-green' : 'bg-muted'}`}>
                <BookOpen size={18} className={mat.isRead ? 'text-primary-foreground' : 'text-muted-foreground'} />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-foreground text-sm mb-0.5 line-clamp-2">{mat.title}</h4>
                <p className="text-xs text-muted-foreground">📚 {mat.grade}</p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs line-clamp-2 mb-3">{mat.content}</p>
            <button className="w-full flex items-center justify-center gap-1 bg-muted text-foreground rounded-xl py-2 text-xs font-bold hover:bg-pastel-green hover:text-primary-foreground transition-colors group-hover:bg-pastel-green group-hover:text-primary-foreground">
              <Eye size={12} /> Baca Materi
            </button>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {viewMaterial && (
        <div className="popup-overlay fade-in">
          <div className="bounce-in w-full max-w-lg mx-4 max-h-screen overflow-y-auto scrollbar-soft">
            <div className="card-soft p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-4">
                  <span className={`${subjectColors[viewMaterial.subject] || 'badge-green'} text-xs mb-2 inline-block`}>{viewMaterial.subject}</span>
                  <h3 className="font-bold text-foreground text-xl">{viewMaterial.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">📚 {viewMaterial.grade}</p>
                </div>
                <button onClick={() => setViewMaterial(null)} className="text-muted-foreground hover:text-foreground flex-shrink-0">
                  <X size={20} />
                </button>
              </div>
              <div className="bg-muted rounded-2xl p-4 mb-4">
                <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">{viewMaterial.content}</p>
              </div>
              <div className="flex items-center gap-2 bg-pastel-green-light rounded-2xl p-3 mb-4">
                <CheckCircle size={16} className="text-primary-foreground flex-shrink-0" />
                <p className="text-xs font-bold text-primary-foreground">Materi ini sudah tercatat sebagai dibaca! 🌿</p>
              </div>
              <button onClick={() => setViewMaterial(null)} className="btn-primary w-full">Tutup Materi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}