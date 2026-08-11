import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, MapPin, Phone, Clock, Heart, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark-950 border-t border-gold-600/20 text-slate-400 relative overflow-hidden pt-16 pb-8">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-crimson-800 to-gold-600 p-[1.5px]">
                <div className="w-full h-full bg-dark-950 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-gold-400" />
                </div>
              </div>
              <span className="font-serif text-2xl font-black text-white tracking-wide">
                {t('nav.brandName')}
              </span>
            </div>
            <p className="text-xs text-gold-400/90 font-serif tracking-widest uppercase font-semibold">
              {t('footer.tagline')}
            </p>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-gold-400 transition-colors">{t('nav.menu')}</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-gold-400 transition-colors flex items-center gap-1">
                  <Lock className="w-3 h-3 text-gold-400" />
                  <span>{t('nav.adminLogin')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Specialties */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">{t('footer.topSpecialties')}</h4>
            <ul className="space-y-2 text-xs font-light">
              <li className="text-slate-300">{t('footer.specialtyKottu')}</li>
              <li className="text-slate-300">{t('footer.specialtyBiryani')}</li>
              <li className="text-slate-300">{t('footer.specialtyAppam')}</li>
              <li className="text-slate-300">{t('footer.specialtyDevils')}</li>
              <li className="text-slate-300">{t('footer.specialtyTeas')}</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">{t('footer.visitContact')}</h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>{t('nav.topAddress')}</span>
            </div>
            <div className="flex flex-col gap-1.5 pl-6 border-l-2 border-gold-600/30">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <a href="tel:0212213826" className="text-gold-400 hover:underline font-bold">Landline: 021 221 3826</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-emerald-400">WhatsApp:</span>
                <a href="https://wa.me/94769489016" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-semibold">+94 76 948 9016</a>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>{t('nav.openHours')}</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & PIRA AI AURA Designer Credit */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© PEARL HOTEL Restaurant. {t('footer.rights')}</p>

          {/* PIRA AI AURA Designer Badge */}
          <div className="flex items-center gap-3 bg-dark-900/80 px-4 py-2 rounded-2xl border border-slate-800/80 shadow-md">
            <img
              src="/images/pira_ai_aura_logo.png"
              alt="PIRA AI AURA Team Logo"
              className="h-7 w-auto object-contain rounded-md"
            />
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-bold text-white tracking-wide">
                {t('footer.designedBy')}
              </span>
              <span className="text-[9px] text-slate-500 font-mono">
                {t('footer.creativeTagline')}
              </span>
            </div>
          </div>

          <p className="flex items-center gap-1 text-slate-400">
            {t('footer.craftedWith')} <Heart className="w-3.5 h-3.5 text-crimson-800 fill-crimson-800" />
          </p>
        </div>
      </div>
    </footer>
  );
}
