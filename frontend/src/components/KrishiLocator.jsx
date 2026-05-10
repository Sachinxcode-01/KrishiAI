import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, 
  MapMarker, 
  MarkerContent, 
  MarkerLabel, 
  MarkerPopup,
  MapControls 
} from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { 
  Navigation, 
  Clock, 
  ExternalLink, 
  Star,
  X,
  Target,
  Wifi,
  SignalHigh,
  Cpu
} from "lucide-react";

// Professional KVK Data
const KVKS = [
  {
    id: 'kvk-1',
    name: "ICAR-KVK Bengaluru (Hebbal)",
    label: "KVK Hebbal",
    category: "Research Center",
    rating: 4.8,
    reviews: 1240,
    hours: "9:00 AM - 5:30 PM",
    image: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?w=400&h=300&fit=crop",
    lng: 77.5855,
    lat: 13.0336,
    specialization: "Seed Technology & Horticulture",
    contact: "080-23413931",
    dist: "4.2km",
    signal: 98
  },
  {
    id: 'kvk-2',
    name: "KVK Mysore (Naganahalli)",
    label: "KVK Mysore",
    category: "Krishi Vigyan Kendra",
    rating: 4.6,
    reviews: 890,
    hours: "9:30 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c3c1b?w=400&h=300&fit=crop",
    lng: 76.6570,
    lat: 12.3551,
    specialization: "Organic Farming & Soil Health",
    contact: "0821-2591208",
    dist: "12.8km",
    signal: 82
  },
  {
    id: 'kvk-3',
    name: "KVK Mandya (V.C. Farm)",
    label: "KVK Mandya",
    category: "Krishi Vigyan Kendra",
    rating: 4.7,
    reviews: 1100,
    hours: "9:00 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=400&h=300&fit=crop",
    lng: 76.8967,
    lat: 12.5273,
    specialization: "Sugarcane & Rice Management",
    contact: "08232-277473",
    dist: "24.1km",
    signal: 75
  }
];

