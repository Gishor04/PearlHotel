import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
      <div className="p-6 rounded-full bg-dark-900 border border-gold-600/30 text-gold-400 mb-6 shadow-gold-glow animate-bounce">
        <Utensils className="w-12 h-12" />
      </div>
      <h1 className="font-serif text-6xl font-black text-white">404</h1>
      <h2 className="font-serif text-2xl font-bold text-gold-400 mt-2">Page Not Found</h2>
      <p className="text-slate-400 text-sm mt-2 max-w-md">
        The restaurant dish or page you were searching for doesn't exist or has been relocated.
      </p>
      <Link
        to="/"
        className="mt-8 flex items-center gap-2 px-8 py-3 rounded-full gold-gradient-bg text-dark-950 font-bold text-sm shadow-gold-glow hover:scale-105 transition-all"
      >
        <Home className="w-4 h-4" />
        Return to Pearl Hotel Home
      </Link>
    </div>
  );
}
