import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black/95 border-t border-white/5 pt-20 pb-10 text-white">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-serif font-bold tracking-tighter">
                            BARBER<span className="text-gold">SHOP</span>
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Elevating the art of grooming. We combine traditional techniques with modern luxury to define your personal style.
                        </p>
                        <div className="flex space-x-5 pt-2">
                            <a href="#" className="text-gray-500 hover:text-gold transition-colors duration-300 transform hover:-translate-y-1"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-500 hover:text-gold transition-colors duration-300 transform hover:-translate-y-1"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-500 hover:text-gold transition-colors duration-300 transform hover:-translate-y-1"><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 flex items-center gap-2">
                            <span className="w-8 h-px bg-gold"></span> Explore
                        </h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-gold transition-colors flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-gold">›</span> Home</Link></li>
                            <li><Link href="/team" className="hover:text-gold transition-colors flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-gold">›</span> Meet the Team</Link></li>
                            <li><Link href="/#services" className="hover:text-gold transition-colors flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-gold">›</span> Services</Link></li>
                            <li><Link href="/schedule" className="hover:text-gold transition-colors flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-gold">›</span> Book Appointment</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 flex items-center gap-2">
                            <span className="w-8 h-px bg-gold"></span> Contact
                        </h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                                <span>123 Gentleman's Row,<br />New York, NY 10012</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-gold shrink-0" />
                                <span>(212) 555-0123</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-gold shrink-0" />
                                <span>concierge@barbershop.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 flex items-center gap-2">
                            <span className="w-8 h-px bg-gold"></span> Hours
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span>Mon - Fri</span>
                                <span className="text-white">10:00 AM - 8:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span>Saturday</span>
                                <span className="text-white">9:00 AM - 6:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span>Sunday</span>
                                <span className="text-gold font-medium">Closed</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-600 font-medium tracking-wide">
                        &copy; {new Date().getFullYear()} BARBERSHOP. EST. 2024.
                    </p>
                    <div className="flex gap-6 text-xs text-gray-600">
                        <Link href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
