"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import StudioCard from "@/components/StudioCard";

const featuredStudios = [
  {
    id: "1",
    name: "Neon Sound Studio",
    location: "Brooklyn, NY",
    pricePerHour: 45,
    rating: 4.9,
    reviewCount: 128,
    images: ["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"],
    equipment: ["Pro Tools", "Neumann Mics", "Yamaha Monitors"],
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
    equipment: ["SSL Console", "U87", "Genelec"],
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
    equipment: ["Ableton", "SM7B", "Adam Audio"],
    maxCapacity: 8,
  },
  {
    id: "5",
    name: "Echo Chamber",
    location: "Los Angeles, CA",
    pricePerHour: 85,
    rating: 4.9,
    reviewCount: 215,
    images: ["https://images.unsplash.com/photo-1519508234439-4f23643125c1?w=800&q=80"],
    equipment: ["Neve Console", "U47", "Barefoot"],
    maxCapacity: 12,
  },
  {
    id: "6",
    name: "Frequency Studio",
    location: "London, UK",
    pricePerHour: 60,
    rating: 4.8,
    reviewCount: 89,
    images: ["https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80"],
    equipment: ["Pro Tools", "C12", "Focal"],
    maxCapacity: 6,
  },
  {
    id: "7",
    name: "The Vault",
    location: "Berlin, Germany",
    pricePerHour: 40,
    rating: 4.9,
    reviewCount: 156,
    images: ["https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&q=80"],
    equipment: ["Ableton", "Shure", "Genelec"],
    maxCapacity: 5,
  },
  {
    id: "8",
    name: "Top Floor Records",
    location: "Toronto, Canada",
    pricePerHour: 50,
    rating: 4.7,
    reviewCount: 73,
    images: ["https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80"],
    equipment: ["Logic Pro", "U87", "Yamaha"],
    maxCapacity: 8,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Search Section - Airbnb Style */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Find your perfect studio
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-white/80 mb-8"
          >
            Professional music studios for your next session
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Featured Studios - Airbnb Grid Style */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Featured Studios</h2>
          <Link
            href="/search"
            className="flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
          >
            <span>Show all</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredStudios.map((studio, index) => (
            <StudioCard key={studio.id} studio={studio} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