const KrishiLocator = ({ lang, onClose }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [viewport, setViewport] = useState({
    center: [77.5946, 12.9716],
    zoom: 11
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = [position.coords.longitude, position.coords.latitude];
          setUserLocation(loc);
          setViewport({
            center: loc,
            zoom: 12
          });
        },
        () => {
          setUserLocation([77.5946, 12.9716]);
        }
      );
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 backdrop-blur-3xl bg-black/80"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 30 }}
        className="w-full max-w-7xl h-[85vh] bg-[#0a0a0a] rounded-[3rem] border border-white/10 flex flex-col overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,0.9)]"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-[110] w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-black transition-all duration-500 hover:scale-110"
        >
          <X className="size-6" />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Sidebar - Tactical Node List */}
          <div className="w-full md:w-96 p-10 flex flex-col gap-10 border-r border-white/5 bg-black/40 overflow-y-auto custom-scrollbar relative">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-5 rounded-md overflow-hidden">
                  <img src="/krishiAI.png" alt="Krishi AI" className="w-full h-full object-contain" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Intelligence Nodes</span>
              </div>
              <h2 className="text-4xl font-display font-black text-white italic tracking-tighter">
                Krishi <span className="text-primary italic">Locator</span>
              </h2>
            </div>

            <div className="space-y-6">
              {KVKS.map((kvk) => (
                <motion.button
                  key={kvk.id}
                  whileHover={{ x: 10 }}
                  onClick={() => setViewport({ center: [kvk.lng, kvk.lat], zoom: 14 })}
                  className="w-full text-left p-6 rounded-[2rem] border bg-surface/5 border-white/5 hover:border-primary/40 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Wifi className="size-10 text-white" />
                  </div>

                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{kvk.dist} range</span>
                    <div className="flex items-center gap-1.5">
                      <SignalHigh className="size-3 text-primary" />
                      <span className="text-[9px] font-black text-white uppercase">{kvk.signal}%</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-display font-black text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{kvk.name}</h4>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      <Star className="text-amber-400 size-3 fill-amber-400" />
                      <span className="text-xs text-white/80 font-black">{kvk.rating}</span>
                    </div>
                    <div className="size-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 transition-all">
                      <Navigation className="size-3.5 text-muted group-hover:text-primary" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-auto p-6 rounded-[1.5rem] bg-primary/5 border border-primary/20 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
              <div className="flex items-center gap-3 mb-3">
                <Cpu className="size-4 text-primary" />
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em]">Network Integrity</p>
              </div>
              <p className="text-sm text-white/80 font-medium leading-relaxed relative z-10 italic">
                {lang === 'en' ? 'Scanning nearby ICAR nodes... Connection stable. All centers reported active for consultation.' : 'ಎಲ್ಲಾ ಕೆವಿಕೆ ಕೇಂದ್ರಗಳು ಸಕ್ರಿಯವಾಗಿವೆ.'}
              </p>
            </div>
          </div>

          {/* Map Area - Radar Style */}
          <div className="flex-1 relative bg-[#050505]">
            <Map 
              viewport={viewport} 
              onViewportChange={setViewport}
              theme="dark"
            >
              <MapControls showZoom showLocate showFullscreen />

              {/* User Marker - Radar Pulse */}
              {userLocation && (
                <MapMarker longitude={userLocation[0]} latitude={userLocation[1]}>
                  <MarkerContent>
                    <div className="relative">
                      <div className="absolute inset-0 size-8 bg-primary/40 rounded-full animate-ping" />
                      <div className="size-6 bg-primary rounded-full border-4 border-white shadow-[0_0_30px_#10b981] relative z-10" />
                    </div>
                  </MarkerContent>
                </MapMarker>
              )}

              {/* KVK Markers - Tactical Pins */}
              {KVKS.map((kvk) => (
                <MapMarker key={kvk.id} longitude={kvk.lng} latitude={kvk.lat}>
                  <MarkerContent>
                    <div className="group/marker relative cursor-pointer">
                      <div className="size-10 rounded-[1rem] bg-black border-2 border-primary flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(16,185,129,0.5)] transition-all group-hover/marker:scale-110 group-hover/marker:rotate-12">
                        <Navigation className="size-5 text-primary" />
                      </div>
                      <MarkerLabel position="bottom" className="text-primary font-display font-black uppercase tracking-widest text-[10px] pt-3">{kvk.label}</MarkerLabel>
                    </div>
                  </MarkerContent>
                  <MarkerPopup className="w-80 p-0 bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] rounded-[2rem] overflow-hidden translate-y-[-20px]">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={kvk.image}
                        alt={kvk.name}
                        className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                      <div className="absolute bottom-5 left-6 right-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                          <p className="text-primary text-[9px] font-black tracking-[0.3em] uppercase">
                            {kvk.category}
                          </p>
                        </div>
                        <h3 className="text-white text-xl font-display font-black leading-tight tracking-tighter uppercase italic">
                          {kvk.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="size-4 fill-amber-400 text-amber-400" />
                          <span className="font-black text-white text-lg tracking-tight">{kvk.rating}</span>
                          <span className="text-[10px] text-muted font-bold tracking-widest">/ {kvk.reviews.toLocaleString()} UNITS</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                          <Clock className="size-3 text-muted" />
                          <span className="text-[9px] font-black text-white uppercase tracking-widest">{kvk.hours}</span>
                        </div>
                      </div>
                      
                      <div className="bg-surface/10 p-5 rounded-[1.5rem] border border-white/5 relative overflow-hidden group/card">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                          <Target className="size-8 text-primary" />
                        </div>
                        <p className="text-[9px] text-primary uppercase font-black tracking-widest mb-2">Node Specialization</p>
                        <p className="text-sm text-white/80 font-medium leading-relaxed italic">{kvk.specialization}</p>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          className="flex-[2] h-14 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-[0_15px_30px_-10px_rgba(16,185,129,0.5)] group/btn" 
                          onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${kvk.lat},${kvk.lng}`, '_blank')}
                        >
                          <Navigation className="size-4 mr-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          Initiate Route
                        </Button>
                        <Button 
                          variant="outline" 
                          className="size-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10" 
                          onClick={() => window.open(`tel:${kvk.contact}`)}
                        >
                          <ExternalLink className="size-5 text-primary" />
                        </Button>
                      </div>
                    </div>
                  </MarkerPopup>
                </MapMarker>
              ))}
              
              {/* Tactical Overlay Effect */}
              <div className="absolute inset-0 pointer-events-none border-[40px] border-black/20 mix-blend-overlay" />
              <div className="absolute top-10 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black text-primary uppercase tracking-[0.5em] z-50">
                Scanning Geospatial Intelligence
              </div>
            </Map>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default KrishiLocator;


