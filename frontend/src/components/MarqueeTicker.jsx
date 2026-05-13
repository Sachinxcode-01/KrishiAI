export default function MarqueeTicker({ lang }) {
  const items = [
    { label: lang === 'en' ? "SYSTEM_LOAD" : "ಸಿಸ್ಟಮ್_ಲೋಡ್", value: "32%" },
    { label: lang === 'en' ? "ANOMALIES_DETECTED" : "ಪತ್ತೆಯಾದ_ರೋಗಗಳು", value: "1,204" },
    { label: lang === 'en' ? "KVK_NODES_ACTIVE" : "ಸಕ್ರಿಯ_ನೋಡ್‌ಗಳು", value: "84" },
    { label: lang === 'en' ? "NEURAL_LINK" : "ನ್ಯೂರಲ್_ಲಿಂಕ್", value: lang === 'en' ? "ESTABLISHED" : "ಸ್ಥಾಪಿಸಲಾಗಿದೆ" },
    { label: lang === 'en' ? "REGION" : "ಪ್ರದೇಶ", value: lang === 'en' ? "KARNATAKA_SURVEILLANCE" : "ಕರ್ನಾಟಕ_ಕಣ್ಗಾವಲು" },
    { label: lang === 'en' ? "DATA_PACKETS" : "ಡೇಟಾ_ಪ್ಯಾಕೆಟ್‌ಗಳು", value: lang === 'en' ? "TRANSCEIVING" : "ರವಾನಿಸಲಾಗುತ್ತಿದೆ" },
    { label: "ಕೃಷಿ AI", value: lang === 'en' ? "READY" : "ಸಿದ್ಧವಾಗಿದೆ" }
  ];

  return (
    <div className="border-y border-white/5 bg-[#020B06] py-4 overflow-hidden relative">
      {/* Absolute Perfection: Scan lines for the ticker */}
      <div className="absolute inset-0 scanner-overlay opacity-10 pointer-events-none z-10" />
      
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-16 px-8">
            {items.map((item, j) => (
              <div key={j} className="flex items-center gap-4">
                <span className="font-mono text-[0.65rem] font-bold text-[var(--muted)] uppercase tracking-[0.2em]">
                  [{item.label}]
                </span>
                <span className={`font-display font-black text-xs text-white uppercase tracking-tighter ${lang === 'kn' ? 'font-kannada' : ''}`}>
                  {item.value}
                </span>
                <div className="size-1 bg-[var(--primary)]/30 rounded-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
