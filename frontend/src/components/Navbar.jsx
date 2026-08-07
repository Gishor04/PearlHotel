import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crown, Phone, Lock, Menu as MenuIcon, X } from 'lucide-react';
import TopContactHeader from './TopContactHeader';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Contact Bar */}
      <TopContactHeader />

      {/* Main Header Container */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-950/95 backdrop-blur-xl border-b border-gold-600/20 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-dark-950/95 via-dark-950/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-crimson-800 via-dark-900 to-gold-600 p-[1.5px] shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-dark-950 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-gold-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-extrabold tracking-wider text-white group-hover:text-gold-400 transition-colors">
                  {t('nav.brandName')}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-500 font-semibold -mt-1">
                  {t('nav.locationSub')}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  isActive('/') ? 'text-gold-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {t('nav.home')}
                {isActive('/') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-400 to-amber-500 rounded-full" />
                )}
              </Link>

              <Link
                to="/menu"
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  isActive('/menu') ? 'text-gold-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {t('nav.menu')}
                {isActive('/menu') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-400 to-amber-500 rounded-full" />
                )}
              </Link>
            </nav>

            {/* Action Buttons: Phone Call & Admin Login Portal link */}
            <div className="flex items-center gap-3">
              
              {/* Direct Call Button in Navbar */}
              <a
                href="tel:+94771234567"
                className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full gold-gradient-bg text-dark-950 text-xs font-extrabold shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
              >
                <Phone className="w-3.5 h-3.5 fill-dark-950 stroke-none" />
                <span>+94 77 123 4567</span>
              </a>

              {/* Admin Portal Button */}
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-dark-800 hover:bg-dark-700 text-gold-400 text-xs font-bold border border-gold-600/30 transition-all hover:scale-105"
                title="Protected Staff Admin Portal"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('nav.adminLogin')}</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white border border-slate-700/50"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-dark-950/98 backdrop-blur-xl border-b border-gold-600/20 px-6 py-6 transition-all duration-300 shadow-2xl">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2 border-b border-slate-800/60 ${
                  isActive('/') ? 'text-gold-400 font-bold' : 'text-slate-300'
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2 border-b border-slate-800/60 ${
                  isActive('/menu') ? 'text-gold-400 font-bold' : 'text-slate-300'
                }`}
              >
                {t('nav.menu')}
              </Link>
              <a
                href="tel:+94771234567"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-bold py-2 text-gold-400 border-b border-slate-800/60"
              >
                <span>📞 +94 77 123 4567</span>
                <Phone className="w-4 h-4" />
              </a>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-bold py-2 text-slate-300 hover:text-gold-400"
              >
                <span>🔒 {t('nav.adminLogin')}</span>
                <Lock className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
