"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { X, Star, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Note: In production, use environment variable
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.placeholder";

interface Studio {
  id: string;
  name: string;
  location: string;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  images: string[];
  coordinates: [number, number];
  equipment: string[];
}

interface MapViewProps {
  studios: Studio[];
  selectedStudio?: string | null;
  onStudioSelect?: (id: string) => void;
}

export default function MapView({ 
  studios, 
  selectedStudio, 
  onStudioSelect 
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [popupStudio, setPopupStudio] = useState<Studio | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    // Initialize map
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-74.006, 40.7128], // NYC default
      zoom: 11,
      attributionControl: false,
    });

    map.current.on("load", () => {
      setMapLoaded(true);
    });

    // Add navigation control
    map.current.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
      }),
      "bottom-right"
    );

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Add/update markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    studios.forEach((studio) => {
      const el = document.createElement("div");
      el.className = "map-marker";
      el.innerHTML = `
        <div class="marker-content">
          <span class="marker-price">$${studio.pricePerHour}</span>
        </div>
      `;

      const marker = new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat(studio.coordinates)
        .addTo(map.current!);

      el.addEventListener("click", () => {
        setPopupStudio(studio);
        onStudioSelect?.(studio.id);
        map.current?.flyTo({
          center: studio.coordinates,
          zoom: 14,
          duration: 1000,
        });
      });

      markersRef.current.push(marker);
    });

    // Fit bounds if studios exist
    if (studios.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      studios.forEach((studio) => bounds.extend(studio.coordinates));
      map.current.fitBounds(bounds, { padding: 50, duration: 1000 });
    }
  }, [studios, mapLoaded, onStudioSelect]);

  // Update marker styles when selection changes
  useEffect(() => {
    const markers = document.querySelectorAll(".map-marker");
    markers.forEach((marker, index) => {
      const studio = studios[index];
      if (studio?.id === selectedStudio) {
        marker.classList.add("marker-selected");
      } else {
        marker.classList.remove("marker-selected");
      }
    });
  }, [selectedStudio, studios]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Popup */}
      <AnimatePresence>
        {popupStudio && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-10"
          >
            <div className="glass-card overflow-hidden">
              <button
                onClick={() => setPopupStudio(null)}
                className="absolute top-2 right-2 z-10 p-1.5 bg-slate-950/80 rounded-full text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <Link href={`/studio/${popupStudio.id}`}>
                <div className="relative aspect-video">
                  <Image
                    src={popupStudio.images[0] || "/images/studio-placeholder.jpg"}
                    alt={popupStudio.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-semibold text-white mb-1">{popupStudio.name}</h3>
                    <div className="flex items-center gap-1 text-slate-300 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="line-clamp-1">{popupStudio.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-medium text-white">{popupStudio.rating}</span>
                      <span className="text-slate-500 text-sm">({popupStudio.reviewCount})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-white">${popupStudio.pricePerHour}</span>
                      <span className="text-slate-400 text-sm">/hr</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {popupStudio.equipment.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 text-xs bg-slate-800 text-slate-300 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Marker Styles */}
      <style jsx global>{`
        .map-marker {
          cursor: pointer;
        }
        
        .marker-content {
          background: rgba(139, 92, 246, 0.9);
          backdrop-filter: blur(4px);
          padding: 8px 12px;
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
          transition: all 0.2s ease;
        }
        
        .map-marker:hover .marker-content,
        .marker-selected .marker-content {
          background: rgba(236, 72, 153, 0.95);
          transform: scale(1.1);
          box-shadow: 0 4px 30px rgba(236, 72, 153, 0.5);
        }
        
        .marker-price {
          color: white;
          font-weight: 600;
          font-size: 14px;
        }
        
        .map-marker::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid rgba(139, 92, 246, 0.9);
          transition: border-top-color 0.2s ease;
        }
        
        .map-marker:hover::after,
        .marker-selected::after {
          border-top-color: rgba(236, 72, 153, 0.95);
        }
      `}</style>
    </div>
  );
}
