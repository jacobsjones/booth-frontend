"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mic2, Search, User } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Search", href: "/search" },
    { label: "List Your Studio", href: "/list" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center"
            >
              <Mic2 className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold gradient-text">Booth</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/search"
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Link>
            <Link
              href="/auth/signin"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-200 shadow-lg shadow-violet-500/25"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="pt-2 border-t border-white/10"
              >
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
