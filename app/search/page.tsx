"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Map as MapIcon, List, ChevronUp } from "lucide-react";
import StudioCard from "@/components/StudioCard";
import MapView from "@/components/MapView";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";

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
  maxCapacity: number;
}

// Mock data for studios
const mockStudios: Studio[] = [
  {
    id: "1",
    name: "Neon Sound Studio",
    location: "Brooklyn, NY",
    pricePerHour: 45,
    rating: 4.9,
    reviewCount: 128,
    images: ["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"],
    coordinates: [-73.9442, 40.6782],
    equipment: ["Pro Tools", "Neumann Mics", "Yamaha Monitors", "SSL Console"],
    maxCapacity: 6,
  },
  {
    id: "2",
    name: "Midnight Sessions",
    location: "Manhattan, NY",
    pricePerHour: 75,
    rating: 4.8,
    reviewCount: 96,
    images: ["https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&q=80"],
    coordinates: [-73.9857, 40.7484],
    equipment: ["SSL Console", "U87", "Genelec", "Pro Tools HD"],
    maxCapacity: 10,
  },
  {
    id: "3",
    name: "The Sonic Lab",
    location: "Queens, NY",
    pricePerHour: 35,
    rating: 4.7,
    reviewCount: 64,
    images: ["https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80"],
    coordinates: [-73.7949, 40.7282],
    equipment: ["Logic Pro", "Rode Mics", "KRK Monitors"],
    maxCapacity: 4,
  },
  {
    id: "4",
    name: "Bassment Studio",
    location: "Williamsburg, NY",
    pricePerHour: 55,
    rating: 5.0,
    reviewCount: 42,
    images: ["https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=800&q=80"],
    coordinates: [-73.9574, 40.7081],
    equipment: ["Ableton", "SM7B", "Adam Audio", "Moog Synth"],
    maxCapacity: 8,
  },
  {
    id: "5",
    name: "Echo Chamber",
    location: "Greenpoint, NY",
    pricePerHour: 60,
    rating: 4.8,
    reviewCount: 87,
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80"],
    coordinates: [-73.9442, 40.73],
    equipment: ["Reason", "AKG Mics", "Dynaudio", "Outboard Gear"],
    maxCapacity: 5,
  },
  {
    id: "6",
    name: "Frequency Studios",
    location: "Astoria, NY",
    pricePerHour: 40,
    rating: 4.6,
    reviewCount: 53,
    images: ["https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80"],
    coordinates: [-73.9186, 40.7644],
    equipment: ["Cubase", "Shure Mics", "JBL Monitors"],
    maxCapacity: 6,
  },
  {
    id: "7",
    name: "The Loft",
    location: "Soho, NY",
    pricePerHour: 95,
    rating: 4.9,
    reviewCount: 156,
    images: ["https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80"],
    coordinates: [-74.0019, 40.7233],
    equipment: ["Neve Console", "U47", "PMC Monitors", "Pro Tools HDX"],
    maxCapacity: 15,
  },
  {
    id: "8",
    name: "Rhythm House",
    location: "Harlem, NY",
    pricePerHour: 38,
    rating: 4.5,
    reviewCount: 41,
    images: ["https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80"],
    coordinates: [-73.9465, 40.8176],
    equipment: ["FL Studio", "Audio Technica", "KRK", "Drum Kit"],
    maxCapacity: 8,
  },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const locationParam = searchParams.get("location");
  const dateParam = searchParams.get("date");

  const [studios, setStudios] = useState<Studio[]>(mockStudios);
  const [selectedStudio, setSelectedStudio] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"split" | "map" | "list">("split");
  const [showMobileMap, setShowMobileMap] = useState(false);

  // Handle responsive view mode
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode("list");
      } else {
        setViewMode("split");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Search Header */}
      <div className="sticky top-16 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-xl">
              <SearchBar variant="compact" />
            </div>
            
            {/* View Toggle - Desktop */}
            <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setViewMode("split")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === "split"
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Split
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === "list"
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === "map"
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Map
              </button>
            </div>

            {/* Mobile Map Toggle */}
            <button
              onClick={() => setShowMobileMap(!showMobileMap)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg"
            >
              {showMobileMap ? <List className="w-4 h-4" /> : <MapIcon className="w-4 h-4" />}
              <span>{showMobileMap ? "List" : "Map"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterBar />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-16rem)] md:h-[calc(100vh-12rem)]">
        {/* Studio List */}
        <div
          className={`${
            viewMode === "map" ? "hidden" : viewMode === "split" ? "w-1/2" : "w-full"
          } ${showMobileMap ? "hidden" : "block"} overflow-y-auto`}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">
                {locationParam ? `Studios in ${locationParam}` : "All Studios"}
              </h1>
              <p className="text-slate-400">
                {dateParam
                  ? `Available on ${new Date(dateParam).toLocaleDateString()}`
                  : "Showing all available studios"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {studios.map((studio, index) => (
                <div
                  key={studio.id}
                  onMouseEnter={() => setSelectedStudio(studio.id)}
                  onMouseLeave={() => setSelectedStudio(null)}
                >
                  <StudioCard studio={studio} index={index} />
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-colors"
              >
                Load More Studios
              </motion.button>
            </div>
          </div>
        </div>

        {/* Map */}
        <div
          className={`${
            viewMode === "list" ? "hidden" : viewMode === "split" ? "w-1/2" : "w-full"
          } ${!showMobileMap ? "hidden" : "block"} md:block relative`}
        >
          <MapView
            studios={studios}
            selectedStudio={selectedStudio}
            onStudioSelect={setSelectedStudio}
          />

          {/* Mobile Map Close Button */}
          <button
            onClick={() => setShowMobileMap(false)}
            className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 bg-slate-900/90 backdrop-blur-md text-white rounded-full border border-white/10"
          >
            <ChevronUp className="w-4 h-4" />
            <span>Show List</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
