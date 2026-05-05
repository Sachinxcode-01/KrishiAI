import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../utils/translations';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const Header = ({ lang, onToggleLang }) => {
  const t = translations[lang];
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Successfully signed in:', result.user);
    } catch (error) {
      console.error('Firebase Auth Error:', error.code, error.message);
      alert(`Sign-in failed: ${error.message}`);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 flex items-center justify-center w-full ${
        scrolled 
          ? 'bg-background/60 backdrop-blur-3xl border-b border-white/[0.05] py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="flex items-center justify-between w-full lg:max-w-[1200px]">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="relative">
            <div className="w-11 h-11 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl shadow-inner shadow-primary/20 group-hover:bg-primary/20 transition-colors duration-500">
              🌿
            </div>
            <div className="absolute inset-0 bg-primary blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white leading-none">
              Krishi <span className="text-primary italic">AI</span>
            </h1>
            <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mt-1.5 opacity-60">
              {t.tagline}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <AnimatePresence mode="wait">
            {user ? (
              <motion.div 
                key="user"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-1.5 pr-4 group hover:bg-white/[0.06] transition-colors"
              >
                <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-xl shadow-lg" />
                <div className="hidden sm:block">
                  <div className="text-[11px] font-black text-white truncate max-w-[120px] uppercase tracking-wider">{user.displayName}</div>
                  <button onClick={handleSignOut} className="text-[9px] font-bold text-primary/60 hover:text-primary transition-colors uppercase tracking-widest">
                    {lang === 'en' ? 'Disconnect' : 'ಲಾಗ್ ಔಟ್'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="signin"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignIn}
                className="bg-primary text-background px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all"
              >
                {lang === 'en' ? 'Start Journey' : 'ಸೈನ್ ಇನ್'}
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleLang}
            className="bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 transition-all"
          >
            <span className="text-white hidden sm:inline">{lang === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
            <span className="text-primary text-base">🌐</span>
          </motion.button>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
