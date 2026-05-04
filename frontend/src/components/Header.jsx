import React, { useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const Header = ({ lang, onToggleLang }) => {
  const t = translations[lang];
  const [user, setUser] = useState(null);

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
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/40 backdrop-blur-2xl border-b border-white/[0.05] py-5 px-6 flex items-center justify-center w-full">
      <div className="flex items-center justify-between w-full lg:max-w-[1200px]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-2xl shadow-inner shadow-primary/20">
            🌿
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white leading-none">
              Krishi <span className="text-primary italic">AI</span>
            </h1>
            <p className="text-[9px] text-primary font-black uppercase tracking-[0.2em] mt-1 opacity-70">
              {t.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-3 py-1.5">
              <img src={user.photoURL} alt="Profile" className="w-7 h-7 rounded-full" />
              <div className="hidden sm:block text-[10px] font-bold">
                <div className="text-white truncate max-w-[100px]">{user.displayName}</div>
                <button onClick={handleSignOut} className="text-primary/70 hover:text-primary transition-colors">
                  {lang === 'en' ? 'Sign Out' : 'ಲಾಗ್ ಔಟ್'}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30 rounded-2xl px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300"
            >
              {lang === 'en' ? 'Sign In' : 'ಸೈನ್ ಇನ್'}
            </button>
          )}

          <button
            onClick={onToggleLang}
            className="bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-2xl px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 active:scale-95"
          >
            <span className="hidden sm:inline">{lang === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
            <span className="text-primary text-xs">🌐</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
