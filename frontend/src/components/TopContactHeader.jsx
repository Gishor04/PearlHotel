import React from 'react';
import { Phone, MapPin, Clock, Globe, Shield, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TopContactHeader() {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <div className="bg-dark-900 border-b border-gold-600/20 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Side: Address & Opening Hours */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 hover:text-gold-400 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            <span>{t('topAddress')}</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            <span>{t('openHours')}</span>
          </div>
        </div>

        {/* Right Side: Phone Number Call Button & Language Selector */}
        <div className="flex items-center gap-4">
          
          {/* Direct Phone Call Button */}
          <a
            href="tel:+94771234567"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson-900/60 hover:bg-crimson-800 text-gold-300 font-bold border border-gold-500/40 transition-all hover:scale-105 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span>+94 77 123 4567</span>
          </a>

          {/* Google Maps Location Button */}
          <a
            href="https://maps.google.com/?q=Navatkuli+Junction,+Kaithady,+Jaffna"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-gold-400 font-medium transition-colors"
          >
            <span>{t('getDirections')}</span>
            <ExternalLink className="w-3 h-3 text-gold-400" />
          </a>

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-dark-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <Globe className="w-3.5 h-3.5 text-gold-400" />
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
              aria-label="Select Language"
            >
              <option value="en" className="bg-dark-900 text-slate-100">🇬🇧 English</option>
              <option value="ta" className="bg-dark-900 text-slate-100">🇱🇰 தமிழ் (Tamil)</option>
              <option value="si" className="bg-dark-900 text-slate-100">🇱🇰 සිංහල (Sinhala)</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}
