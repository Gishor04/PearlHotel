import React, { useState } from 'react';
import { Phone, MessageCircle, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingActions() {
  const { t } = useLanguage();
  const [showCallTooltip, setShowCallTooltip] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = '94771234567';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Pearl Hotel! I would like to place an order.')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="p-2.5 rounded-full bg-dark-900/90 text-slate-300 hover:text-white border border-slate-700/60 shadow-lg transition-transform hover:scale-110 active:scale-95"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5 text-gold-400" />
      </button>

      {/* Phone Call Quick Action Button */}
      <div className="relative flex items-center">
        {showCallTooltip && (
          <div className="absolute right-14 bg-dark-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-gold-500/40 shadow-xl whitespace-nowrap animate-fade-in flex items-center gap-2">
            <span>+94 77 123 4567</span>
            <a
              href="tel:+94771234567"
              className="px-2 py-0.5 rounded bg-gold-500 text-dark-950 font-black text-[10px]"
            >
              {t('nav.quickCall')}
            </a>
          </div>
        )}
        <a
          href="tel:+94771234567"
          onMouseEnter={() => setShowCallTooltip(true)}
          onMouseLeave={() => setShowCallTooltip(false)}
          className="p-3.5 rounded-full bg-gradient-to-tr from-amber-600 to-gold-500 text-dark-950 shadow-gold-glow hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
          aria-label="Call Pearl Hotel"
        >
          <Phone className="w-6 h-6 fill-dark-950 stroke-none group-hover:rotate-12 transition-transform" />
        </a>
      </div>

      {/* WhatsApp Click-to-Order Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-400/40 group"
        aria-label="Order via WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white fill-white group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline font-sans tracking-wide">{t('nav.orderWhatsApp')}</span>
      </a>

    </div>
  );
}
