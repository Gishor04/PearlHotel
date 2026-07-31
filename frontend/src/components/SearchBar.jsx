import React from 'react';
import { Search, X, Leaf, Drumstick, SlidersHorizontal } from 'lucide-react';

export default function SearchBar({
  searchTerm,
  onSearchChange,
  vegFilter,
  onVegFilterChange,
  totalResultsCount = 0,
}) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-4 bg-dark-900/80 p-4 rounded-3xl border border-gold-600/20 glass-panel shadow-2xl">
      {/* Live Search Input */}
      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by food name, category (e.g., Kottu, Biriyani, Tea)..."
          className="w-full pl-12 pr-10 py-3 rounded-2xl bg-dark-950/90 text-white placeholder-slate-400 border border-slate-800 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm sm:text-base transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Options (Veg / Non-Veg / All) */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
        <div className="flex items-center gap-1 p-1 bg-dark-950 rounded-2xl border border-slate-800">
          <button
            onClick={() => onVegFilterChange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              vegFilter === 'all'
                ? 'bg-gold-500 text-dark-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => onVegFilterChange('veg')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              vegFilter === 'veg'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            Veg Only
          </button>
          <button
            onClick={() => onVegFilterChange('nonveg')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              vegFilter === 'nonveg'
                ? 'bg-crimson-800 text-white font-bold'
                : 'text-slate-400 hover:text-red-400'
            }`}
          >
            <Drumstick className="w-3.5 h-3.5 text-red-400" />
            Non-Veg
          </button>
        </div>

        <div className="text-xs text-slate-400 font-medium px-2 whitespace-nowrap">
          <span className="text-gold-400 font-bold">{totalResultsCount}</span> dishes
        </div>
      </div>
    </div>
  );
}
