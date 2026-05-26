import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollCanvas from "@/components/ScrollCanvas";
import ScrollText from "@/components/ScrollText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BarberCard } from "@/components/ui/BarberCard";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";

const featuredBarber = {
  id: "alex-stone",
  name: "Alex Stone",
  role: "Master Barber",
  specialty: "Precision Fades & Beard Sculpting",
  image: "/images/barber-1.png",
};

const featuredServices = [
  {
    id: "classic-cut",
    name: "The Classic Cut",
    price: "$45",
    description:
      "A precision cut tailored to your face shape and style preference. Includes a hot towel finish and styling.",
    benefits: ["Consultation", "Precision Cut", "Hot Towel Finish"],
    duration: "45 min",
  },
  {
    id: "royal-shave",
    name: "The Royal Shave",
    price: "$40",
    description:
      "Traditional hot towel straight razor shave. The ultimate relaxation experience for the modern gentleman.",
    benefits: ["Hot Towel Prep", "Straight Razor Shave", "Aftershave Balm"],
    duration: "45 min",
  },
  {
    id: "fade-master",
    name: "The Fade Master",
    price: "$50",
    description:
      "Seamless skin fade with razor-sharp detailing. Perfect for maintaining a clean, modern look.",
    benefits: ["Skin Fade", "Razor Detailing", "Styling"],
    duration: "60 min",
  },
];

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
            style={{ objectFit: "cover" }}
            quality={100}
            priority
            className="opacity-80 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 space-y-8 animate-fade-in-up">
          <div className="inline-block border-y border-gold/50 py-2 px-6 mb-4">
            <span className="text-gold text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
              Est. 2024
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tighter leading-none text-white drop-shadow-2xl">
            LEGACY{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 italic font-light">
              GROOMING
            </span>
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Where traditional craftsmanship meets modern luxury. Experience the
            finest haircut and shave in the city.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button
              href="/booking"
              variant="primary"
              size="lg"
              className="px-10 py-6 text-base uppercase tracking-widest font-bold"
            >
              Book Appointment
            </Button>
            <Button
              href="/team"
              variant="outline"
              size="lg"
              className="px-10 py-6 bg-transparent border-white/30 text-white hover:bg-white hover:text-black hover:border-white uppercase tracking-widest font-bold"
            >
              Meet The Team
            </Button>
          </div>
        </div>
      </section>

      {/* ── Scroll-Driven Video Section ── */}
      <ScrollCanvas
        src="/frames/"
        frameCount={240}
        scrollHeightMultiplier={5}
        className="bg-black"
      >
        {/* Text overlays that appear/disappear at specific scroll points */}
        <ScrollText appearAt={0.0} disappearAt={0.2} side="left">
          <h2 className="text-3xl md:text-5xl font-serif italic font-light text-black tracking-wide mb-4">
            From The Raw Look
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed max-w-xs">
            Every great style begins with potential. We see past the overgrown
            edges to the sharp, refined gentleman waiting to emerge.
          </p>
        </ScrollText>

        <ScrollText appearAt={0.25} disappearAt={0.5} side="right">
          <h2 className="text-3xl md:text-5xl font-serif italic font-light text-black tracking-wide mb-4">
            Precision in Every Cut
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed max-w-xs ml-auto">
            Our master barbers work with surgical precision, sculpting your look
            stroke by stroke to define your best features.
          </p>
        </ScrollText>

        <ScrollText appearAt={0.55} disappearAt={0.75} side="left">
          <h2 className="text-3xl md:text-5xl font-serif italic font-light text-black tracking-wide mb-4">
            Crafted to Perfection
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed max-w-xs">
            It&apos;s not just a haircut; it&apos;s a work of art. We obsess
            over the details—the fade, the line-up, the texture—so you
            don&apos;t have to.
          </p>
        </ScrollText>

        <ScrollText appearAt={0.8} disappearAt={1.0} side="center">
          <h2 className="text-4xl md:text-7xl font-serif italic font-bold text-gold tracking-tight mb-6">
            The Final Look
          </h2>
          <p className="text-base md:text-lg text-gray-800 font-sans leading-relaxed max-w-lg mx-auto border-t border-gold/30 pt-6">
            Step out of the chair with confidence. A fresh cut, a clean shave,
            and a look that commands respect. Ready for the world.
          </p>
        </ScrollText>
      </ScrollCanvas>

      {/* Barber Spotlight Section */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 -skew-x-12 transform translate-x-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <SectionHeading
                title="Master of the Craft"
                subtitle="Spotlight"
                description="Meet Alex Stone, our lead barber with over 15 years of experience in precision cutting and traditional grooming. His attention to detail is unmatched."
                align="left"
                className="mb-8"
              />
              <Button
                href="/team"
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background"
              >
                View All Barbers
              </Button>
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              <BarberCard barber={featuredBarber} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Signature Services"
            subtitle="Menu"
            description="Experience the finest grooming services tailored to your needs. Meticulous attention to detail. Premium products. Unrivaled skill."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              href="/services"
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-white"
            >
              View Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Teaser */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/hero.png')] bg-cover bg-fixed bg-center grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready for your upgrade?
            </h2>
            <p className="text-xl text-gray-400 font-light mb-8">
              Book your appointment today and experience the difference of a
              true gentleman&apos;s barber shop.
            </p>
          </div>
          <Link
            href="/booking"
            className="group flex items-center gap-4 px-12 py-6 bg-gold text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300"
          >
            Book Now{" "}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
