import React from 'react';
import { motion } from 'framer-motion';
import { Star, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FoodCard({ food, onViewDetail }) {
  const formatLKR = (amount) => {
    return `Rs. ${Number(amount).toLocaleString('en-LK')}`;
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=75';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '50px' }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      onClick={() => onViewDetail(food)}
      className="group relative rounded-3xl bg-dark-900/90 border border-slate-800/80 hover:border-gold-500/50 glass-panel glass-panel-hover overflow-hidden flex flex-col justify-between shadow-xl cursor-pointer"
    >
      {/* Upper Image Container */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-dark-950">
        <img
          src={food.imageUrl}
          alt={food.name}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-black/30" />

        {/* Veg / Non-Veg Indicator Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-semibold">
          {food.isVeg ? (
            <>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400">VEG</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400">NON-VEG</span>
            </>
          )}
        </div>

        {/* Availability Status Badge */}
        <div className="absolute top-3 right-3">
          {food.isAvailable ? (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Available
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-[11px] font-bold shadow-md">
              <AlertCircle className="w-3.5 h-3.5" />
              Out of Stock
            </span>
          )}
        </div>

        {/* Rating & Category Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
          <span className="px-3 py-1 rounded-lg bg-dark-950/90 text-gold-400 font-semibold border border-gold-600/30">
            {food.category}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-dark-950/90 text-slate-200 font-semibold border border-slate-800">
            <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
            {food.rating || '4.8'}
          </span>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
            {food.name}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 font-light leading-relaxed">
            {food.description || 'Authentic Sri Lankan recipe prepared with traditional Ceylon spices.'}
          </p>
        </div>

        {/* Bottom Price & View Details Action */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Price</span>
            <span className="font-serif text-2xl font-black text-gold-400">
              {formatLKR(food.price)}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail(food);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 hover:text-gold-400 border border-slate-700/80 hover:border-gold-500/50 text-xs font-semibold transition-all shadow-md"
          >
            <Eye className="w-4 h-4 text-gold-400" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
