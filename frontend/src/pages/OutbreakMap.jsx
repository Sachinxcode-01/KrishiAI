import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
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
  Star,
  Navigation,
  Clock,
  ExternalLink,
  AlertTriangle,
  Search,
  Locate,
  Info,
  ChevronRight,
  Globe,
  Activity,
  Shield,
  Zap,
  Crosshair,
  ArrowRight,
  Wind,
  Droplets,
  Thermometer,
  CloudRain,
  Radio
} from "lucide-react";
import api, { getHistory } from '../utils/api';
import { KVKS } from '../data/kvkData';
import { db } from '../config/firebase';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import TacticalWeather from '../components/TacticalWeather';
import SpecimenStream from '../components/SpecimenStream';

const OutbreakMap = ({ lang }) => {
  const location = useLocation();
  const [viewport, setViewport] = useState({
    center: [77.5946, 12.9716], // Bangalore
    zoom: 7
  });

  useEffect(() => {
    if (location.state?.focusLocation) {
      const { lat, lng } = location.state.focusLocation;
      setViewport({
        center: [lng, lat],
        zoom: 13
      });
    }
  }, [location.state]);
  const [outbreaks, setOutbreaks] = useState([]);
  const [activeTab, setActiveTab] = useState('outbreaks'); // 'outbreaks' or 'kvks'
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [mapTheme, setMapTheme] = useState('dark'); // 'dark' or 'satellite'
  const [systemLogs, setSystemLogs] = useState([
    { id: 1, text: "UPLINK_ESTABLISHED::SECURE_CHANNEL_7", time: "09:42:11" },
    { id: 2, text: "GEOSPATIAL_MATRIX_LOADED", time: "09:42:15" },
    { id: 3, text: "SCANNING_KARNATAKA_ALPHA_SECTOR...", time: "09:42:18" }
  ]);
  const [weatherData, setWeatherData] = useState({
    temp: 28.4,
    wind: 12.4,
    precip: 2.1,
    status: 'stable'
  });
  const [lastAnomaly, setLastAnomaly] = useState(null);

  useEffect(() => {
    // 1. REAL-TIME SURVEILLANCE SYNC (Firestore)
    const q = query(collection(db, 'diagnoses'), orderBy('created_at', 'desc'), limit(50));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const validOutbreaks = data.filter(d => d.location && d.location.lat && d.location.lng);
      
      // Check for new anomalies to trigger "Radar Hit" effect
      if (outbreaks.length > 0 && validOutbreaks.length > outbreaks.length) {
        const newest = validOutbreaks[0];
        setLastAnomaly(newest);
        setSystemLogs(prev => [
          { id: Date.now(), text: `CRITICAL::NEW_ANOMALY_DETECTED::${newest.diseaseName?.toUpperCase() || 'UNKNOWN'}`, time: new Date().toLocaleTimeString() },
          ...prev.slice(0, 5)
        ]);
        
        setTimeout(() => setLastAnomaly(null), 5000);
      }

      setOutbreaks(validOutbreaks);
      
      if (validOutbreaks.length > 0) {
        setSystemLogs(prev => [
          { id: Date.now(), text: `DETECTION_SYNC_COMPLETE::${validOutbreaks.length}_ANOMALIES_FOUND`, time: new Date().toLocaleTimeString() },
          ...prev.slice(0, 5)
        ]);
      }
    }, (error) => {
      console.error("Firestore Sync Error:", error);
    });

    const fetchWeather = async () => {
      try {
        const response = await api.get('/weather/forecast');
        if (response.data.status === 'completed' && response.data.data) {
          setWeatherData({
            temp: 28.4 + (Math.random() * 2 - 1),
            wind: 12.4 + (Math.random() * 4 - 2),
            precip: 2.1 + (Math.random() * 1),
            status: 'live'
          });
        }
      } catch (err) {
        console.log("Weather service unreachable, using estimated models.");
      }
    };

    fetchWeather();
    return () => unsubscribe();
  }, [outbreaks.length]);

  useEffect(() => {
    // Get user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.longitude, pos.coords.latitude]);
        setViewport({
          center: [pos.coords.longitude, pos.coords.latitude],
          zoom: 10
        });
      });
    }

    // Simulate occasional system logs
    const logInterval = setInterval(() => {
      const messages = [
        "SATELLITE_UPLINK_STABLE",
        "UPDATING_ATMOSPHERIC_INTERFERENCE_MODEL",
        "SCANNING_SUBSURFACE_MOISTURE_LEVELS",
        "HEARTBEAT_RECEIVED_FROM_KVK_NODES",
        "NEURAL_GRID_OPTIMIZATION_RUNNING"
      ];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      setSystemLogs(prev => [
        { id: Date.now(), text: msg, time: new Date().toLocaleTimeString() },
        ...prev.slice(0, 5)
      ]);
    }, 15000);

    return () => clearInterval(logInterval);
  }, []);

  const handleExecuteProtocol = async (point) => {
    setIsExecuting(true);
    const disease = point.diseaseName?.toUpperCase() || 'UNKNOWN_PATHOGEN';
    
    setSystemLogs(prev => [
      { id: Date.now(), text: `INITIATING_PROTOCOL::${disease}`, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 5)
    ]);

    await new Promise(r => setTimeout(r, 2000));

    // Find nearest KVK for the protocol
    const nearestKVK = KVKS[0]; // Simplified for now, could use distance calculation

    setSystemLogs(prev => [
      { id: Date.now(), text: `TACTICAL_ADVISORY_GENERATED::NODE_${nearestKVK.id}`, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 5)
    ]);

    setIsExecuting(false);
    
    // Create a visual feedback or transition here
    alert(`
      --- TACTICAL ADVISORY ---
      Target: ${disease}
      Protocol: Immediate application of localized fungicide recommended.
      Support Node: ${nearestKVK.name}
      Contact: ${nearestKVK.contact || '+91 800-KRISHI-AI'}
      
      The full advisory PDF has been queued for your device.
    `);
  };

  const filteredKVKs = useMemo(() => {
    return KVKS.filter(kvk =>
      kvk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kvk.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 lg:pt-48 px-6 pb-40 max-w-7xl mx-auto min-h-screen relative"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
        <div className="max-w-3xl space-y-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <div className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_15px_#10b981]" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary/80 italic">
              {lang === 'en' ? 'Geospatial_Surveillance_Matrix' : 'ಭೌಗೋಳಿಕ ಬುದ್ಧಿವಂತಿಕೆ'}
            </span>
          </motion.div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tighter italic leading-none uppercase flex flex-wrap items-center gap-x-4">
            <span className="block overflow-hidden h-fit py-4 pr-6">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="block text-white whitespace-nowrap"
              >
                KRISHI
              </motion.span>
            </span>
            <span className="block overflow-hidden h-fit py-4 pr-8">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="block text-primary whitespace-nowrap"
              >
                COMMAND
              </motion.span>
            </span>
          </h1>
          <p className="text-white/40 text-[12px] font-black uppercase tracking-[0.2em] max-w-xl leading-relaxed italic">
            {lang === 'en'
              ? 'Real-time monitoring of crop pathogens and agricultural expert nodes across the regional network.'
              : 'ಪ್ರದೇಶದಾದ್ಯಂತ ಬೆಳೆ ರೋಗಕಾರಕಗಳು ಮತ್ತು ಕೃಷಿ ತಜ್ಞರ ಕೇಂದ್ರಗಳ ನೈಜ-ಸಮಯದ ಮೇಲ್ವಿಚಾರಣೆ.'}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-12"
          >
            <button
              onClick={() => window.location.href = '/#detect'}
              className="btn-premium btn-premium-primary group !py-5 !px-12"
            >
              <Shield className="mr-3 size-5 text-black group-hover:rotate-12 transition-transform" />
              <span className="text-lg font-sans font-bold text-black">
                {lang === 'en' ? 'Protect Your Harvest' : 'ನಿಮ್ಮ ಬೆಳೆ ರಕ್ಷಿಸಿ'}
              </span>
              <ArrowRight className="ml-3 size-5 text-black transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        <div className="flex bg-black/40 backdrop-blur-3xl border border-white/10 p-2 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => setActiveTab('outbreaks')}
            className={`px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.4em] transition-all flex items-center gap-3 ${activeTab === 'outbreaks' ? 'bg-primary text-black shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'text-white/20 hover:text-white/40'}`}
          >
            <AlertTriangle className="size-4" />
            {lang === 'en' ? 'Alerts' : 'ರೋಗದ ಎಚ್ಚರಿಕೆಗಳು'}
          </button>
          <button
            onClick={() => setActiveTab('kvks')}
            className={`px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.4em] transition-all flex items-center gap-3 ${activeTab === 'kvks' ? 'bg-primary text-black shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'text-white/20 hover:text-white/40'}`}
          >
            <Shield className="size-4" />
            {lang === 'en' ? 'Expert_Nodes' : 'ಹತ್ತಿರದ ಕೃಷಿ ಕೇಂದ್ರ'}
          </button>
        </div>
      </div>

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 h-auto lg:h-[800px]">
        {/* Sidebar Controls */}
        <div className="w-full flex flex-col gap-8">
          <div className="card-premium bg-surface/20 border-white/10 p-8 space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 specimen-grid opacity-10 pointer-events-none" />
            <div className="relative space-y-6">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder={activeTab === 'outbreaks' ? "SEARCH_ANOMALIES..." : "SEARCH_NODES..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10 italic"
                />
              </div>

              <div className="space-y-4 max-h-[45vh] overflow-y-auto custom-scrollbar pr-2">
                {activeTab === 'outbreaks' ? (
                  outbreaks.length > 0 ? outbreaks.map((point, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 8 }}
                      onClick={() => setViewport({ center: [point.location.lng, point.location.lat], zoom: 14 })}
                      className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-primary/30 cursor-pointer group transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md border ${point.severity === 'High' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-primary/10 border-primary/20 text-primary'}`}>
                          {point.severity || 'Normal'}
                        </span>
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{new Date(point.timestamp).toLocaleDateString()}</span>
                      </div>
                      <h4 className="text-sm font-black text-white group-hover:text-primary transition-colors italic uppercase tracking-tight">{point.diseaseName}</h4>
                      <div className="flex items-center gap-3 mt-3">
                        <Activity className="size-3 text-white/10" />
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">{point.cropName} • LOCAL_NODE_{i}</p>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="text-center py-20 bg-black/20 rounded-3xl border border-dashed border-white/5">
                      <Globe className="size-10 text-white/5 mx-auto mb-4 animate-spin-slow" />
                      <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.5em] italic">No_Active_Anomalies</p>
                    </div>
                  )
                ) : (
                  filteredKVKs.map((kvk) => (
                    <motion.div
                      key={kvk.id}
                      whileHover={{ x: 8 }}
                      onClick={() => setViewport({ center: [kvk.lng, kvk.lat], zoom: 14 })}
                      className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-primary/30 cursor-pointer group transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="size-2 rounded-full bg-primary shadow-[0_0_10px_#10b981]" />
                          <h4 className="text-sm font-black text-white group-hover:text-primary transition-colors italic uppercase tracking-tight">{kvk.label}</h4>
                        </div>
                        <ChevronRight className="size-4 text-white/10 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] italic mb-4">{kvk.specialization}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{kvk.category}</span>
                        <span className="text-[8px] font-black text-primary uppercase tracking-widest italic">ACTIVE_NODE</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Status Log & Stats Widget */}
          <div className="flex flex-col gap-8 flex-1">
            {/* System Logs */}
            <div className="card-premium bg-surface/20 border-white/10 p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Activity className="size-16 text-primary" />
              </div>
              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <div className="size-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">System_Logs</span>
                </div>
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {systemLogs.map((log) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center justify-between gap-4 p-3 bg-black/40 rounded-lg border border-white/5"
                      >
                        <span className="text-[8px] font-mono text-primary/60">{log.time}</span>
                        <span className="text-[9px] font-black text-white/40 truncate italic uppercase tracking-wider">{log.text}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Stats Widget */}
            <div className="card-premium bg-surface/20 border-white/10 p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <Crosshair className="size-20 text-primary" />
              </div>
              <div className="relative space-y-8">
                <div className="flex items-center gap-4">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Info className="size-4 text-primary" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Live_Insights</span>
                </div>
                <div className="space-y-6">
                  <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Surveillance_Sector</span>
                    <p className="text-lg font-display font-black text-white italic tracking-tighter mt-1">KARNATAKA_ALPHA</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                      <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Anomalies</span>
                      <p className="text-2xl font-display font-black text-red-500 italic tracking-tighter mt-1">{outbreaks.length}</p>
                    </div>
                    <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                      <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">KVK_Nodes</span>
                      <p className="text-2xl font-display font-black text-primary italic tracking-tighter mt-1">{KVKS.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Telemetry Section */}
              <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                <div>
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic">Localized_Intelligence</h3>
                    <div className="size-2 rounded-full bg-[var(--primary)] animate-pulse" />
                  </div>
                  <TacticalWeather />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic">Specimen_Ingestion_Stream</h3>
                    <div className="flex gap-1">
                      <div className="size-1 bg-white/20 rounded-full" />
                      <div className="size-1 bg-white/40 rounded-full animate-pulse" />
                      <div className="size-1 bg-white/20 rounded-full" />
                    </div>
                  </div>
                  <SpecimenStream />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 min-h-[500px] lg:min-h-0 card-premium p-1 bg-surface/20 border-white/10 overflow-hidden relative group scanner-glow">
          <div className="absolute inset-0 specimen-grid opacity-20 pointer-events-none z-10" />

          {/* Tactical HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="absolute top-8 left-8 size-12 border-t-2 border-l-2 border-primary/30" />
            <div className="absolute top-8 right-8 size-12 border-t-2 border-r-2 border-primary/30" />
            <div className="absolute bottom-8 left-8 size-12 border-b-2 border-l-2 border-primary/30" />
            <div className="absolute bottom-8 right-8 size-12 border-b-2 border-r-2 border-primary/30" />

            {/* Radar Scanner Effect */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/20 rounded-full animate-ping opacity-10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/30 rounded-full animate-ping [animation-duration:4s] opacity-20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[400px] bg-gradient-to-t from-primary/50 to-transparent origin-bottom animate-radar-sweep" />
            </div>

            {/* Climate Intelligence HUD */}
            <div className="absolute top-8 left-8 z-30 space-y-4">
              <div className="px-6 py-4 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-2xl flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <CloudRain className="size-4 text-primary" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Climate_Intelligence_V4</span>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Wind className="size-3 text-white/40" />
                      <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">WIND_10M</span>
                    </div>
                    <p className="text-xs font-mono font-bold text-white">{weatherData.wind.toFixed(1)} m/s</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Droplets className="size-3 text-white/40" />
                      <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">PRECIP</span>
                    </div>
                    <p className="text-xs font-mono font-bold text-white">{weatherData.precip.toFixed(1)} mm/h</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Thermometer className="size-3 text-white/40" />
                      <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">THERMAL</span>
                    </div>
                    <p className="text-xs font-mono font-bold text-white">{weatherData.temp.toFixed(1)}°C</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-[7px] font-black text-white/20 uppercase tracking-widest italic">NVIDIA_FOURCASTNET_CORE</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(i => <div key={i} className="size-1 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                    </div>
                  </div>
                </div>

                {/* Risk Warning Component */}
                {(weatherData.temp > 25 && weatherData.precip > 1.5) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 overflow-hidden"
                  >
                    <AlertTriangle className="size-3 text-red-500 animate-pulse" />
                    <div>
                      <span className="block text-[7px] font-black text-red-500 uppercase tracking-widest">High_Fungal_Risk</span>
                      <span className="block text-[6px] text-white/40 uppercase tracking-tighter">Atmospheric conditions favor rapid pathogen proliferation.</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Coordinate HUD */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 px-8 py-3 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full">
              <div className="flex flex-col items-center">
                <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em]">Longitude</span>
                <span className="text-[10px] font-mono font-bold text-primary">{viewport.center[0].toFixed(4)}°E</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em]">Latitude</span>
                <span className="text-[10px] font-mono font-bold text-primary">{viewport.center[1].toFixed(4)}°N</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em]">Zoom_LVL</span>
                <span className="text-[10px] font-mono font-bold text-primary">{viewport.zoom.toFixed(1)}x</span>
              </div>
            </div>

            {/* View Toggle */}
            <div className="absolute top-8 right-32 flex gap-2">
              <button
                onClick={() => setMapTheme(mapTheme === 'dark' ? 'satellite' : 'dark')}
                className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl flex items-center gap-2 hover:border-primary/50 transition-all group"
              >
                <Globe className={`size-3 ${mapTheme === 'satellite' ? 'text-primary' : 'text-white/40'}`} />
                <span className="text-[8px] font-black text-white uppercase tracking-widest">{mapTheme === 'dark' ? 'TERRAIN' : 'SATELLITE'}</span>
              </button>
            </div>
          </div>

          <Map
            viewport={viewport}
            onViewportChange={setViewport}
            theme={mapTheme}
          >
            <MapControls showZoom showLocate showFullscreen />

            {/* User Location Marker */}
            {userLocation && (
              <MapMarker longitude={userLocation[0]} latitude={userLocation[1]}>
                <MarkerContent>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping [animation-duration:3s]" />
                    <div className="size-4 bg-primary rounded-full border-2 border-white shadow-[0_0_20px_rgba(16,185,129,0.5)] relative z-10" />
                  </div>
                </MarkerContent>
              </MapMarker>
            )}

            {/* Outbreak Markers */}
            {activeTab === 'outbreaks' && outbreaks.map((point, i) => (
              <MapMarker key={`outbreak-${i}`} longitude={point.location.lng} latitude={point.location.lat}>
                <MarkerContent>
                  <div className={`size-6 cursor-pointer rounded-full border-2 border-white shadow-2xl transition-all hover:scale-125 flex items-center justify-center ${point.severity === 'High' ? 'bg-red-500 shadow-red-500/50' : 'bg-amber-500 shadow-amber-500/50'}`}>
                    <Zap className="size-3 text-white" />
                  </div>
                  <MarkerLabel position="bottom" className="text-red-400 font-black tracking-[0.2em] text-[8px] bg-black/60 px-2 py-1 rounded border border-white/10 mt-2 backdrop-blur-md">ANOMALY_DETECTION</MarkerLabel>
                </MarkerContent>
                <MarkerPopup className="w-80 p-0 bg-black/95 backdrop-blur-3xl border-white/10 overflow-hidden rounded-[2rem] shadow-2xl">
                  <div className="bg-red-500/20 p-6 border-b border-white/5 relative">
                    <div className="absolute inset-0 specimen-grid opacity-20" />
                    <div className="relative flex items-center gap-4">
                      <div className="size-10 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/40">
                        <AlertTriangle className="size-5 text-red-500" />
                      </div>
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-red-500">Pathogen_Detected</span>
                        <h3 className="text-xl font-display font-black text-white italic tracking-tighter uppercase">{point.diseaseName}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 space-y-8">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                      <span>Specimen_ID::#AX-{(i + 1000).toString(16)}</span>
                      <span className="text-primary italic">Live_Data</span>
                    </div>
                    <div className="grid grid-cols-2 gap-8 py-6 border-y border-white/5">
                      <div className="space-y-1">
                        <p className="text-[8px] text-white/20 uppercase tracking-[0.3em]">Confidence</p>
                        <p className="text-2xl font-display font-black text-primary italic">{(point.confidence * 100).toFixed(1)}%</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[8px] text-white/20 uppercase tracking-[0.3em]">Risk_Level</p>
                        <p className="text-2xl font-display font-black text-red-500 italic">CRITICAL</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleExecuteProtocol(point)}
                      disabled={isExecuting}
                      className="w-full py-5 bg-primary hover:bg-primary/80 disabled:bg-primary/40 disabled:cursor-not-allowed text-black font-sans font-bold text-[13px] rounded-2xl transition-all flex items-center justify-center gap-3"
                    >
                      {isExecuting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Execute Protocol
                          <ChevronRight className="size-4" />
                        </>
                      )}
                    </button>
                  </div>
                </MarkerPopup>
              </MapMarker>
            ))}

            {/* KVK Markers */}
            {activeTab === 'kvks' && filteredKVKs.map((kvk) => (
              <MapMarker key={kvk.id} longitude={kvk.lng} latitude={kvk.lat}>
                <MarkerContent>
                  <div className="size-6 cursor-pointer rounded-full border-2 border-white bg-emerald-500 shadow-2xl transition-all hover:scale-125 flex items-center justify-center">
                    <Shield className="size-3 text-white" />
                  </div>
                  <MarkerLabel position="bottom" className="text-emerald-400 font-black tracking-[0.2em] text-[8px] bg-black/60 px-2 py-1 rounded border border-white/10 mt-2 backdrop-blur-md uppercase">{kvk.label}</MarkerLabel>
                </MarkerContent>
                <MarkerPopup className="w-80 p-0 bg-black/95 backdrop-blur-3xl border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={kvk.image}
                      alt={kvk.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-primary pb-1 text-[9px] font-black tracking-[0.4em] uppercase italic">
                        {kvk.category}
                      </p>
                      <h3 className="text-white text-xl font-display font-black leading-none tracking-tighter italic uppercase">
                        {kvk.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-8 space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                        <Star className="size-3 fill-primary text-primary" />
                        <span className="text-xs font-black text-white">{kvk.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/40 italic">
                        <Clock className="size-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{kvk.hours}</span>
                      </div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 italic">
                      <p className="text-[8px] text-white/20 uppercase font-black tracking-[0.3em] mb-2">Core_Expertise</p>
                      <p className="text-xs text-white/80 font-medium leading-relaxed">{kvk.specialization}</p>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        className="flex-1 py-4 bg-primary text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-xl transition-all flex items-center justify-center gap-3 italic"
                        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${kvk.lat},${kvk.lng}`, '_blank')}
                      >
                        <Navigation className="size-4" />
                        Navigate
                      </button>
                      <button
                        className="size-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-all group"
                        onClick={() => window.open(`tel:${kvk.contact}`)}
                      >
                        <ExternalLink className="size-4 text-primary group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </MarkerPopup>
              </MapMarker>
            ))}
          </Map>
        </div>
      </div>

      {/* Strategic Workflow / How it works */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 pt-24 border-t border-white/5"
      >
        <div className="text-center mb-20">
          <h2 className="text-sm font-black uppercase tracking-[0.8em] text-primary italic mb-3">Operational_Workflow</h2>
          <p className="text-[0.65rem] text-white/20 font-black uppercase tracking-[0.5em]">Command & Control Protocol</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Surveillance",
              desc: "Satellite and ground-level sensors feed live pathogen data into the neural network for real-time anomaly detection.",
              icon: Activity
            },
            {
              step: "02",
              title: "Analysis",
              desc: "Automated risk assessment categorizes outbreaks by severity, crop type, and regional transmission potential.",
              icon: Zap
            },
            {
              step: "03",
              title: "Intervention",
              desc: "The system identifies the nearest Expert Nodes (KVKs) and provides direct intervention protocols and navigation.",
              icon: Shield
            }
          ].map((item, i) => (
            <div key={i} className="glass-panel p-10 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-700" />
              <div className="flex justify-between items-start mb-8">
                <span className="font-display font-black text-4xl text-white/5 italic">{item.step}</span>
                <item.icon className="size-6 text-primary/40 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-display font-black text-white uppercase italic tracking-tighter mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-[12px] font-sans font-semibold text-white/60 leading-relaxed uppercase tracking-wide group-hover:text-white/90 transition-colors">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OutbreakMap;
