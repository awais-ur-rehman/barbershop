'use client';

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { Moon, Sun } from 'lucide-react';

export default function Header() {
    const { theme, toggleTheme } = useAppContext();

    return (
        <header className="bg-background/90 border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-serif font-bold tracking-tighter text-foreground">
                            BARBER<span className="text-gold">SHOP</span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex space-x-12">
                        {[
                            { name: 'Home', href: '/' },
                            { name: 'Our Team', href: '/team' },
                            { name: 'Services', href: '/#services' },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-foreground/80 hover:text-gold uppercase tracking-widest text-xs font-semibold transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-foreground/60 hover:text-gold transition-colors focus:outline-none"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <Link
                            href="/schedule"
                            className="px-6 py-2 bg-gold text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
