import React from 'react';
import {
  Utensils,
  Sun,
  Coffee,
  UtensilsCrossed,
  Flame,
  Soup,
  ChefHat,
  Crown,
  Sparkles,
  GlassWater,
  Grid,
} from 'lucide-react';

const categoryIconMap = {
  All: Grid,
  Breakfast: Sun,
  Tea: Coffee,
  Snacks: UtensilsCrossed,
  Curries: Flame,
  Rice: Soup,
  Kottu: ChefHat,
  Biriyani: Crown,
  'Special Meals': Sparkles,
  Drinks: GlassWater,
};

export default function CategoryFilter({ categories = [], activeCategory, onSelectCategory }) {
  const allCategoriesList = ['All', ...categories.map((c) => (typeof c === 'string' ? c : c.name))];

  return (
    <div className="w-full py-4 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-3 min-w-max px-2">
        {allCategoriesList.map((catName) => {
          const isSelected = activeCategory === catName;
          const IconComponent = categoryIconMap[catName] || Utensils;

          return (
            <button
              key={catName}
              onClick={() => onSelectCategory(catName)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                isSelected
                  ? 'gold-gradient-bg text-dark-950 shadow-gold-glow scale-105 font-bold'
                  : 'bg-dark-800/80 hover:bg-dark-700 text-slate-300 hover:text-white border border-slate-800 hover:border-gold-500/40'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isSelected ? 'text-dark-950' : 'text-gold-400'}`} />
              <span>{catName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
