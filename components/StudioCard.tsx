"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Users } from "lucide-react";

interface Studio {
  id: string;
  name: string;
  location: string;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  images: string[];
  equipment: string[];
  maxCapacity: number;
}

interface StudioCardProps {
  studio: Studio;
  index?: number;
}

export default function StudioCard({ studio, index = 0 }: StudioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/studio/${studio.id}`}>
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group glass-card overflow-hidden cursor-pointer"
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={studio.images[0] || "/images/studio-placeholder.jpg"}
              alt={studio.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
            
            {/* Price Badge */}
            <div className="absolute top-3 right-3 px-3 py-1.5 bg-slate-950/80 backdrop-blur-sm rounded-full border border-white/10">
              <span className="text-white font-semibold">${studio.pricePerHour}</span>
              <span className="text-slate-400 text-sm">/hr</span>
            </div>

            {/* Equipment Tags */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
              {studio.equipment.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 text-xs bg-slate-950/60 backdrop-blur-sm text-slate-300 rounded-full border border-white/10"
                >
                  {item}
                </span>
              ))}
              {studio.equipment.length > 3 && (
                <span className="px-2 py-0.5 text-xs bg-violet-600/80 text-white rounded-full">
                  +{studio.equipment.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-white line-clamp-1 group-hover:text-violet-400 transition-colors">
                {studio.name}
              </h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-white">{studio.rating}</span>
                <span className="text-sm text-slate-500">({studio.reviewCount})</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400 text-sm mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span className="line-clamp-1">{studio.location}</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>Up to {studio.maxCapacity}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Instant booking</span>
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
