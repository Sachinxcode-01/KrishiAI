export default function MarqueeTicker() {
  const items = [
    { label: "SYSTEM_LOAD", value: "32%" },
    { label: "ANOMALIES_DETECTED", value: "1,204" },
    { label: "KVK_NODES_ACTIVE", value: "84" },
    { label: "NEURAL_LINK", value: "ESTABLISHED" },
    { label: "REGION", value: "KARNATAKA_SURVEILLANCE" },
    { label: "DATA_PACKETS", value: "TRANSCEIVING" },
    { label: "ಕೃಷಿ AI", value: "ಸಿದ್ಧವಾಗಿದೆ" }
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
                <span className="font-display font-black text-xs text-white uppercase tracking-tighter">
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
