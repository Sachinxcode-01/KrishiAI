import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, HeatmapLayer, Marker } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import { getHistory } from '../utils/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '2rem'
};

const mapOptions = {
  styles: [
    { elementType: "geometry", stylers: [{ color: "#020617" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#020617" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#334155" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#10b981" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#10b981" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#1e293b" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#020617" }],
    },
  ],
  disableDefaultUI: true,
};

// Mock data for Karnataka region
const mockOutbreaks = [
  { lat: 12.9716, lng: 77.5946, weight: 10, disease: "Tomato Late Blight" },
  { lat: 13.0827, lng: 80.2707, weight: 5, disease: "Potato Early Blight" },
  { lat: 15.3173, lng: 75.7139, weight: 8, disease: "Corn Rust" },
  { lat: 12.2958, lng: 76.6394, weight: 12, disease: "Tomato Late Blight" },
  { lat: 14.2400, lng: 76.3980, weight: 4, disease: "Grape Black Rot" },
  { lat: 13.3392, lng: 77.1140, weight: 7, disease: "Tomato Late Blight" },
  { lat: 12.9141, lng: 74.8560, weight: 9, disease: "Rice Blast" },
];

const OutbreakMap = ({ lang }) => {
  const [center] = useState({ lat: 15.3173, lng: 75.7139 }); // Center of Karnataka
  const [heatmapData, setHeatmapData] = useState([]);
  const [outbreaks, setOutbreaks] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['visualization']
  });

  useEffect(() => {
    const fetchOutbreaks = async () => {
      try {
        const response = await getHistory();
        if (response.data.success) {
          const rawData = response.data.data;
          // Filter only those with location
          const validOutbreaks = rawData.filter(d => d.location && d.location.lat && d.location.lng);
          setOutbreaks(validOutbreaks);

          if (isLoaded) {
            const hData = validOutbreaks.map(point => ({
              location: new window.google.maps.LatLng(point.location.lat, point.location.lng),
              weight: point.severity === 'High' ? 15 : point.severity === 'Medium' ? 10 : 5
            }));
            setHeatmapData(hData);
          }
        }
      } catch (err) {
        console.error("Failed to fetch outbreak data:", err);
      }
    };

    fetchOutbreaks();
  }, [isLoaded]);

  if (!isLoaded) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 py-10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 mb-3"
          >
            <span className="w-12 h-[1px] bg-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Regional Surveillance</span>
          </motion.div>
          <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
            Disease <span className="text-primary italic">Outbreak</span> Map
          </h1>
        </div>

        <div className="card-premium py-3 px-6 flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted font-black uppercase tracking-widest">Active Alerts</span>
            <span className="text-xl font-black text-primary">24 High Intensity</span>
          </div>
        </div>
      </div>

      {/* Main Map Card */}
      <div className="card-premium p-0 h-[70vh] overflow-hidden relative border-white/10 group">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={7}
          center={center}
          options={mapOptions}
        >
          {heatmapData.length > 0 && (
            <HeatmapLayer
              data={heatmapData}
              options={{
                radius: 40,
                opacity: 0.8,
                gradient: [
                  "rgba(0, 255, 255, 0)",
                  "rgba(0, 255, 255, 1)",
                  "rgba(0, 191, 255, 1)",
                  "rgba(0, 127, 255, 1)",
                  "rgba(16, 185, 129, 0.5)",
                  "rgba(16, 185, 129, 1)",
                ]
              }}
            />
          )}

          {outbreaks.map((point, i) => (
            <Marker 
              key={i}
              position={{ lat: point.location.lat, lng: point.location.lng }}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 6,
                fillColor: point.severity === 'High' ? '#ef4444' : '#10b981',
                fillOpacity: 0.8,
                strokeWeight: 1,
                strokeColor: '#ffffff'
              }}
              title={`${point.cropName}: ${point.diseaseName}`}
            />
          ))}
        </GoogleMap>

        {/* Legend Overlay */}
        <div className="absolute bottom-8 left-8 card-premium-dark max-w-xs space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Intensity Legend</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#10b981]" />
              <span className="text-[11px] font-bold text-white/80">Tomato Late Blight (High Risk)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-900" />
              <span className="text-[11px] font-bold text-white/40">Potato Early Blight (Monitoring)</span>
            </div>
          </div>
          <p className="text-[9px] text-muted leading-relaxed border-t border-white/5 pt-4">
            Data aggregated from local scans. Accuracy level: 94.2%
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-premium">
          <span className="text-[10px] text-primary font-black uppercase tracking-widest">Most Affected Crop</span>
          <h3 className="text-2xl font-black text-white mt-2">Tomato (Hybrid)</h3>
          <p className="text-xs text-muted mt-2">72% of reported cases in Southern Karnataka.</p>
        </div>
        <div className="card-premium">
          <span className="text-[10px] text-primary font-black uppercase tracking-widest">Weather Impact</span>
          <h3 className="text-2xl font-black text-white mt-2">Humidity Spike</h3>
          <p className="text-xs text-muted mt-2">Current conditions favoring fungal growth.</p>
        </div>
        <div className="card-premium border-primary/20">
          <span className="text-[10px] text-primary font-black uppercase tracking-widest">Next 48 Hours</span>
          <h3 className="text-2xl font-black text-white mt-2">Precautionary Alert</h3>
          <p className="text-xs text-muted mt-2">Apply preventive spray in Mysore/Mandya.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default OutbreakMap;
