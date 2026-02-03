"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Mic2, 
  Headphones, 
  Radio, 
  Calendar, 
  Shield, 
  Zap,
  ArrowRight,
  Music,
  Users,
  Clock,
  Search
} from "lucide-react";
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
];

const howItWorks = [
  {
    icon: Search,
    title: "Search Studios",
    description: "Browse hundreds of professional music studios in your area. Filter by equipment, price, and availability.",
  },
  {
    icon: Calendar,
    title: "Book Instantly",
    description: "Reserve your session with just a few clicks. Many studios offer instant booking with no approval needed.",
  },
  {
    icon: Music,
    title: "Create Your Sound",
    description: "Show up and start creating. Everything you need is ready to go, from mics to mixing consoles.",
  },
];

const features = [
  {
    icon: Shield,
    title: "Verified Studios",
    description: "Every studio is vetted for quality equipment and professional environment.",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    description: "Book available studios immediately without waiting for owner approval.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join thousands of artists who trust Booth for their recording sessions.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our team is always here to help with any questions or issues.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* 3D Background */}
        <Hero3D />
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
              <span className="gradient-text">Book Studio Time.</span>
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
                <div className="text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </section>

      {/* Featured Studios */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Featured Studios
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-400"
              >
                Handpicked studios with the best equipment and reviews
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href="/search"
                className="hidden sm:flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
              >
                <span>View all studios</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStudios.map((studio, index) => (
              <StudioCard key={studio.id} studio={studio} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center sm:hidden"
          >
            <Link
              href="/search"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
            >
              <span>View all studios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Getting studio time has never been easier. Book in minutes, create for hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="glass-card p-8 text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/20 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-violet-400" />
                  </div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose Booth
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We&apos;re building the future of music production, one session at a time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:bg-white/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-cyan-600/20 opacity-50" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                <Radio className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                List Your Studio
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-8">
                Own a music studio? Join thousands of studio owners earning extra income 
                by renting out their space when it&apos;s not in use.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow"
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-colors"
                >
                  Learn More
                </motion.button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Secure payments
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  $2M+ earned by hosts
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
