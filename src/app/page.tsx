import Image from "next/image";
import Link from "next/link";
import { Scissors, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/images/hero.png"
            alt="Luxury Barber Shop"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            priority
            className="opacity-80 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 space-y-8 animate-fade-in-up">
          <div className="inline-block border-y border-gold/50 py-2 px-6 mb-4">
            <span className="text-gold text-xs md:text-sm uppercase tracking-[0.3em] font-medium">Est. 2024</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tighter leading-none text-white drop-shadow-2xl">
            LEGACY <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 italic font-light">GROOMING</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Where traditional craftsmanship meets modern luxury. Experience the finest haircut and shave in the city.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link
              href="/schedule"
              className="group relative px-10 py-4 bg-gold text-primary-foreground font-bold uppercase tracking-widest text-sm overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300">Book Appointment</span>
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </Link>
            <Link
              href="/team"
              className="group px-10 py-4 bg-transparent border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:border-gold hover:text-gold transition-all duration-300"
            >
              Meet The Team
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-background relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-gold/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground">Our Signature Services</h2>
            <div className="w-24 h-1 bg-gold mx-auto" />
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed pt-4">
              Meticulous attention to detail. Premium products. Unrivaled skill.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group bg-card p-10 border border-white/5 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-8 group-hover:bg-gold transition-colors duration-500">
                <Scissors className="text-foreground group-hover:text-black transition-colors duration-500" size={32} />
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-4">Precision Cut</h3>
              <p className="text-foreground/60 mb-8 leading-relaxed">
                Consultation, shampoo, precision haircut, and hot towel finish. Tailored to your face shape and style.
              </p>
              <div className="flex justify-between items-center border-t border-white/10 pt-6">
                <span className="text-2xl font-serif text-gold">$45</span>
                <span className="text-xs uppercase tracking-widest text-foreground/40">45 Mins</span>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group bg-card p-10 border border-white/5 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 mt-0 md:-mt-8 relative z-10 shadow-2xl">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-gold text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">Popular</span>
              </div>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-8 group-hover:bg-gold transition-colors duration-500">
                <Sparkles className="text-foreground group-hover:text-black transition-colors duration-500" size={32} />
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-4">Royal Treatment</h3>
              <p className="text-foreground/60 mb-8 leading-relaxed">
                The ultimate grooming experience. Haircut, straight razor shave, facial massage, and premium styling.
              </p>
              <div className="flex justify-between items-center border-t border-white/10 pt-6">
                <span className="text-2xl font-serif text-gold">$85</span>
                <span className="text-xs uppercase tracking-widest text-foreground/40">90 Mins</span>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group bg-card p-10 border border-white/5 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-8 group-hover:bg-gold transition-colors duration-500">
                <img src="/icons/razor.svg" alt="Razor" className="w-8 h-8 opacity-80 group-hover:opacity-100 invert dark:invert-0" />
                {/* Fallback if razor icon not available, but user requested SVG icons */}
                {/* Using lucide Razor if available, otherwise generic */}
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-4">Classic Shave</h3>
              <p className="text-foreground/60 mb-8 leading-relaxed">
                Hot towel, pre-shave oil, hot lather, straight razor shave, and cold towel finish.
              </p>
              <div className="flex justify-between items-center border-t border-white/10 pt-6">
                <span className="text-2xl font-serif text-gold">$55</span>
                <span className="text-xs uppercase tracking-widest text-foreground/40">45 Mins</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Teaser */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/hero.png')] bg-cover bg-fixed bg-center grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready for your upgrade?</h2>
            <p className="text-xl text-gray-400 font-light mb-8">
              Book your appointment today and experience the difference of a true gentleman's barber shop.
            </p>
          </div>
          <Link
            href="/schedule"
            className="group flex items-center gap-4 px-12 py-6 bg-gold text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300"
          >
            Book Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
