import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, ShieldCheck } from 'lucide-react';

export default function FoodModal({ food, onClose }) {
  if (!food) return null;

  const formatLKR = (amount) => `Rs. ${Number(amount).toLocaleString('en-LK')}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-dark-900 border border-gold-500/30 rounded-3xl overflow-hidden glass-panel shadow-2xl my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-dark-950/80 text-slate-300 hover:text-white border border-slate-700/60 hover:border-gold-500/50 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Hero Image */}
          <div className="relative w-full h-64 sm:h-80 overflow-hidden">
            <img
              src={food.imageUrl}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent" />

            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-xl bg-dark-950/90 text-gold-400 font-serif font-bold text-sm border border-gold-500/40">
                {food.category}
              </span>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-950/90 text-slate-200 text-xs font-semibold border border-slate-700">
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                  {food.rating || 4.8} / 5.0
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-950/90 text-slate-200 text-xs font-semibold border border-slate-700">
                  <Clock className="w-4 h-4 text-gold-400" />
                  {food.prepTime || '15 mins'}
                </span>
              </div>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                  {food.name}
                </h2>
                <div className="mt-2 flex items-center gap-3">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${
                    food.isVeg
                      ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                      : 'bg-red-950/60 text-red-400 border-red-500/30'
                  }`}>
                    {food.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>

                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${
                    food.isAvailable
                      ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                      : 'bg-red-950/60 text-red-400 border-red-500/30'
                  }`}>
                    {food.isAvailable ? 'Available Now' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block font-semibold">PRICE</span>
                <span className="font-serif text-2xl sm:text-3xl font-black text-gold-400">
                  {formatLKR(food.price)}
                </span>
              </div>
            </div>

            <p className="mt-6 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {food.description || 'Prepared fresh upon ordering with authentic hand-ground Ceylon spices, premium quality ingredients, and traditional cookware.'}
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-dark-950/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-gold-400 flex-shrink-0" />
              <span>Prepared in accordance with Pearl Hotel Jaffna strict food hygiene & quality standards.</span>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 flex items-center justify-end border-t border-slate-800/80 pt-6">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full gold-gradient-bg text-dark-950 font-bold text-sm shadow-gold-glow transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
