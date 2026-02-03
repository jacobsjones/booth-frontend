"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  priceRange: [number, number];
  equipment: string[];
  capacity: number | null;
  instantBook: boolean;
}

const equipmentOptions = [
  "Microphones",
  "Mixing Console",
  "Monitors",
  "Keyboard",
  "Drums",
  "Guitar Amps",
  "Bass Amps",
  "Synth",
  "DAW",
  "Outboard Gear",
];

const capacityOptions = [1, 2, 4, 6, 10, 15];

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    equipment: [],
    capacity: null,
    instantBook: false,
  });

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const toggleEquipment = (item: string) => {
    const newEquipment = filters.equipment.includes(item)
      ? filters.equipment.filter((e) => e !== item)
      : [...filters.equipment, item];
    updateFilter("equipment", newEquipment);
  };

  const clearFilters = () => {
    const defaultFilters = {
      priceRange: [0, 500] as [number, number],
      equipment: [],
      capacity: null,
      instantBook: false,
    };
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  const activeFiltersCount =
    (filters.equipment.length > 0 ? 1 : 0) +
    (filters.capacity !== null ? 1 : 0) +
    (filters.instantBook ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 500 ? 1 : 0);

  return (
    <div className="border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-4">
          {/* Filter Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
              isOpen || activeFiltersCount > 0
                ? "border-violet-500 bg-violet-500/10 text-violet-400"
                : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-violet-600 text-white text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </motion.button>

          {/* Quick Filters */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {["Under $50/hr", "Instant Book", "Pro Equipment", "24/7 Access"].map(
              (label) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-full transition-all whitespace-nowrap"
                >
                  {label}
                </motion.button>
              )
            )}
          </div>

          {/* Results Count - will be dynamic */}
          <div className="ml-auto text-sm text-slate-500">
            <span className="text-white font-medium">24</span> studios found
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pb-6 space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-3">
                    Price Range
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          updateFilter("priceRange", [
                            filters.priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-3">
                    Equipment
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {equipmentOptions.map((item) => (
                      <button
                        key={item}
                        onClick={() => toggleEquipment(item)}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                          filters.equipment.includes(item)
                            ? "border-violet-500 bg-violet-500/20 text-violet-300"
                            : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-3">
                    Capacity
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {capacityOptions.map((cap) => (
                      <button
                        key={cap}
                        onClick={() =>
                          updateFilter(
                            "capacity",
                            filters.capacity === cap ? null : cap
                          )
                        }
                        className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                          filters.capacity === cap
                            ? "border-violet-500 bg-violet-500/20 text-violet-300"
                            : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
                        }`}
                      >
                        {cap}+ people
                      </button>
                    ))}
                  </div>
                </div>

                {/* Instant Book Toggle */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <h4 className="text-sm font-medium text-white">
                      Instant Book
                    </h4>
                    <p className="text-xs text-slate-500">
                      Book immediately without waiting for approval
                    </p>
                  </div>
                  <button
                    onClick={() => updateFilter("instantBook", !filters.instantBook)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      filters.instantBook ? "bg-violet-600" : "bg-slate-700"
                    }`}
                  >
                    <motion.div
                      animate={{
                        x: filters.instantBook ? 24 : 2,
                      }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                </div>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                  <div className="flex justify-end pt-4 border-t border-white/5">
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
