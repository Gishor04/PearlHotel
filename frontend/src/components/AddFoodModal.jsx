import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Camera, Leaf, Drumstick } from 'lucide-react';
import { createFood, getCategories } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

export default function AddFoodModal({ isOpen, onClose, onFoodAdded }) {
  const { t, tCategory } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Breakfast & Snacks',
    price: '',
    isAvailable: true,
    isVeg: false,
    description: '',
    imageUrl: '',
    prepTime: '15 mins',
  });

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      if (res.success && res.data.length > 0) {
        setCategories(res.data);
        setFormData((prev) => ({ ...prev, category: res.data[0].name }));
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  if (!isOpen) return null;

  // High-performance image compressor for camera photos
  const compressImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
        callback(compressedBase64);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    compressImage(file, (compressedBase64) => {
      setImagePreview(compressedBase64);
      setFormData((prev) => ({ ...prev, imageUrl: compressedBase64 }));
      toast.success('Photo ready & compressed!');
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price) {
      toast.error('Please fill in Food Name, Category, and Price.');
      return;
    }

    const finalImageUrl =
      formData.imageUrl ||
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=75';

    setLoading(true);
    try {
      const payload = {
        ...formData,
        imageUrl: finalImageUrl,
      };

      const res = await createFood(payload);
      if (res.success) {
        toast.success(t('addFood.addSuccess'), {
          icon: '👑',
          style: {
            background: '#09090b',
            color: '#fbbf24',
            border: '1px solid #d4af37',
          },
        });
        if (onFoodAdded) onFoodAdded(res.data);
        onClose();
        // Reset form
        setFormData({
          name: '',
          category: categories[0]?.name || 'Breakfast & Snacks',
          price: '',
          isAvailable: true,
          isVeg: false,
          description: '',
          imageUrl: '',
          prepTime: '15 mins',
        });
        setImagePreview('');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to add food product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-dark-900 border border-gold-500/40 rounded-3xl p-6 sm:p-8 glass-panel shadow-2xl my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-dark-800 text-slate-400 hover:text-white border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-white">{t('addFood.modalTitle')}</h2>
              <p className="text-xs text-slate-400">{t('addFood.subtitle')}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {/* Food Name & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">{t('addFood.foodName')} *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chicken Kottu"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 text-white placeholder-slate-500 focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">{t('addFood.category')} *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 text-white focus:border-gold-500 focus:outline-none"
                >
                  {categories.length > 0 ? (
                    categories.map((c) => (
                      <option key={c._id || c.name} value={c.name}>
                        {tCategory(c.name)}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Breakfast & Snacks">{tCategory('Breakfast & Snacks')}</option>
                      <option value="Tea & Beverages">{tCategory('Tea & Beverages')}</option>
                      <option value="Curries">{tCategory('Curries')}</option>
                      <option value="Meals">{tCategory('Meals')}</option>
                      <option value="Specials & Devils">{tCategory('Specials & Devils')}</option>
                      <option value="Biryani">{tCategory('Biryani')}</option>
                      <option value="Rice Table">{tCategory('Rice Table')}</option>
                      <option value="Kottu Table">{tCategory('Kottu Table')}</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Price & Prep Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">{t('addFood.price')} *</label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="e.g. 1200"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 text-white placeholder-slate-500 focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">{t('addFood.prepTime')}</label>
                <input
                  type="text"
                  placeholder="e.g. 15 mins"
                  value={formData.prepTime}
                  onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 text-white placeholder-slate-500 focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Veg vs Non-Veg Selection */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2">{t('addFood.isVeg')} *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isVeg: true })}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                    formData.isVeg
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400 shadow-md ring-2 ring-emerald-500/30'
                      : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>🌱 {t('food.veg')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isVeg: false })}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                    !formData.isVeg
                      ? 'bg-red-950/80 border-red-500 text-red-400 shadow-md ring-2 ring-red-500/30'
                      : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Drumstick className="w-4 h-4 text-red-400" />
                  <span>🥩 {t('food.nonVeg')}</span>
                </button>
              </div>
            </div>

            {/* Photo Upload Option */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2">
                {t('addFood.imageUrl')} *
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageFileChange}
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border-2 border-gold-500/50 group">
                  <img
                    src={imagePreview}
                    alt="Food Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-gold-500 text-dark-950 font-bold text-xs flex items-center gap-1.5"
                    >
                      <Camera className="w-4 h-4" />
                      Retake Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setFormData({ ...formData, imageUrl: '' });
                      }}
                      className="px-3.5 py-2 rounded-xl bg-red-800 text-white font-bold text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-36 rounded-2xl border-2 border-dashed border-gold-600/40 hover:border-gold-400 bg-dark-950/60 hover:bg-dark-950 flex flex-col items-center justify-center cursor-pointer transition-all gap-2 group"
                >
                  <div className="p-3 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 group-hover:scale-110 transition-transform">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <span className="text-slate-200 font-bold block text-xs">
                      Take Photo with Camera / Select Image
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">{t('addFood.description')}</label>
              <textarea
                rows={2}
                placeholder="Short description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 text-white placeholder-slate-500 focus:border-gold-500 focus:outline-none"
              />
            </div>

            {/* Availability Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isAvailable"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-4 h-4 rounded text-gold-500 focus:ring-gold-500 bg-dark-950 border-slate-800"
              />
              <label htmlFor="isAvailable" className="text-slate-300 font-medium cursor-pointer">
                {t('addFood.isAvailable')}
              </label>
            </div>

            {/* Form Actions */}
            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-dark-800 text-slate-300 font-semibold"
              >
                {t('addFood.cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl gold-gradient-bg text-dark-950 font-bold shadow-gold-glow hover:scale-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{loading ? 'Saving...' : t('addFood.submitAdd')}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
