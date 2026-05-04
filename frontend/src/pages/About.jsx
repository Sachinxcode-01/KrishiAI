import React from 'react';

const About = ({ lang }) => {
  return (
    <div className="pt-24 px-6 max-w-[420px] mx-auto min-h-screen animate-fade-in">
      <div className="card space-y-6">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl">
          🌱
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">
            {lang === 'en' ? 'About Krishi AI' : 'Krishi AI ಬಗ್ಗೆ'}
          </h2>
          <p className="text-sm text-text/60 leading-relaxed">
            {lang === 'en' 
              ? 'Krishi AI is an advanced agricultural tool designed to help Indian farmers detect crop diseases instantly using AI technology.' 
              : 'Krishi AI ಎನ್ನುವುದು AI ತಂತ್ರಜ್ಞಾನವನ್ನು ಬಳಸಿಕೊಂಡು ಬೆಳೆ ರೋಗಗಳನ್ನು ತಕ್ಷಣವೇ ಪತ್ತೆಹಚ್ಚಲು ಭಾರತೀಯ ರೈತರಿಗೆ ಸಹಾಯ ಮಾಡಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಮುಂದುವರಿದ ಕೃಷಿ ಸಾಧನವಾಗಿದೆ.'}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
            {lang === 'en' ? 'How it works' : 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ'}
          </h3>
          
          <ul className="space-y-4">
            {[
              { icon: '📸', en: 'Take a photo of the infected leaf.', kn: 'ರೋಗಪೀಡಿತ ಎಲೆಯ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ.' },
              { icon: '🧠', en: 'AI analyzes the image for diseases.', kn: 'AI ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.' },
              { icon: '💊', en: 'Get instant cure steps and medicine info.', kn: 'ತಕ್ಷಣದ ಪರಿಹಾರ ಮತ್ತು ಔಷಧಿ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.' }
            ].map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="text-xl">{step.icon}</span>
                <p className="text-sm text-text/80">
                  {lang === 'en' ? step.en : step.kn}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 pt-6 border-t border-white/5">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">
            {lang === 'en' ? 'Scientific Pedigree' : 'ವೈಜ್ಞಾನಿಕ ಆಧಾರ'}
          </h3>
          <p className="text-[10px] text-text/40 leading-relaxed uppercase font-bold tracking-widest">
            Inspired by & referencing global open-source research:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {['PlantVillage', 'PlantDoc', 'EfficientNet', 'TensorFlow Lite'].map((ref, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 p-2 rounded-lg text-[9px] font-bold text-text/60 text-center">
                {ref}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-text/40 font-bold uppercase tracking-widest">
            {lang === 'en' ? 'Developed for Karnataka Farmers' : 'ಕರ್ನಾಟಕದ ರೈತರಿಗಾಗಿ ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾಗಿದೆ'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
