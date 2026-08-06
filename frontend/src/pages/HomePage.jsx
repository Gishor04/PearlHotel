import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import FoodCard from '../components/FoodCard';
import FoodModal from '../components/FoodModal';
import StorefrontLocationSection from '../components/StorefrontLocationSection';
import CustomerReviews from '../components/CustomerReviews';
import { getFoods, getCategories } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  Utensils,
  Flame,
  Award,
  RefreshCw,
  ChefHat,
  Crown,
  Coffee,
  Sun,
  Soup,
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

export default function HomePage() {
  const { t } = useLanguage();
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [vegFilter, setVegFilter] = useState('all');
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
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter foods by live search and veg status
  const filteredFoods = foods.filter((item) => {
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

  // Group foods section by section
  const availableCategories = activeCategory === 'All'
    ? categories.map((c) => c.name)
    : [activeCategory];

  const groupedSections = availableCategories.map((catName) => {
    const sectionItems = filteredFoods.filter(
      (item) => item.category.toLowerCase() === catName.toLowerCase()
    );
    return {
      categoryName: catName,
      items: sectionItems,
    };
  }).filter((section) => section.items.length > 0);

  const handleScrollToMenu = () => {
    const el = document.getElementById('food-menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-950">
      
      {/* Hero Section */}
      <HeroSection onExploreClick={handleScrollToMenu} />

      {/* Real Physical Storefront Location Section */}
      <StorefrontLocationSection />

      {/* Main Food Explorer & Section by Section Menu */}
      <section id="food-menu-section" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-800 border border-gold-600/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <ChefHat className="w-4 h-4 text-gold-400" />
            <span>{t('menuBadge')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('ourMenuTitle')} <span className="gold-gradient-text">{t('ourMenuHighlight')}</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-light">
            {t('menuDesc')}
          </p>
        </div>

        {/* Live Search & Category Filter Bar */}
        <div className="space-y-6 mb-12">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            vegFilter={vegFilter}
            onVegFilterChange={setVegFilter}
            totalResultsCount={filteredFoods.length}
          />

          {/* Interactive Category Filter Pills */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* Loading Spinner / Empty State / Section by Section Display */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-slate-400">
            <RefreshCw className="w-10 h-10 text-gold-400 animate-spin mb-4" />
            <p className="font-serif text-lg font-bold text-white">Loading Pearl Hotel Menu...</p>
          </div>
        ) : groupedSections.length === 0 ? (
          <div className="py-20 text-center glass-panel rounded-3xl p-8 border border-slate-800">
            <Utensils className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-white">{t('noFoodsFound')}</h3>
            <p className="text-slate-400 text-sm mt-1">
              No matching items for "{searchTerm}" in category "{activeCategory}".
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All');
                setVegFilter('all');
              }}
              className="mt-6 px-6 py-2.5 rounded-full gold-gradient-bg text-dark-950 font-bold text-xs shadow-gold-glow"
            >
              {t('resetFilters')}
            </button>
          </div>
        ) : (
          /* SECTION BY SECTION CONTAINER */
          <div className="space-y-16">
            {groupedSections.map((section) => {
              const IconComponent = sectionIconMap[section.categoryName] || Utensils;

              return (
                <div key={section.categoryName} className="space-y-6 pt-4">
                  {/* Section Title Banner */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-gradient-to-tr from-crimson-800/50 via-dark-800 to-dark-900 border border-gold-500/40 text-gold-400 shadow-gold-glow">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                          {section.categoryName}
                        </h3>
                        <p className="text-xs text-slate-400 font-light">
                          {section.items.length} authentic dishes in this section
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-dark-900 text-gold-400 border border-gold-600/30 hidden sm:inline-block">
                      PEARL HOTEL
                    </span>
                  </div>

                  {/* Cards Grid for this Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                    {section.items.map((food) => (
                      <FoodCard
                        key={food._id || food.name}
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
      </section>

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* Featured Banner Section */}
      <section className="py-20 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 border-y border-gold-600/20 my-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-dark-950/80 border border-slate-800 glass-panel flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Master Culinary Chefs</h3>
            <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
              Every Kottu, Biryani, and Curry is cooked to order using authentic traditional Jaffna recipes.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-dark-950/80 border border-slate-800 glass-panel flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-crimson-800/20 border border-crimson-800/40 flex items-center justify-center text-red-400 mb-4">
              <Flame className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">100% Fresh Daily</h3>
            <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
              We source fresh market produce, sea prawns, ocean squid, and fresh Ceylon meats daily for maximum taste.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-dark-950/80 border border-slate-800 glass-panel flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Ceylon Fine Dining</h3>
            <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
              Section by section menu browsing, dark luxury aesthetic, and instant WhatsApp ordering.
            </p>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedFoodModal && (
        <FoodModal
          food={selectedFoodModal}
          onClose={() => setSelectedFoodModal(null)}
        />
      )}
    </div>
  );
}
