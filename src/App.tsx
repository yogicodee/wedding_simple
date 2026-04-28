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

      {/* Footer */}
      <section className="py-32 px-6 text-center">
        <p className="font-serif text-2xl italic opacity-40 mb-12">Terima Kasih</p>
        <p className="text-[10px] tracking-[4px] uppercase opacity-30">Arunika & Baskara • 2026</p>
      </section>
    </div>
  );
}

