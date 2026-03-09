"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Barber {
  id: string;
  name: string;
  role: string;
  image: string;
  specialty: string;
}

interface BarberCardProps {
  barber: Barber;
  className?: string;
  index?: number;
}

export function BarberCard({ barber, className, index = 0 }: BarberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden bg-card border border-border/50 hover:border-gold/30 transition-all duration-500 hover:-translate-y-1 rounded-sm",
        className,
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={barber.image}
          alt={barber.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
      </div>

      <div className="p-6 relative z-10 -mt-20">
        <span className="text-xs uppercase tracking-widest text-gold mb-2 block font-medium">
          {barber.role}
        </span>
        <h3 className="text-2xl font-serif text-foreground mb-1">
          {barber.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-6 font-light">
          {barber.specialty}
        </p>

        <Link
          href={`/booking?barber=${barber.id}`}
          className="inline-block px-6 py-2 border border-foreground/20 text-foreground text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300 backdrop-blur-sm"
        >
          Book Appointment
        </Link>
      </div>
    </motion.div>
  );
}
