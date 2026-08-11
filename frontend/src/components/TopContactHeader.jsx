import React from 'react';
import { Phone, MapPin, Clock, Globe, ExternalLink, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TopContactHeader() {
  const { language, changeLanguage, t } = useLanguage();

  const whatsappNumber = '94769489016';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Pearl Hotel! I would like to place an order.')}`;

  return (
    <div className="bg-dark-900 border-b border-gold-600/20 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Side: Address & Opening Hours */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 hover:text-gold-400 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            <span>{t('nav.topAddress')}</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            <span>{t('nav.openHours')}</span>
          </div>
        </div>

        {/* Right Side: Contact Numbers Block (Landline Top, WhatsApp Secondary) & Language Selector */}
        <div className="flex items-center gap-4">
          
          {/* Structured Contact Block: Primary Landline Top, WhatsApp Secondary Below */}
          <div className="flex flex-col items-end justify-center text-right leading-tight">
            {/* Primary Landline Number Block (Top) */}
            <a
              href="tel:0212213826"
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-crimson-900/80 hover:bg-crimson-800 text-gold-300 font-extrabold text-[11px] border border-gold-500/40 transition-all hover:scale-105 shadow-sm"
              title="Call Primary Landline"
            >
              <Phone className="w-3 h-3 text-gold-400 animate-pulse" />
              <span>Landline: 021 221 3826</span>
            </a>

            {/* WhatsApp Integration Number Block (Secondary - Directly Below) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold text-[10px] mt-0.5 transition-colors"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-2.5 h-2.5 text-emerald-400 fill-emerald-400" />
              <span>WhatsApp: +94 76 948 9016</span>
            </a>
          </div>

          {/* Google Maps Location Button */}
          <a
            href="https://maps.google.com/?q=Navatkuli+Junction,+Kaithady,+Jaffna"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-gold-400 font-medium transition-colors text-xs"
          >
            <span>{t('nav.getDirections')}</span>
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
