'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Calendar, Clock, User, Scissors, Phone, Mail } from 'lucide-react';

const services = [
    "Classic Haircut - $35",
    "Beard Trim & Shave - $25",
    "The Royal Treatment - $60",
    "Buzz Cut - $20",
    "Kids Cut - $25"
];

const barbers = [
    "Any Barber",
    "James 'The Blade' Sterling",
    "Elena Rossi",
    "Arthur 'Vintage' Morgan"
];

export default function Schedule() {
    const { setBookingData } = useAppContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: services[0],
        barber: barbers[0]
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Booking submitted:', formData);

        setBookingData({
            service: formData.service,
            date: `${formData.date} at ${formData.time}`,
            barber: formData.barber
        });

        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-background">
                <div className="w-20 h-20 border-2 border-gold rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl text-gold">✓</span>
                </div>
                <h2 className="text-4xl font-serif font-bold text-foreground mb-4">CONFIRMED</h2>
                <p className="text-lg text-foreground/60 mb-8 max-w-md font-light">
                    Your appointment is set, <span className="font-semibold text-foreground">{formData.name}</span>. We look forward to seeing you on <span className="text-gold">{formData.date}</span> at <span className="text-gold">{formData.time}</span>.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 bg-foreground text-background font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-colors duration-300"
                >
                    Book Another
                </button>
            </div>
        );
    }

    return (
        <div className="bg-background py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Secure Your Spot</h2>
                    <div className="w-16 h-1 bg-gold mx-auto" />
                </div>

                <div className="bg-card border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/60">
                                    <User size={14} className="text-gold" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-muted/50 border-b-2 border-transparent focus:border-gold px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/20"
                                    placeholder="JOHN DOE"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label htmlFor="phone" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/60">
                                    <Phone size={14} className="text-gold" /> Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-muted/50 border-b-2 border-transparent focus:border-gold px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/20"
                                    placeholder="(555) 123-4567"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Service */}
                            <div className="space-y-2">
                                <label htmlFor="service" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/60">
                                    <Scissors size={14} className="text-gold" /> Service
                                </label>
                                <div className="relative">
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full bg-muted/50 border-b-2 border-transparent focus:border-gold px-4 py-3 text-foreground outline-none appearance-none cursor-pointer"
                                    >
                                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">▼</div>
                                </div>
                            </div>

                            {/* Barber */}
                            <div className="space-y-2">
                                <label htmlFor="barber" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/60">
                                    <User size={14} className="text-gold" /> Barber Preferance
                                </label>
                                <div className="relative">
                                    <select
                                        id="barber"
                                        name="barber"
                                        value={formData.barber}
                                        onChange={handleChange}
                                        className="w-full bg-muted/50 border-b-2 border-transparent focus:border-gold px-4 py-3 text-foreground outline-none appearance-none cursor-pointer"
                                    >
                                        {barbers.map((b) => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">▼</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Date */}
                            <div className="space-y-2">
                                <label htmlFor="date" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/60">
                                    <Calendar size={14} className="text-gold" /> Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    required
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full bg-muted/50 border-b-2 border-transparent focus:border-gold px-4 py-3 text-foreground outline-none"
                                />
                            </div>

                            {/* Time */}
                            <div className="space-y-2">
                                <label htmlFor="time" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/60">
                                    <Clock size={14} className="text-gold" /> Time
                                </label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    required
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full bg-muted/50 border-b-2 border-transparent focus:border-gold px-4 py-3 text-foreground outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                className="w-full bg-gold hover:bg-white hover:text-black py-4 text-black font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Confirm Appointment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
