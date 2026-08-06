import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, ArrowRight, Star, Flame, Shield, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection({ onExploreClick }) {
  const { t } = useLanguage();

  const whatsappNumber = '94771234567';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Pearl Hotel! I would like to place an order.')}`;

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden bg-dark-950">
      
      {/* Real AI Scenery Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/ai_bg_scenery.png"
          alt="Pearl Hotel Luxury Fine Dining Scenery Background"
          className="w-full h-full object-cover object-center opacity-25 scale-105"
        />
        {/* Dark Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-dark-950/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-dark-950/60 to-dark-950" />
      </div>

      {/* Animated Glowing Orbs Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-gradient-to-b from-crimson-800/40 via-gold-600/10 to-transparent rounded-full blur-[120px]"
        />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-gold-600/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-crimson-900/30 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-800/90 border border-gold-600/30 text-gold-400 text-xs sm:text-sm font-medium tracking-wide mb-6 shadow-gold-glow"
            >
              <Sparkles className="w-4 h-4 text-gold-400 animate-spin-slow" />
              <span>{t('badge')}</span>
            </motion.div>

            {/* Restaurant Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none"
            >
              {t('heroTitlePrefix')} <span className="gold-gradient-text">{t('heroTitleSuffix')}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-lg sm:text-2xl font-medium tracking-wider text-gold-300/90 font-serif"
            >
              {t('heroSubtitle')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl font-light leading-relaxed"
            >
              {t('heroDesc')}
            </motion.p>

            {/* Action Buttons: View Menu, WhatsApp Order, Call Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full"
            >
              <Link
                to="/menu"
                className="px-8 py-4 rounded-full gold-gradient-bg text-dark-950 font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-3 shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Utensils className="w-5 h-5" />
                <span>{t('viewMenu')}</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-2xl hover:scale-105 transition-all border border-emerald-400/40"
              >
                <MessageCircle className="w-5 h-5 fill-white text-white" />
                <span>{t('orderWhatsApp')}</span>
              </a>

              <a
                href="tel:+94771234567"
                className="px-6 py-4 rounded-full bg-crimson-900/80 hover:bg-crimson-800 text-gold-300 font-bold text-sm sm:text-base tracking-wide border border-gold-500/40 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5 text-gold-400" />
                <span>+94 77 123 4567</span>
              </a>
            </motion.div>

            {/* Highlight Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 w-full max-w-lg"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-2xl font-bold text-white flex items-center gap-1">
                  4.9 <Star className="w-4 h-4 fill-gold-400 text-gold-400 inline" />
                </span>
                <span className="text-xs text-slate-400 mt-0.5">{t('topRated')}</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-2xl font-bold text-gold-400">50+</span>
                <span className="text-xs text-slate-400 mt-0.5">{t('freshDishes')}</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-2xl font-bold text-white flex items-center gap-1">
                  100% <Shield className="w-4 h-4 text-emerald-400 inline" />
                </span>
                <span className="text-xs text-slate-400 mt-0.5">{t('freshQuality')}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image Display with Glassmorphic Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Glowing Backdrop Ring */}
            <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border border-gold-500/20 bg-gradient-to-tr from-crimson-800/30 to-gold-600/10 blur-md animate-pulse-slow" />

            {/* Main Featured Dish Frame */}
            <div className="relative w-[300px] sm:w-[400px] h-[360px] sm:h-[480px] rounded-3xl overflow-hidden border-2 border-gold-500/30 shadow-2xl shadow-gold-glow group">
              <img
                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80"
                alt="Pearl Hotel Signature Dum Biriyani"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel border border-gold-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-gold-400 uppercase">Chef Signature</span>
                    <h3 className="font-serif text-lg font-bold text-white">Chicken Dum Biriyani</h3>
                    <p className="text-xs text-slate-300 mt-0.5">Rs. 1,450</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-crimson-800/80 text-gold-300 text-xs font-bold border border-gold-500/40">
                    🔥 Hot Item
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Card 1: Kottu Special */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 sm:-left-8 p-3 rounded-2xl glass-panel border border-gold-500/40 shadow-2xl flex items-center gap-3 hidden sm:flex"
            >
              <img
                src="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=200&q=80"
                alt="Sizzling Chicken Kottu"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-white font-serif">Sizzling Kottu</h4>
                <p className="text-[11px] text-gold-400 font-semibold">From Rs. 800</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Ceylon Tea */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -right-4 sm:-right-8 p-3 rounded-2xl glass-panel border border-gold-500/40 shadow-2xl flex items-center gap-3 hidden sm:flex"
            >
              <div className="w-10 h-10 rounded-xl bg-crimson-800/60 border border-gold-500/40 flex items-center justify-center text-gold-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-serif">Fresh & Hot Tea</h4>
                <p className="text-[11px] text-slate-300">Pure Ceylon Brew</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
