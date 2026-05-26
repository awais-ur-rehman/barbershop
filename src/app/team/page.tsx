import { SectionHeading } from "@/components/ui/SectionHeading";
import { BarberCard } from "@/components/ui/BarberCard";

const barbers = [
  {
    id: "alex-stone",
    name: "Alex Stone",
    role: "Master Barber",
    specialty: "Precision Fades & Beard Sculpting",
    image: "/images/barber-1.png",
  },
  {
    id: "james-cooper",
    name: "James Cooper",
    role: "Senior Stylist",
    specialty: "Classic Scissor Cuts & Styling",
    image: "/images/barber-2.png",
  },
  {
    id: "marcus-reid",
    name: "Marcus Reid",
    role: "Barber",
    specialty: "Hot Towel Shaves & Designs",
    image: "/images/barber-3.png",
  },
];

export default function TeamPage() {
  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="Meet Our Masters"
        subtitle="The Team"
        description="Our team consists of dedicated professionals who have mastered the art of grooming. Each barber brings a unique set of skills and a passion for the craft."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {barbers.map((barber, index) => (
          <BarberCard key={barber.id} barber={barber} index={index} />
        ))}
      </div>

      <div className="bg-card border border-border/50 p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto rounded-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        <h3 className="text-3xl md:text-4xl font-serif italic text-foreground mb-6">
          Our Philosophy
        </h3>
        <p className="text-muted-foreground text-lg leading-relaxed font-light mb-8">
          We believe that a haircut is more than just a service; it&apos;s an
          experience. Our shop is a sanctuary where tradition meets modern
          style, and where every client is treated with the utmost respect and
          attention to detail. We take the time to understand your needs and
          deliver a look that complements your lifestyle and personality.
        </p>
        <div className="w-16 h-1 bg-gold mx-auto opacity-50" />
      </div>
    </div>
  );
}
