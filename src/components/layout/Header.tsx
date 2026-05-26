"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { Moon, Sun } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Header() {
  const { theme, toggleTheme } = useAppContext();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }

    lastScrollY.current = latest;
  });

  const links = [
    { name: "Home", href: "/" },
    { name: "Our Team", href: "/team" },
    { name: "Services", href: "/services" },
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 border-b border-white/10 backdrop-blur-md"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-serif font-bold tracking-tighter text-foreground"
            >
              Esa<span className="text-gold"> Hair Saloon</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-12">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-gold uppercase tracking-widest text-xs font-semibold transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground/60 hover:text-gold transition-colors focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <Link
              href="/booking"
              className="px-6 py-2 bg-gold text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
