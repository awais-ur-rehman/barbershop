import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";

const services = {
  cuts: [
    {
      id: "classic-cut",
      name: "The Classic Cut",
      price: "$45",
      description:
        "A precision cut tailored to your face shape and style preference. Includes a hot towel finish and styling.",
      benefits: [
        "Consultation",
        "Precision Cut",
        "Hot Towel Finish",
        "Styling Product",
      ],
      duration: "45 min",
    },
    {
      id: "fade-master",
      name: "The Fade Master",
      price: "$50",
      description:
        "Seamless skin fade with razor-sharp detailing. Perfect for maintaining a clean, modern look.",
      benefits: ["Skin Fade", "Razor Detailing", "Hair Wash", "Styling"],
      duration: "60 min",
    },
  ],
  shaves: [
    {
      id: "royal-shave",
      name: "The Royal Shave",
      price: "$40",
      description:
        "Traditional hot towel straight razor shave. The ultimate relaxation experience for the modern gentleman.",
      benefits: [
        "Hot Towel Prep",
        "Pre-Shave Oil",
        "Straight Razor Shave",
        "Aftershave Balm",
      ],
      duration: "45 min",
    },
    {
      id: "beard-sculpt",
      name: "Beard Sculpting",
      price: "$35",
      description:
        "Expert shaping and trimming of your beard, finished with conditioning oils.",
      benefits: ["Beard Trim", "Line Up", "Beard Oil Application", "Hot Towel"],
      duration: "30 min",
    },
  ],
  treatments: [
    {
      id: "scalp-treatment",
      name: "Revitalizing Scalp Treatment",
      price: "$30",
      description:
        "Exfoliating scalp massage and conditioning treatment to promote healthy hair growth.",
      benefits: ["Scalp Massage", "Deep Conditioning", "Stress Relief"],
      duration: "30 min",
    },
    {
      id: "facial",
      name: "Express Facial",
      price: "$45",
      description:
        "Cleansing, exfoliation, and hydration to refresh your skin and leave you glowing.",
      benefits: ["Cleansing", "Exfoliation", "Mask", "Moisturizer"],
      duration: "30 min",
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="Our Services"
        subtitle="Menu"
        description="Experience the finest grooming services tailored to your needs. From classic cuts to luxurious shaves, we offer a range of treatments designed to make you look and feel your best."
      />

      <div className="mb-16">
        <h3 className="text-3xl font-serif italic text-foreground mb-8 text-center md:text-left border-b border-border/50 pb-4 inline-block pr-12">
          Haircuts & Styling
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.cuts.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-3xl font-serif italic text-foreground mb-8 text-center md:text-left border-b border-border/50 pb-4 inline-block pr-12">
          Shaves & Beards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.shaves.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-3xl font-serif italic text-foreground mb-8 text-center md:text-left border-b border-border/50 pb-4 inline-block pr-12">
          Treatments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.treatments.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>

      <div className="bg-card border border-gold/20 p-8 rounded-sm text-center">
        <h4 className="text-xl font-serif text-gold mb-2">
          Looking for something custom?
        </h4>
        <p className="text-muted-foreground mb-6">
          We offer bespoke packages for weddings and special events.
        </p>
        <a
          href="/booking"
          className="inline-block border-b border-foreground text-foreground hover:text-gold hover:border-gold transition-colors pb-1 uppercase tracking-widest text-sm"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
