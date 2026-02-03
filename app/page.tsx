"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero3D from "@/components/Hero3D";
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
    <div className="min-h-screen">
      {/* Hero Section with 3D Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
        {/* 3D Background */}
        <Hero3D />
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-sm text-violet-300">Now booking in 50+ cities</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Book Studio Time.
              </span>
              <br />
              <span className="text-white">Create Your Sound.</span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Find and book professional music studios near you. 
              From home setups to world-class facilities, find your perfect sound.
            </p>

            <SearchBar />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16"
          >
            {[
              { value: "500+", label: "Studios" },
              { value: "10K+", label: "Artists" },
              { value: "50K+", label: "Sessions" },
              { value: "4.9", label: "Rating" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Featured Studios - Airbnb Grid Style */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
        <div className="flex items-center justify-between mb-8">
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
