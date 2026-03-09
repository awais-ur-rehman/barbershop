"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  benefits?: string[];
  duration?: string;
}

interface ServiceCardProps {
  service: Service;
  index?: number;
  className?: string;
  showButton?: boolean;
}

export function ServiceCard({
  service,
  index = 0,
  className,
  showButton = true,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "group relative bg-card/50 border border-border/50 p-8 rounded-sm hover:border-gold/30 hover:shadow-lg transition-all duration-500",
        className,
      )}
    >
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="text-2xl font-serif text-foreground">{service.name}</h3>
        <span className="text-gold font-medium text-lg">{service.price}</span>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
        {service.description}
      </p>

      {service.benefits && (
        <ul className="space-y-2 mb-8">
          {service.benefits.map((benefit, i) => (
            <li
              key={i}
              className="text-sm text-muted-foreground flex items-center gap-2"
            >
              <span className="w-1 h-1 bg-gold rounded-full" />
              {benefit}
            </li>
          ))}
        </ul>
      )}

      {showButton && (
        <div className="flex items-center justify-between pt-6 border-t border-border/50">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {service.duration}
          </span>
          <Link
            href={`/booking?service=${service.id}`}
            className="text-xs uppercase tracking-widest text-gold hover:text-foreground transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>
      )}
    </motion.div>
  );
}
