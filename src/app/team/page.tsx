import Image from "next/image";

const teamMembers = [
    {
        name: "James 'The Blade' Sterling",
        role: "Master Barber",
        bio: "Specializing in the lost art of the straight razor shave. 15 years of precision.",
        image: "/images/barber-1.png",
    },
    {
        name: "Elena Rossi",
        role: "Senior Stylist",
        bio: "Modern texturing meets classic structure. Elena crafts styles that command respect.",
        image: "/images/barber-2.png",
    },
    {
        name: "Arthur 'Vintage' Morgan",
        role: "Traditional Barber",
        bio: "A true purist. From pompadours to executive contours, Arthur defines timeless style.",
        image: "/images/barber-3.png",
    },
];

export default function Team() {
    return (
        <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-20">
                    <h2 className="text-3xl font-serif font-bold tracking-tight text-foreground sm:text-5xl mb-6">Master Craftsmen</h2>
                    <div className="w-24 h-1 bg-gold mx-auto mb-6" />
                    <p className="text-lg leading-8 text-foreground/60">
                        Dedicated to the pursuit of perfection.
                    </p>
                </div>

                <ul
                    role="list"
                    className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                    {teamMembers.map((person) => (
                        <li key={person.name} className="group">
                            <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted border border-white/5 hover:border-gold/50 transition-colors duration-500">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <Image
                                    src={person.image}
                                    alt={person.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-700 ease-out"
                                />
                            </div>
                            <div className="pt-6 text-center">
                                <h3 className="text-xl font-serif font-semibold leading-8 tracking-tight text-foreground">{person.name}</h3>
                                <p className="text-sm font-bold uppercase tracking-widest text-gold mb-3">{person.role}</p>
                                <p className="text-base leading-7 text-foreground/60 max-w-xs mx-auto">{person.bio}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
