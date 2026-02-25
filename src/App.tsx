import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Cloud, Sparkles, Music, Music2 } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Components ---

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Clouds */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: '100vw', opacity: 0.4 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 text-white"
      >
        <Cloud size={100} fill="currentColor" />
      </motion.div>
      <motion.div 
        initial={{ x: '100vw', opacity: 0 }}
        animate={{ x: -200, opacity: 0.3 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 text-white"
      >
        <Cloud size={150} fill="currentColor" />
      </motion.div>
      <motion.div 
        initial={{ x: -150, opacity: 0 }}
        animate={{ x: '100vw', opacity: 0.2 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute bottom-20 text-white"
      >
        <Cloud size={120} fill="currentColor" />
      </motion.div>

      {/* Hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + 'vw', 
            y: '110vh', 
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0 
          }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 0.6, 0],
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute text-romantic-accent"
        >
          <Heart size={24} fill="currentColor" />
        </motion.div>
      ))}

      {/* Sparkles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{ 
            x: Math.random() * 100 + 'vw', 
            y: Math.random() * 100 + 'vh',
            scale: 0,
            opacity: 0 
          }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity, 
            delay: Math.random() * 5,
          }}
          className="absolute text-yellow-200"
        >
          <Sparkles size={16} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Note: In a real app, we'd have a source. Using a placeholder logic.
  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you'd play an actual audio file here.
    // Since we can't easily bundle assets, we'll just show the UI state.
  };

  return (
    <button 
      onClick={toggleMusic}
      className="fixed top-6 right-6 z-50 p-3 glass-card text-romantic-accent hover:scale-110 transition-transform"
    >
      {isPlaying ? <Music2 size={24} /> : <Music size={24} />}
    </button>
  );
};

// --- Pages ---

const WelcomePage = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 relative"
    >
      <div className="glass-card p-10 max-w-lg w-full space-y-8">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <Heart size={64} className="text-romantic-accent" fill="currentColor" />
        </motion.div>
        
        <h1 className="font-cursive text-4xl md:text-5xl text-romantic-accent leading-tight">
          Hi Tuba ❤️
        </h1>
        
        <div className="space-y-4">
          <p className="text-xl font-medium text-gray-700">
            Wishing you a very Happy Birthday Day.
          </p>
          <p className="text-lg text-gray-600 italic">
            May Allah bless you always.
          </p>
          <p className="text-2xl font-elegant text-romantic-accent mt-4">
            اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ
          </p>
        </div>

        <button 
          onClick={onNext}
          className="mt-8 px-10 py-4 bg-romantic-accent text-white rounded-full font-bold text-xl shadow-lg hover:shadow-romantic-accent/50 hover:-translate-y-1 transition-all active:scale-95"
        >
          Enter
        </button>
      </div>
    </motion.div>
  );
};

const QuestionPage = ({ onNext, text }: { onNext: () => void, text: string }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  
  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoPosition({ x, y });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 relative"
    >
      <div className="glass-card p-10 max-w-lg w-full space-y-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
          {text}
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff80ab', '#fce4ec', '#f3e5f5']
              });
              onNext();
            }}
            className="px-10 py-4 bg-green-400 text-white rounded-full font-bold text-xl shadow-lg hover:bg-green-500 transition-colors w-full sm:w-auto"
          >
            YES
          </button>
          
          <motion.button 
            animate={{ x: noPosition.x, y: noPosition.y }}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            className="px-10 py-4 bg-red-400 text-white rounded-full font-bold text-xl shadow-lg w-full sm:w-auto cursor-default"
          >
            NO
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const FinalPage = () => {
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 relative"
    >
      <div className="glass-card p-10 max-w-2xl w-full space-y-8 overflow-y-auto max-h-[90vh]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="flex justify-center"
        >
          <div className="relative">
            <Heart size={80} className="text-romantic-accent" fill="currentColor" />
            <motion.div 
              animate={{ opacity: [0, 1, 0], scale: [1, 2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 text-romantic-accent/30"
            >
              <Heart size={80} fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>

        <h1 className="font-cursive text-5xl text-romantic-accent">Happy Birthday Tuba!</h1>
        
        <div className="prose prose-pink text-gray-700 text-lg leading-relaxed space-y-6 text-left font-light">
          <p>
            My dearest Tuba, on this special day, I want you to know how much you mean to me. 
            You are the light that brightens my darkest days and the warmth that fills my heart.
          </p>
          <p>
            Every moment spent with you is a treasure I hold dear. Your smile, your kindness, 
            and the way you see the world make me fall for you more every single day. 
            Allah has truly blessed me by bringing you into my life.
          </p>
          <p>
            I wish for you a year filled with laughter, success, and endless joy. 
            May all your dreams come true, and may we continue to create beautiful 
            memories together. You are, and will always be, the most beautiful soul I know.
          </p>
          <p className="text-center font-cursive text-3xl text-romantic-accent pt-4">
            I Love You Forever ❤️
          </p>
        </div>

        <div className="flex justify-center pt-6">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex gap-4"
          >
            <Sparkles className="text-yellow-400" />
            <Heart className="text-romantic-accent" fill="currentColor" size={20} />
            <Sparkles className="text-yellow-400" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const CountdownPage = ({ onFinish }: { onFinish: () => void }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target: February 26, 2026 at 00:00:00 (Local Time)
    const target = new Date(2026, 1, 26, 0, 0, 0).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(timer);
        // Trigger crackers
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#ee82ee']
        });
        setTimeout(() => {
          onFinish();
        }, 2000);
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 relative"
    >
      <div className="glass-card p-12 max-w-lg w-full space-y-10">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-romantic-accent"
        >
          <Heart size={48} fill="currentColor" className="mx-auto mb-4" />
        </motion.div>
        
        <h2 className="font-cursive text-4xl text-romantic-accent">Something special is coming...</h2>
        
        <div className="flex justify-center gap-4 md:gap-8">
          {[
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-4xl md:text-6xl font-bold text-gray-800 bg-white/50 rounded-2xl p-4 min-w-[80px] md:min-w-[100px] shadow-inner">
                {String(item.value).padStart(2, '0')}
              </div>
              <span className="text-sm uppercase tracking-widest text-gray-500 mt-2 font-semibold">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-gray-600 italic">Get ready for the magic, Tuba ❤️</p>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState(() => {
    // Target: February 26, 2026 at 00:00:00 (Local Time)
    const target = new Date(2026, 1, 26, 0, 0, 0).getTime();
    const now = new Date().getTime();
    return now < target ? 0 : 1;
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-romantic-pink via-romantic-lavender to-romantic-blue overflow-hidden">
      <FloatingElements />
      <MusicPlayer />
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {page === 0 && (
            <motion.div key="page0">
              <CountdownPage onFinish={() => setPage(1)} />
            </motion.div>
          )}
          {page === 1 && (
            <motion.div key="page1">
              <WelcomePage onNext={() => setPage(2)} />
            </motion.div>
          )}
          {page === 2 && (
            <motion.div key="page2">
              <QuestionPage 
                text="Tuba is the most beautiful girl Allah has ever made ❤️" 
                onNext={() => setPage(3)} 
              />
            </motion.div>
          )}
          {page === 3 && (
            <motion.div key="page3">
              <QuestionPage 
                text="Tuba sabse pyari hai 💖 Tuba se pyara koi nahi ❤️" 
                onNext={() => setPage(4)} 
              />
            </motion.div>
          )}
          {page === 4 && (
            <motion.div key="page4">
              <FinalPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Subtle Credit */}
      <footer className="fixed bottom-4 left-0 right-0 text-center text-gray-400 text-xs pointer-events-none">
        Made with ❤️ for Tuba
      </footer>
    </div>
  );
}
