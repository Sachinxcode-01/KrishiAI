import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';

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
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#064e3b" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#1e293b" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#0f172a" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#020617" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#334155" }],
    },
  ],
  disableDefaultUI: true,
  zoomControl: true,
};

const KrishiLocator = ({ lang, onClose }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {
        // Default to a central location if denied (e.g. Bangalore for context)
        setUserLocation({ lat: 12.9716, lng: 77.5946 });
      }
    );
  }, []);

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  useEffect(() => {
    if (isLoaded && map && userLocation) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: userLocation,
        radius: '5000',
        query: lang === 'en' ? 'Krishi Kendra Agricultural Center' : 'ಕೃಷಿ ಕೇಂದ್ರ'
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
        }
      });
    }
  }, [isLoaded, map, userLocation, lang]);

  if (!isLoaded) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 backdrop-blur-3xl bg-black/60"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-6xl h-[80vh] card-premium-dark flex flex-col overflow-hidden relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Sidebar */}
          <div className="w-full md:w-80 p-8 flex flex-col gap-6 border-r border-white/5 bg-black/20 overflow-y-auto custom-scrollbar">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Krishi <span className="text-primary italic">Locator</span>
              </h2>
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mt-1.5">Nearby Support Nodes</p>
            </div>

            <div className="space-y-4">
              {places.map((place) => (
                <motion.button
                  key={place.place_id}
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    setSelectedPlace(place);
                    map.panTo(place.geometry.location);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selectedPlace?.place_id === place.place_id 
                      ? 'bg-primary/20 border-primary shadow-lg shadow-primary/10' 
                      : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                  }`}
                >
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1 line-clamp-1">{place.name}</h4>
                  <p className="text-[10px] text-muted line-clamp-2">{place.formatted_address}</p>
                  {place.rating && (
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-primary text-[10px]">★</span>
                      <span className="text-[10px] text-primary/60 font-black">{place.rating}</span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 relative">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={13}
              center={userLocation}
              options={mapOptions}
              onLoad={onMapLoad}
            >
              {userLocation && (
                <Marker 
                  position={userLocation} 
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: '#10b981',
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 2,
                  }}
                />
              )}

              {places.map((place) => (
                <Marker
                  key={place.place_id}
                  position={place.geometry.location}
                  onClick={() => setSelectedPlace(place)}
                  icon={{
                    url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                    scaledSize: new window.google.maps.Size(40, 40)
                  }}
                />
              ))}

              {selectedPlace && (
                <InfoWindow
                  position={selectedPlace.geometry.location}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div className="p-2 text-black">
                    <h3 className="font-bold text-sm">{selectedPlace.name}</h3>
                    <p className="text-xs opacity-70">{selectedPlace.formatted_address}</p>
                    <button 
                      onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.name}&destination_place_id=${selectedPlace.place_id}`, '_blank')}
                      className="mt-2 bg-emerald-600 text-white px-3 py-1 rounded text-[10px] font-bold"
                    >
                      Get Directions
                    </button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default KrishiLocator;
