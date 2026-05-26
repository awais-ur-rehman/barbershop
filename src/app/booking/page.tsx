"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Scissors, User, CheckCircle } from "lucide-react";
import Image from "next/image";

// Mock Data
const services = [
  { id: "classic-cut", name: "The Classic Cut", price: "$45", duration: "45m" },
  { id: "fade-master", name: "The Fade Master", price: "$50", duration: "60m" },
  { id: "royal-shave", name: "The Royal Shave", price: "$40", duration: "45m" },
  {
    id: "beard-sculpt",
    name: "Beard Sculpting",
    price: "$35",
    duration: "30m",
  },
];

const barbers = [
  {
    id: "alex-stone",
    name: "Alex Stone",
    role: "Master Barber",
    image: "/images/barber-1.png",
  },
  {
    id: "james-cooper",
    name: "James Cooper",
    role: "Senior Stylist",
    image: "/images/barber-2.png",
  },
  {
    id: "marcus-reid",
    name: "Marcus Reid",
    role: "Barber",
    image: "/images/barber-3.png",
  },
];

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

function BookingContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const barberParam = searchParams.get("barber");

    if (serviceParam && services.some((s) => s.id === serviceParam)) {
      queueMicrotask(() => setSelectedService(serviceParam));
    }

    if (barberParam && barbers.some((b) => b.id === barberParam)) {
      queueMicrotask(() => setSelectedBarber(barberParam));
    }
  }, [searchParams]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else setIsConfirmed(true);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedBarber;
    if (step === 3) return !!selectedTime;
    return false;
  };

  if (isConfirmed) {
    return (
      <div className="pt-32 pb-20 px-4 min-h-screen flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card border border-gold/30 p-12 rounded-sm shadow-xl"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-gold" />
          </div>
          <h2 className="text-4xl font-serif italic text-foreground mb-4">
            Booking Confirmed
          </h2>
          <p className="text-muted-foreground mb-8">
            Your appointment has been scheduled successfully. We&apos;ve sent a
            confirmation email with all the details.
          </p>

          <div className="bg-muted/30 p-6 rounded text-left mb-8 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-medium text-foreground">
                {services.find((s) => s.id === selectedService)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Barber:</span>
              <span className="font-medium text-foreground">
                {barbers.find((b) => b.id === selectedBarber)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium text-foreground">
                {selectedTime}
              </span>
            </div>
          </div>

          <Button href="/" variant="primary" size="lg">
            Return Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
      <SectionHeading
        title="Book Appointment"
        subtitle="Reservation"
        description="Select your service, choose your preferred barber, and pick a time that works for you."
      />

      {/* Progress Steps */}
      <div className="flex justify-between mb-12 relative max-w-2xl mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-px bg-border -z-10" />
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300",
              step >= s
                ? "bg-gold text-white"
                : "bg-card border border-border text-muted-foreground",
            )}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="bg-card border border-border/50 rounded-sm overflow-hidden min-h-[400px] p-6 md:p-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-serif italic text-foreground mb-6 flex items-center gap-3">
                <Scissors className="w-5 h-5 text-gold" /> Select Service
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={cn(
                      "cursor-pointer p-6 border rounded-sm transition-all hover:border-gold/50",
                      selectedService === service.id
                        ? "border-gold bg-gold/5 ring-1 ring-gold/20"
                        : "border-border bg-card hover:bg-muted/20",
                    )}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground text-lg">
                        {service.name}
                      </span>
                      <span className="text-gold font-bold">
                        {service.price}
                      </span>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground block">
                      {service.duration}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-serif italic text-foreground mb-6 flex items-center gap-3">
                <User className="w-5 h-5 text-gold" /> Select Barber
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {barbers.map((barber) => (
                  <div
                    key={barber.id}
                    onClick={() => setSelectedBarber(barber.id)}
                    className={cn(
                      "cursor-pointer p-4 border rounded-sm transition-all hover:border-gold/50 flex flex-col items-center text-center gap-4",
                      selectedBarber === barber.id
                        ? "border-gold bg-gold/5 ring-1 ring-gold/20"
                        : "border-border bg-card hover:bg-muted/20",
                    )}
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden relative">
                      <Image
                        src={barber.image}
                        alt={barber.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-medium text-foreground block text-lg">
                        {barber.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {barber.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-serif italic text-foreground mb-6 flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold" /> Select Time
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "py-3 px-4 border rounded-sm transition-all text-sm font-medium",
                      selectedTime === time
                        ? "bg-gold text-white border-gold"
                        : "border-border hover:border-gold/50 text-foreground",
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <div className="mt-8 bg-muted/20 p-6 rounded border border-border/50">
                <h4 className="font-serif text-lg mb-4">Summary</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-muted-foreground">Service</span>
                    <span>
                      {services.find((s) => s.id === selectedService)?.name}
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-muted-foreground">Barber</span>
                    <span>
                      {barbers.find((b) => b.id === selectedBarber)?.name}
                    </span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-bold text-gold">
                      {services.find((s) => s.id === selectedService)?.price}
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-10 pt-6 border-t border-border/50">
          <Button
            onClick={handleBack}
            variant="ghost"
            disabled={step === 1}
            className={step === 1 ? "opacity-0 pointer-events-none" : ""}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            variant="primary"
            className="px-8"
          >
            {step === 3 ? "Confirm Booking" : "Next Step"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={<div className="pt-32 pb-20 px-4 text-center">Loading...</div>}
    >
      <BookingContent />
    </Suspense>
  );
}
