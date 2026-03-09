'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    bookingData: {
        service: string | null;
        date: string | null;
        barber: string | null;
    };
    setBookingData: (data: Partial<{ service: string; date: string; barber: string }>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [bookingData, setBookingState] = useState<{
        service: string | null;
        date: string | null;
        barber: string | null;
    }>({
        service: null,
        date: null,
        barber: null,
    });

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
        // Ideally, you would also update the document class here for Tailwind dark mode
        if (theme === 'light') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const setBookingData = (data: Partial<typeof bookingData>) => {
        setBookingState((prev) => ({ ...prev, ...data }));
    };

    return (
        <AppContext.Provider value={{ theme, toggleTheme, bookingData, setBookingData }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
