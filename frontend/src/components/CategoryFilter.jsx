import React from 'react';
import {
  Utensils,
  Sun,
  Coffee,
  Flame,
  Soup,
  ChefHat,
  Crown,
  Sparkles,
  Grid,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const categoryIconMap = {
  All: Grid,
  'Breakfast & Snacks': Sun,
  'Tea & Beverages': Coffee,
  Curries: Flame,
  Meals: Utensils,
  'Specials & Devils': Sparkles,
  Biryani: Crown,
  'Rice Table': Soup,
  'Kottu Table': ChefHat,
};

export default function CategoryFilter({ categories = [], activeCategory, onSelectCategory }) {
  const { tCategory } = useLanguage();
  const allCategoriesList = ['All', ...categories.map((c) => (typeof c === 'string' ? c : c.name))];

  return (
    <div className="w-full py-4 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-3 min-w-max px-2">
        {allCategoriesList.map((catName) => {
          const isSelected = activeCategory === catName;
          const IconComponent = categoryIconMap[catName] || Utensils;
          const displayLabel = tCategory(catName);

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
              <span>{displayLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
