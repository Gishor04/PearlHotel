import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Utensils,
  Grid,
  Search,
  CheckCircle,
  XCircle,
  RefreshCw,
  X,
} from 'lucide-react';
import {
  getFoods,
  createFood,
  updateFood,
  deleteFood,
  toggleAvailability,
  getCategories,
  createCategory,
  deleteCategory,
} from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { t, tCategory, tFood } = useLanguage();
  const [activeTab, setActiveTab] = useState('foods'); // 'foods' | 'categories'
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  // Add/Edit Food Form State
  const [foodForm, setFoodForm] = useState({
    name: '',
    category: 'Breakfast & Snacks',
    price: '',
    isAvailable: true,
    isVeg: false,
    description: '',
    imageUrl: '',
    prepTime: '15 mins',
  });

  // Add Category Form State
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [foodRes, catRes] = await Promise.all([getFoods(), getCategories()]);
      if (foodRes.success) setFoods(foodRes.data);
      if (catRes.success) setCategories(catRes.data);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin management data');
    } finally {
      setLoading(false);
    }
  };

  // Open Add Food Modal
  const handleOpenAddFood = () => {
    setFoodForm({
      name: '',
      category: categories[0]?.name || 'Breakfast & Snacks',
      price: '',
      isAvailable: true,
      isVeg: false,
      description: '',
      imageUrl: '',
      prepTime: '15 mins',
    });
    setIsAddFoodOpen(true);
  };

  // Open Edit Food Modal
  const handleOpenEditFood = (food) => {
    setEditingFood(food);
    setFoodForm({
      name: food.name,
      category: food.category,
      price: food.price,
      isAvailable: food.isAvailable,
      isVeg: food.isVeg,
      description: food.description || '',
      imageUrl: food.imageUrl,
      prepTime: food.prepTime || '15 mins',
    });
  };

  // Submit Add or Edit Food
  const handleSaveFood = async (e) => {
    e.preventDefault();
    if (!foodForm.name || !foodForm.category || !foodForm.price || !foodForm.imageUrl) {
      toast.error('Please fill in Name, Category, Price, and Image URL.');
      return;
    }

    try {
      if (editingFood) {
        const res = await updateFood(editingFood._id, foodForm);
        if (res.success) {
          toast.success(t('addFood.updateSuccess'));
          setEditingFood(null);
          fetchAdminData();
        }
      } else {
        const res = await createFood(foodForm);
        if (res.success) {
          toast.success(t('addFood.addSuccess'));
          setIsAddFoodOpen(false);
          fetchAdminData();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  // Quick Toggle Availability
  const handleToggleAvailability = async (id, currentName) => {
    try {
      const res = await toggleAvailability(id);
      if (res.success) {
        toast.success(`Availability toggled!`);
        setFoods(foods.map((f) => (f._id === id ? { ...f, isAvailable: !f.isAvailable } : f)));
      }
    } catch (error) {
      toast.error('Failed to toggle availability');
    }
  };

  // Delete Food Item
  const handleDeleteFood = async (id, name) => {
    if (window.confirm(`${t('admin.deleteConfirmTitle')} (${name})`)) {
      try {
        const res = await deleteFood(id);
        if (res.success) {
          toast.success(t('admin.deleteSuccess'));
          setFoods(foods.filter((f) => f._id !== id));
        }
      } catch (error) {
        toast.error('Failed to delete food item');
      }
    }
  };

  // Submit Add Category
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!categoryForm.name) {
      toast.error('Category name is required');
      return;
    }
    try {
      const res = await createCategory(categoryForm);
      if (res.success) {
        toast.success(`Created category ${categoryForm.name}!`);
        setIsAddCategoryOpen(false);
        setCategoryForm({ name: '', description: '' });
        fetchAdminData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create category');
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id, name) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      try {
        const res = await deleteCategory(id);
        if (res.success) {
          toast.success(`Deleted category ${name}`);
          setCategories(categories.filter((c) => c._id !== id));
        }
      } catch (error) {
        toast.error('Failed to delete category');
      }
    }
  };

  const filteredFoodsAdmin = foods.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-3xl bg-dark-900 border border-gold-600/30 glass-panel shadow-2xl mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-crimson-800/40 border border-gold-500/40 text-gold-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              {t('nav.brandName')} <span className="gold-gradient-text">{t('admin.dashboardTitle')}</span>
            </h1>
            <p className="text-xs text-slate-400">
              {t('admin.authSubtitle')}
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('foods')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'foods'
                ? 'gold-gradient-bg text-dark-950 shadow-gold-glow'
                : 'bg-dark-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <Utensils className="w-4 h-4" />
            {t('admin.tabFoods')} ({foods.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'categories'
                ? 'gold-gradient-bg text-dark-950 shadow-gold-glow'
                : 'bg-dark-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <Grid className="w-4 h-4" />
            {t('admin.tabCategories')} ({categories.length})
          </button>
        </div>
      </div>

      {/* FOODS TAB */}
      {activeTab === 'foods' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:border-gold-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleOpenAddFood}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl gold-gradient-bg text-dark-950 font-bold text-xs shadow-gold-glow hover:scale-105 transition-transform"
            >
              <Plus className="w-4 h-4" />
              <span>{t('admin.addNewFood')}</span>
            </button>
          </div>

          {/* Foods Table */}
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 text-gold-400 animate-spin mx-auto mb-2" />
              <p>Loading Food Products...</p>
            </div>
          ) : (
            <div className="rounded-3xl bg-dark-900/80 border border-slate-800 overflow-hidden glass-panel shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-dark-950 text-slate-400 uppercase font-serif border-b border-slate-800">
                    <tr>
                      <th className="py-4 px-6">{t('admin.tableName')}</th>
                      <th className="py-4 px-4">{t('admin.tableCategory')}</th>
                      <th className="py-4 px-4">{t('admin.tablePrice')}</th>
                      <th className="py-4 px-4">{t('admin.tableVeg')}</th>
                      <th className="py-4 px-4">{t('admin.tableStatus')}</th>
                      <th className="py-4 px-6 text-right">{t('admin.tableActions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    {filteredFoodsAdmin.map((item) => {
                      const translated = tFood(item);
                      return (
                        <tr key={item._id} className="hover:bg-dark-800/50 transition-colors">
                          {/* Food Name & Thumbnail */}
                          <td className="py-3.5 px-6 flex items-center gap-3">
                            <img
                              src={item.imageUrl}
                              alt={translated.name}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                            />
                            <div>
                              <span className="font-serif font-bold text-sm text-white block">
                                {translated.name}
                              </span>
                              <span className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                                {translated.description}
                              </span>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3.5 px-4 font-semibold text-gold-400">
                            {tCategory(item.category)}
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4 font-serif font-bold text-white text-sm">
                            Rs. {Number(item.price).toLocaleString('en-LK')}
                          </td>

                          {/* Type */}
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                                item.isVeg
                                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                                  : 'bg-red-950/60 text-red-400 border-red-500/30'
                              }`}
                            >
                              {item.isVeg ? t('food.veg') : t('food.nonVeg')}
                            </span>
                          </td>

                          {/* Availability Toggle */}
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => handleToggleAvailability(item._id, item.name)}
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border transition-all ${
                                item.isAvailable
                                  ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/80'
                                  : 'bg-red-950/80 border-red-500/40 text-red-400 hover:bg-red-900/80'
                              }`}
                            >
                              {item.isAvailable ? (
                                <>
                                  <CheckCircle className="w-3 h-3" />
                                  {t('food.available')}
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3 h-3" />
                                  {t('food.outOfStock')}
                                </>
                              )}
                            </button>
                          </td>

                          {/* Edit / Delete Buttons */}
                          <td className="py-3.5 px-6 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditFood(item)}
                              className="p-2 rounded-xl bg-dark-800 hover:bg-gold-500/20 text-slate-300 hover:text-gold-400 border border-slate-700 transition-colors"
                              title={t('admin.actionEdit')}
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteFood(item._id, item.name)}
                              className="p-2 rounded-xl bg-dark-800 hover:bg-red-900/30 text-slate-300 hover:text-red-400 border border-slate-700 transition-colors"
                              title={t('admin.actionDelete')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CATEGORIES TAB */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-white">{t('admin.tabCategories')}</h3>
            <button
              onClick={() => setIsAddCategoryOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl gold-gradient-bg text-dark-950 font-bold text-xs shadow-gold-glow"
            >
              <Plus className="w-4 h-4" />
              <span>{t('admin.addNewCategory')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="p-5 rounded-2xl bg-dark-900 border border-slate-800 glass-panel flex items-center justify-between"
              >
                <div>
                  <h4 className="font-serif text-base font-bold text-white">{tCategory(cat.name)}</h4>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    {cat.description || 'Category for menu organization'}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteCategory(cat._id, cat.name)}
                  className="p-2 rounded-xl bg-dark-800 hover:bg-red-900/40 text-slate-400 hover:text-red-400 border border-slate-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD / EDIT FOOD MODAL */}
      {(isAddFoodOpen || editingFood) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-dark-900 border border-gold-600/30 rounded-3xl p-6 sm:p-8 glass-panel shadow-2xl my-8">
            <button
              onClick={() => {
                setIsAddFoodOpen(false);
                setEditingFood(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-dark-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl font-bold text-white mb-6">
              {editingFood ? t('addFood.editTitle') : t('addFood.modalTitle')}
            </h2>

            <form onSubmit={handleSaveFood} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">{t('addFood.foodName')} *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Special Chicken Kottu"
                    value={foodForm.name}
                    onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">{t('addFood.category')} *</label>
                  <select
                    value={foodForm.category}
                    onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 text-white focus:border-gold-500 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c._id || c.name} value={c.name}>
                        {tCategory(c.name)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">{t('addFood.price')} *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1200"
                    value={foodForm.price}
                    onChange={(e) => setFoodForm({ ...foodForm, price: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">{t('addFood.prepTime')}</label>
                  <input
                    type="text"
                    placeholder="e.g. 15-20 mins"
                    value={foodForm.prepTime}
                    onChange={(e) => setFoodForm({ ...foodForm, prepTime: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">{t('addFood.imageUrl')} *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={foodForm.imageUrl}
                  onChange={(e) => setFoodForm({ ...foodForm, imageUrl: e.target.value })}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">{t('addFood.description')}</label>
                <textarea
                  rows={3}
                  placeholder="Short description..."
                  value={foodForm.description}
                  onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={foodForm.isVeg}
                    onChange={(e) => setFoodForm({ ...foodForm, isVeg: e.target.checked })}
                    className="w-4 h-4 rounded text-gold-500 focus:ring-gold-500"
                  />
                  <span className="text-slate-300 font-medium">{t('addFood.isVeg')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={foodForm.isAvailable}
                    onChange={(e) => setFoodForm({ ...foodForm, isAvailable: e.target.checked })}
                    className="w-4 h-4 rounded text-gold-500 focus:ring-gold-500"
                  />
                  <span className="text-slate-300 font-medium">{t('addFood.isAvailable')}</span>
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddFoodOpen(false);
                    setEditingFood(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-dark-800 text-slate-300 font-semibold"
                >
                  {t('addFood.cancel')}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl gold-gradient-bg text-dark-950 font-bold shadow-gold-glow"
                >
                  {editingFood ? t('addFood.submitUpdate') : t('addFood.submitAdd')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CATEGORY MODAL */}
      {isAddCategoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-dark-900 border border-gold-600/30 rounded-3xl p-6 glass-panel shadow-2xl">
            <button
              onClick={() => setIsAddCategoryOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-dark-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-xl font-bold text-white mb-4">{t('admin.addNewCategory')}</h2>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Desserts"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Short category summary"
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddCategoryOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-dark-800 text-slate-300 font-semibold"
                >
                  {t('addFood.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl gold-gradient-bg text-dark-950 font-bold shadow-gold-glow"
                >
                  {t('admin.addNewCategory')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
