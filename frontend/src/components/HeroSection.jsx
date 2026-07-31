import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, ArrowRight, Star, Flame, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection({ onExploreClick }) {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-dark-950">
      {/* Animated Glowing Orbs & Radial Gradients Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
            {/* Top Crown Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-800/80 border border-gold-600/30 text-gold-400 text-xs sm:text-sm font-medium tracking-wide mb-6 shadow-gold-glow"
            >
              <Sparkles className="w-4 h-4 text-gold-400 animate-spin-slow" />
              <span>Authentic Ceylon Fine Dining & Street Specialties</span>
            </motion.div>

            {/* Restaurant Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none"
            >
              PEARL <span className="gold-gradient-text">HOTEL</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-lg sm:text-2xl font-medium tracking-wider text-gold-300/90 font-serif"
            >
              Fresh Foods • Best Taste • Premium Quality
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl font-light leading-relaxed"
            >
              Experience the pinnacle of culinary excellence. From sizzling Kottu and aromatic Dum Biriyani to crispy Appam and fiery seafood devilled specialties, crafted by master chefs.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link
                to="/menu"
                className="w-full sm:w-auto px-8 py-4 rounded-full gold-gradient-bg text-dark-950 font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-3 shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Utensils className="w-5 h-5" />
                View Menu
              </Link>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-dark-800/90 hover:bg-dark-700 text-white font-semibold text-sm sm:text-base tracking-wide border border-gold-600/40 hover:border-gold-400 flex items-center justify-center gap-3 transition-all duration-300 shadow-glass"
              >
                <span>Explore Foods</span>
                <ArrowRight className="w-5 h-5 text-gold-400" />
              </button>
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
                <span className="text-xs text-slate-400 mt-0.5">Top Rated</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-2xl font-bold text-gold-400">50+</span>
                <span className="text-xs text-slate-400 mt-0.5">Fresh Dishes</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-2xl font-bold text-white flex items-center gap-1">
                  100% <Shield className="w-4 h-4 text-emerald-400 inline" />
                </span>
                <span className="text-xs text-slate-400 mt-0.5">Fresh Ingredients</span>
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
                <h4 className="text-xs font-bold text-white font-serif">Fresh & Hot</h4>
                <p className="text-[11px] text-slate-300">Served in 15 mins</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
