import React, { useState, useEffect } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import FoodCard from '../components/FoodCard';
import FoodModal from '../components/FoodModal';
import { getFoods, getCategories } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import {
  Utensils,
  RefreshCw,
  Sun,
  Coffee,
  Flame,
  Sparkles,
  Crown,
  Soup,
  ChefHat,
  ArrowUpDown,
} from 'lucide-react';
import toast from 'react-hot-toast';

const sectionIconMap = {
  'Breakfast & Snacks': Sun,
  'Tea & Beverages': Coffee,
  Curries: Flame,
  Meals: Utensils,
  'Specials & Devils': Sparkles,
  Biryani: Crown,
  'Rice Table': Soup,
  'Kottu Table': ChefHat,
};

export default function MenuPage({ onOpenAddFood }) {
  const { t, tCategory } = useLanguage();
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [vegFilter, setVegFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [selectedFoodModal, setSelectedFoodModal] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [foodRes, catRes] = await Promise.all([getFoods(), getCategories()]);
      if (foodRes.success) setFoods(foodRes.data);
      if (catRes.success) setCategories(catRes.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
      toast.error('Failed to load menu data');
    } finally {
      setLoading(false);
    }
  };

  // Filter & Sort Logic
  let processedFoods = foods.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesVeg =
      vegFilter === 'all' ||
      (vegFilter === 'veg' && item.isVeg) ||
      (vegFilter === 'nonveg' && !item.isVeg);

    return matchesSearch && matchesVeg;
  });

  if (sortBy === 'price-low') {
    processedFoods.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    processedFoods.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    processedFoods.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  // Group foods section by section
  const availableCategories = activeCategory === 'All'
    ? categories.map((c) => c.name)
    : [activeCategory];

  const groupedSections = availableCategories.map((catName) => {
    const sectionItems = processedFoods.filter(
      (item) => item.category.toLowerCase() === catName.toLowerCase()
    );
    return {
      categoryName: catName,
      items: sectionItems,
    };
  }).filter((section) => section.items.length > 0);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight">
          {t('nav.brandName')} <span className="gold-gradient-text">{t('nav.menu')}</span>
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base font-light">
          {t('search.menuDesc')}
        </p>
      </div>

      {/* Filter and Search controls */}
      <div className="space-y-6 mb-12">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          vegFilter={vegFilter}
          onVegFilterChange={setVegFilter}
          totalResultsCount={processedFoods.length}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-center bg-dark-900 border border-slate-800 rounded-2xl px-3 py-2 text-xs">
            <ArrowUpDown className="w-4 h-4 text-gold-400" />
            <span className="text-slate-400">{t('search.sortByLabel')}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="default" className="bg-dark-900 text-white">{t('search.sortDefault')}</option>
              <option value="price-low" className="bg-dark-900 text-white">{t('search.sortPriceLow')}</option>
              <option value="price-high" className="bg-dark-900 text-white">{t('search.sortPriceHigh')}</option>
              <option value="rating" className="bg-dark-900 text-white">{t('search.sortRating')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION BY SECTION MENU GRID */}
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-slate-400">
          <RefreshCw className="w-10 h-10 text-gold-400 animate-spin mb-4" />
          <p className="font-serif text-lg font-bold text-white">Loading Menu Items...</p>
        </div>
      ) : groupedSections.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-3xl p-8 border border-slate-800">
          <Utensils className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-white">{t('search.noFoodsFound')}</h3>
          <p className="text-slate-400 text-sm mt-1">{t('search.menuDesc')}</p>
        </div>
      ) : (
        <div className="space-y-16">
          {groupedSections.map((section) => {
            const IconComponent = sectionIconMap[section.categoryName] || Utensils;

            return (
              <div key={section.categoryName} className="space-y-6 pt-4">
                {/* Section Header Banner */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-tr from-crimson-800/50 via-dark-800 to-dark-900 border border-gold-500/40 text-gold-400 shadow-gold-glow">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                        {tCategory(section.categoryName)}
                      </h3>
                      <p className="text-xs text-slate-400 font-light">
                        {section.items.length} {t('search.resultsFound')}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-dark-900 text-gold-400 border border-gold-600/30">
                    {t('nav.brandName')}
                  </span>
                </div>

                {/* Section Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                  {section.items.map((food) => (
                    <FoodCard
                      key={food._id}
                      food={food}
                      onViewDetail={setSelectedFoodModal}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedFoodModal && (
        <FoodModal
          food={selectedFoodModal}
          onClose={() => setSelectedFoodModal(null)}
        />
      )}
    </div>
  );
}
