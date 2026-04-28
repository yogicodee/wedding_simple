/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Music, 
  Pause, 
  Send,
  BellRing as Ring
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wishes, setWishes] = useState<{name: string, message: string}[]>([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown Logic
  useEffect(() => {
    const targetDate = new Date('2026-10-28T08:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setWishes([
      { name: "Keluarga Besar", message: "Selamat menempuh hidup baru Arunika & Baskara!" },
      { name: "Dewi & Rama", message: "Bahagia selalu selamanya, amin!" }
    ]);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.message) {
      setWishes([formData, ...wishes]);
      setFormData({ name: '', message: '' });
    }
  };

  if (!isOpen) {
    return (
      <div id="cover" className="fixed inset-0 z-50 flex items-center justify-center bg-brand-bg transition-all duration-700">
        <div className="corner-decoration top-[40px] left-[40px]">❦</div>
        <div className="corner-decoration bottom-[40px] right-[40px] rotate-180">❦</div>
        
        <div className="minimal-border absolute inset-0 pointer-events-none opacity-50" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-6 relative z-10 max-w-lg"
        >
          <svg className="w-12 h-12 mx-auto opacity-30 mb-8" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10C50 10 45 35 30 40C15 45 5 50 5 50C5 50 15 55 30 60C45 65 50 90 50 90C50 90 55 65 70 60C85 55 95 50 95 50C95 50 85 45 70 40C55 35 50 10 50 10Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          
          <p className="font-sans text-[11px] tracking-[4px] uppercase text-brand-dark/70 mb-4">The Wedding of</p>
          <h1 className="font-serif text-6xl md:text-7xl text-brand-accent mb-10 leading-tight">
            Arunika & Baskara
          </h1>
          
          <button
            onClick={handleOpen}
            className="px-10 py-4 bg-brand-dark text-brand-bg text-[11px] tracking-[2px] uppercase transition-all hover:bg-brand-accent active:scale-95"
          >
            Buka Undangan
          </button>
          
          <p className="mt-12 opacity-40 text-[10px] tracking-[1px]">#ArunikaBaskaraStory</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="main-content" className="min-h-screen bg-brand-bg selection:bg-brand-dark/10 scroll-smooth pb-20">
      {/* Floating Music */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-8 right-8 z-40 w-10 h-10 border border-brand-dark/20 bg-white/50 backdrop-blur rounded-full flex items-center justify-center text-brand-dark"
      >
        {isPlaying ? <Music className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      </button>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 border-x-[20px] border-white">
        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <motion.p variants={fadeInUp} className="text-[11px] tracking-[4px] uppercase opacity-60 mb-6">Pernikahan</motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-6xl md:text-8xl text-brand-accent mb-12">
            Arunika & <br className="md:hidden" /> Baskara
          </motion.h2>
          <motion.div variants={fadeInUp} className="date-box font-serif text-lg tracking-[3px]">
            28 . 10 . 2026
          </motion.div>

          {/* Countdown Timer */}
          <motion.div 
            variants={fadeInUp}
            className="flex justify-center gap-4 md:gap-8 mt-12"
          >
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-serif text-2xl md:text-3xl text-brand-accent">{String(item.value).padStart(2, '0')}</span>
                <span className="text-[10px] tracking-[2px] uppercase opacity-40 mt-1">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Quote */}
      <section className="py-32 px-6 max-w-2xl mx-auto text-center border-x-[20px] border-white bg-white/10">
        <motion.p 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 0.6 }}
          className="font-serif text-base md:text-lg leading-relaxed italic mb-8"
        >
          "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."
        </motion.p>
        <p className="text-[10px] tracking-[2px] opacity-40 uppercase">— QS Ar-Rum: 21</p>
      </section>

      {/* Couple Profiles */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-24">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center group">
            <div className="aspect-[4/5] bg-gray-100 mb-10 overflow-hidden relative">
               <div className="absolute inset-0 bg-brand-dark/5 transition-opacity group-hover:opacity-0" />
               <div className="w-full h-full flex items-center justify-center font-serif italic text-brand-dark/20 text-sm">Baskara's Portrait</div>
            </div>
            <h3 className="font-serif text-3xl mb-4 text-brand-accent">Baskara Aditama</h3>
            <p className="text-[10px] tracking-[2px] opacity-40 mb-4 uppercase">Putra dari</p>
            <p className="text-sm opacity-60 leading-relaxed">Bapak Bambang Aditama<br />& Ibu Suminah</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center group">
            <div className="aspect-[4/5] bg-gray-100 mb-10 overflow-hidden relative">
               <div className="absolute inset-0 bg-brand-dark/5 transition-opacity group-hover:opacity-0" />
               <div className="w-full h-full flex items-center justify-center font-serif italic text-brand-dark/20 text-sm">Arunika's Portrait</div>
            </div>
            <h3 className="font-serif text-3xl mb-4 text-brand-accent">Arunika Salsabila</h3>
            <p className="text-[10px] tracking-[2px] opacity-40 mb-4 uppercase">Putri dari</p>
            <p className="text-sm opacity-60 leading-relaxed">Bapak Hartono<br />& Ibu Wahyuni</p>
          </motion.div>
        </div>
      </section>

      {/* Love Story Section */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl text-brand-accent mb-4">Kisah Cinta</h2>
            <div className="w-12 h-[1px] bg-brand-border mx-auto mb-6" />
            <p className="text-[10px] tracking-[2px] opacity-40 uppercase">Perjalanan cinta kami</p>
          </div>

          <div className="space-y-24 relative">
            {/* Center Line for Desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-brand-border/20 -translate-x-1/2 md:block hidden" />
            
            {[
              { year: '2022', title: 'Pertama Bertemu', story: 'Semua bermula dari pertemuan tak sengaja di sebuah perpustakaan kota. Percakapan singkat tentang hobi yang sama membawa kami ke tahap yang lebih jauh.' },
              { year: '2024', title: 'Menjalin Komitmen', story: 'Setelah dua tahun saling mengenal dan menguatkan satu sama lain, kami memutuskan untuk berkomitmen menjalani hubungan yang lebih serius.' },
              { year: '2026', title: 'Langkah Baru', story: 'Di hari yang istimewa ini, kami mengikat janji suci untuk hidup semati, membangun bahtera rumah tangga yang penuh cinta.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:items-start gap-8 md:gap-24`}
              >
                {/* Left/Alternating Content */}
                <div className={`md:w-1/2 text-center ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} hidden md:block`}>
                  {i % 2 === 0 && (
                    <>
                      <h4 className="font-serif text-2xl text-brand-accent mb-2">{item.title}</h4>
                      <p className="text-[10px] tracking-[2px] opacity-40 uppercase mb-4">{item.year}</p>
                      <p className="text-sm opacity-60 leading-relaxed italic">{item.story}</p>
                    </>
                  )}
                </div>
                
                {/* Timeline Dot */}
                <div className="w-3 h-3 rounded-full border border-brand-dark bg-brand-bg relative z-10 shrink-0 md:block hidden mt-2" />

                {/* Right/Alternating Content + Mobile View Content */}
                <div className={`md:w-1/2 text-center ${i % 2 !== 0 ? 'md:text-left' : 'md:text-right'} md:block`}>
                  {(i % 2 !== 0 || window.innerWidth < 768) && (
                    <div className={i % 2 === 0 ? 'md:hidden' : ''}>
                      <h4 className="font-serif text-2xl text-brand-accent mb-2">{item.title}</h4>
                      <p className="text-[10px] tracking-[2px] opacity-40 uppercase mb-4">{item.year}</p>
                      <p className="text-sm opacity-60 leading-relaxed italic">{item.story}</p>
                    </div>
                  )}
                  {i % 2 !== 0 && (
                    <div className="hidden md:block">
                      <h4 className="font-serif text-2xl text-brand-accent mb-2">{item.title}</h4>
                      <p className="text-[10px] tracking-[2px] opacity-40 uppercase mb-4">{item.year}</p>
                      <p className="text-sm opacity-60 leading-relaxed italic">{item.story}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-32 px-6 bg-white border-y border-brand-border/10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl text-brand-accent mb-4">Momen Bahagia</h2>
            <div className="w-12 h-[1px] bg-brand-border mx-auto mb-6" />
            <p className="text-[10px] tracking-[2px] opacity-40 uppercase">Kepingan potret cinta kami</p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {[
              { label: 'Moment 1', aspect: 'aspect-square' },
              { label: 'Moment 2', aspect: 'aspect-[3/4]' },
              { label: 'Moment 3', aspect: 'aspect-[4/3]' },
              { label: 'Moment 4', aspect: 'aspect-[3/5]' },
              { label: 'Moment 5', aspect: 'aspect-square' },
              { label: 'Moment 6', aspect: 'aspect-[4/5]' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative group bg-gray-50 overflow-hidden ${item.aspect} break-inside-avoid`}
              >
                <div className="absolute inset-0 bg-brand-dark/5 group-hover:bg-transparent transition-all z-10" />
                <div className="w-full h-full flex items-center justify-center font-serif italic text-brand-dark/10">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl text-brand-accent mb-4">Informasi Acara</h2>
            <div className="w-12 h-[1px] bg-brand-border mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h4 className="font-serif text-2xl border-b border-brand-border pb-4">Akad Nikah</h4>
              <div className="space-y-3 text-sm opacity-70">
                <p>Minggu, 28 Oktober 2026</p>
                <p>08:00 - 10:00 WIB</p>
                <p className="font-semibold">Masjid Agung Kota Tua</p>
                <p>Jl. Melati No. 12, Jakarta</p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-serif text-2xl border-b border-brand-border pb-4">Resepsi</h4>
              <div className="space-y-3 text-sm opacity-70">
                <p>Minggu, 28 Oktober 2026</p>
                <p>11:00 - Selesai</p>
                <p className="font-semibold">Hotel Emerald Grand Ballroom</p>
                <p>Jl. Kemewahan No. 1, Jakarta</p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <a 
              href="#" 
              className="inline-block border border-brand-dark px-10 py-4 text-[11px] tracking-[2px] uppercase hover:bg-brand-dark hover:text-brand-bg transition-colors"
            >
              Lihat Lokasi Maps
            </a>
          </div>
        </div>
      </section>

      {/* Protocol Section */}
      <section className="py-32 px-6 bg-brand-bg">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-3xl text-brand-accent mb-4">Protokol Acara</h2>
            <p className="text-[10px] tracking-[2px] opacity-40 uppercase">Kenyamanan dan keamanan bersama</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { icon: <Ring className="w-6 h-6" />, text: "MASKER DIWAJIBKAN" },
              { icon: <Heart className="w-6 h-6" />, text: "CUCI TANGAN" },
              { icon: <MapPin className="w-6 h-6" />, text: "JAGA JARAK" },
              { icon: <Clock className="w-6 h-6" />, text: "TEPAT WAKTU" },
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-12 h-12 border border-brand-border/30 rounded-full flex items-center justify-center text-brand-dark/40">
                  {p.icon}
                </div>
                <span className="text-[9px] tracking-[2px] uppercase opacity-60 leading-tight">{p.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wishes Form */}
      <section className="py-32 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl text-brand-accent mb-4">Doa & Harapan</h2>
            <p className="text-[10px] tracking-[2px] opacity-40 uppercase">Tinggalkan pesan untuk kami</p>
          </div>

          <form onSubmit={handleWishSubmit} className="space-y-6 mb-20">
            <input 
              type="text" 
              placeholder="NAMA LENGKAP"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border-b border-brand-border py-4 focus:outline-none focus:border-brand-dark text-xs tracking-widest bg-transparent"
            />
            <textarea 
              placeholder="PESAN & HARAPAN"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full border-b border-brand-border py-4 focus:outline-none focus:border-brand-dark text-xs tracking-widest bg-transparent resize-none"
            />
            <button className="w-full py-4 bg-brand-dark text-brand-bg text-[10px] tracking-[2px] uppercase">
              Kirim Ucapan
            </button>
          </form>

          <div className="space-y-8">
            {wishes.map((w, i) => (
              <div key={i} className="border-l border-brand-border pl-6">
                <p className="font-semibold text-xs tracking-widest mb-1">{w.name.toUpperCase()}</p>
                <p className="text-sm opacity-60 leading-relaxed italic">{w.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Confirmation */}
      <section className="py-32 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl text-brand-accent mb-4">Konfirmasi Kehadiran</h2>
            <p className="text-[10px] tracking-[2px] opacity-40 uppercase">Mohon konfirmasi kehadiran Anda</p>
          </div>

          <div className="bg-white border border-brand-border/20 p-10 md:p-12 shadow-sm">
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-[2px] opacity-40 uppercase">Nama Lengkap</label>
                  <input type="text" className="w-full border-b border-brand-border py-2 focus:outline-none focus:border-brand-dark text-sm bg-transparent" placeholder="JOHAN DOE" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-[2px] opacity-40 uppercase">Jumlah Tamu</label>
                  <select className="w-full border-b border-brand-border py-2 focus:outline-none focus:border-brand-dark text-sm bg-transparent">
                    <option>1 ORANG</option>
                    <option>2 ORANG</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="text-[10px] tracking-[2px] opacity-40 uppercase block">Konfirmasi</label>
                <div className="flex gap-8">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="attendance" className="w-4 h-4 accent-brand-dark" />
                    <span className="text-xs tracking-[1px] opacity-60 group-hover:opacity-100 italic">SAYA AKAN HADIR</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="attendance" className="w-4 h-4 accent-brand-dark" />
                    <span className="text-xs tracking-[1px] opacity-60 group-hover:opacity-100 italic">SAYA BERHALANGAN</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-brand-dark text-brand-bg text-[10px] tracking-[2px] uppercase hover:bg-brand-accent transition-colors">
                Kirim Konfirmasi
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Digital Envelope */}
      <section className="py-32 px-6 bg-white border-y border-brand-border/10">
        <div className="max-w-xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="font-serif text-3xl text-brand-accent mb-4">Kado Digital</h2>
            <p className="text-[10px] tracking-[2px] opacity-40 uppercase">Tanda kasih untuk kedua mempelai</p>
          </div>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 border border-brand-border/30 bg-brand-bg/30 relative group"
            >
              <p className="text-[10px] tracking-[4px] uppercase opacity-40 mb-6">Bank Transfer</p>
              <h4 className="font-serif text-2xl text-brand-accent mb-2">BANK MANDIRI</h4>
              <p className="font-serif text-xl tracking-[2px] mb-4">1234 5678 9012</p>
              <p className="text-sm opacity-60">a.n Arunika Salsabila</p>
              
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('123456789012');
                  alert('Nomor rekening berhasil disalin');
                }}
                className="mt-8 text-[10px] tracking-[2px] uppercase border-b border-brand-dark pb-1 opacity-40 hover:opacity-100 transition-opacity"
              >
                Salin Rekening
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 border border-brand-border/30 bg-brand-bg/30 relative"
            >
              <p className="text-[10px] tracking-[4px] uppercase opacity-40 mb-6">E-Wallet</p>
              <h4 className="font-serif text-2xl text-brand-accent mb-2">GOPAY / DANA</h4>
              <p className="font-serif text-xl tracking-[2px] mb-4">0812 3456 7890</p>
              <p className="text-sm opacity-60">a.n Baskara Aditama</p>
              
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('081234567890');
                  alert('Nomor e-wallet berhasil disalin');
                }}
                className="mt-8 text-[10px] tracking-[2px] uppercase border-b border-brand-dark pb-1 opacity-40 hover:opacity-100 transition-opacity"
              >
                Salin Nomor
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Stream Section */}
      <section className="py-32 px-6 bg-white border-y border-brand-border/10">
        <div className="max-w-xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-brand-accent mb-4">Siaran Langsung</h2>
            <p className="text-[10px] tracking-[2px] opacity-40 uppercase">Saksikan momen bahagia kami secara virtual</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 bg-brand-bg/50 border border-brand-border/20 rounded-sm"
          >
            <p className="font-serif text-lg italic mb-8 opacity-70">
              "Bagi keluarga dan sahabat yang berhalangan hadir secara fisik, kami mengundang Anda untuk bergabung melalui siaran langsung."
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-3 bg-brand-dark text-brand-bg px-10 py-4 text-[10px] tracking-[3px] uppercase hover:bg-brand-accent transition-colors"
            >
              <Music className="w-4 h-4" /> Buka Link Streaming
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-32 px-6 text-center">
        <p className="font-serif text-2xl italic opacity-40 mb-12">Terima Kasih</p>
        <p className="text-[10px] tracking-[4px] uppercase opacity-30">Arunika & Baskara • 2026</p>
      </section>
    </div>
  );
}

