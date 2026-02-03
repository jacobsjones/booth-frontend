"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar } from "lucide-react";

interface SearchBarProps {
  variant?: "hero" | "compact";
  className?: string;
}

export default function SearchBar({ variant = "hero", className = "" }: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (date) params.set("date", date);
    router.push(`/search?${params.toString()}`);
  };

  if (variant === "compact") {
    return (
      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-2 p-2 bg-slate-900/80 backdrop-blur-md rounded-full border border-white/10 ${className}`}
      >
        <div className="flex items-center gap-2 px-4 flex-1">
          <MapPin className="w-4 h-4 text-violet-400" />
          <input
            type="text"
            placeholder="Where?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none w-full"
          />
        </div>
        <div className="w-px h-6 bg-white/10" />
        <div className="flex items-center gap-2 px-4">
          <Calendar className="w-4 h-4 text-violet-400" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full text-white shadow-lg shadow-violet-500/25"
        >
          <Search className="w-4 h-4" />
        </motion.button>
      </motion.form>
    );
  }

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className={`w-full max-w-2xl mx-auto ${className}`}
    >
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(236, 72, 153, 0.1)"
            : "0 0 0px rgba(139, 92, 246, 0)",
        }}
        transition={{ duration: 0.3 }}
        className="glass-card p-2"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Location Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
            <MapPin className="w-5 h-5 text-violet-400 flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-xs text-slate-400 font-medium mb-0.5">
                Location
              </label>
              <input
                type="text"
                placeholder="Search studios near..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          <div className="hidden sm:block w-px bg-white/10 my-2" />

          {/* Date Input */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors sm:w-48">
            <Calendar className="w-5 h-5 text-fuchsia-400 flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-xs text-slate-400 font-medium mb-0.5">
                When
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-transparent text-white focus:outline-none text-sm [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50"
              />
            </div>
          </div>

          {/* Search Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.form>
  );
}
