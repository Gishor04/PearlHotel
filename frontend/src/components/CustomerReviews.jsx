import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, ShieldCheck, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

const initialReviews = [
  {
    id: 1,
    name: 'Santhosh Raj',
    locationKey: 'reviews.item1.location',
    dateKey: 'reviews.item1.date',
    commentKey: 'reviews.item1.comment',
    dishKey: 'reviews.item1.dish',
    defaultLocation: 'Jaffna Town',
    defaultDate: '2 days ago',
    defaultComment: 'Best Chicken Kottu in Jaffna! The godamba roti is super fresh, perfectly shredded with hot spicy gravy. Ceylon Milk Tea afterwards was top notch!',
    defaultDish: 'Chicken Kottu & Ceylon Milk Tea',
    verified: true,
  },
  {
    id: 2,
    name: 'Priya Loganathan',
    locationKey: 'reviews.item2.location',
    dateKey: 'reviews.item2.date',
    commentKey: 'reviews.item2.comment',
    dishKey: 'reviews.item2.dish',
    defaultLocation: 'Nallur',
    defaultDate: '1 week ago',
    defaultComment: 'Ordered Chicken Dum Biriyani and Paal Appam. Delivered steaming hot via WhatsApp order. Rich authentic taste with generous chicken portions.',
    defaultDish: 'Chicken Dum Biriyani',
    verified: true,
  },
  {
    id: 3,
    name: 'Dilshan Silva',
    locationKey: 'reviews.item3.location',
    dateKey: 'reviews.item3.date',
    commentKey: 'reviews.item3.comment',
    dishKey: 'reviews.item3.dish',
    defaultLocation: 'Colombo (Tourist)',
    defaultDate: '2 weeks ago',
    defaultComment: 'Stopped by Pearl Hotel at Navatkuli junction while driving on A9 road. Outstanding seafood devil prawns and fresh King Coconut! Must visit.',
    defaultDish: 'Prawns Devil & Thambili',
    verified: true,
  },
  {
    id: 4,
    name: 'Kavitha S.',
    locationKey: 'reviews.item4.location',
    dateKey: 'reviews.item4.date',
    commentKey: 'reviews.item4.comment',
    dishKey: 'reviews.item4.dish',
    defaultLocation: 'Kaithady',
    defaultDate: '3 weeks ago',
    defaultComment: 'Egg Appam with Pol Sambol for breakfast was amazing. Quick service and very clean environment. Their Cardamom Special Tea is aromatic!',
    defaultDish: 'Egg Appam & Cardamom Tea',
    verified: true,
  },
];

export default function CustomerReviews() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: '',
    dish: '',
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      toast.error('Please enter your name and review comment.');
      return;
    }

    const reviewObj = {
      id: Date.now(),
      name: newReview.name,
      defaultLocation: 'Verified Diner',
      rating: Number(newReview.rating),
      defaultDate: 'Just now',
      defaultComment: newReview.comment,
      defaultDish: newReview.dish || 'Pearl Hotel Dish',
      verified: true,
    };

    setReviews([reviewObj, ...reviews]);
    setIsModalOpen(false);
    setNewReview({ name: '', rating: 5, comment: '', dish: '' });
    toast.success(t('reviews.reviewSubmitted'));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80 my-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="text-center md:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-800 border border-gold-600/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
            <span>{t('reviews.badge')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('reviews.title')}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base font-light">
            {t('reviews.subtitle')}
          </p>
        </div>

        {/* Rating Overview Card & Add Review CTA */}
        <div className="flex items-center gap-4 bg-dark-900/90 p-4 sm:p-5 rounded-2xl border border-gold-500/30 glass-panel shadow-gold-glow">
          <div className="text-center pr-4 border-r border-slate-800">
            <span className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-400">4.9</span>
            <div className="flex items-center justify-center gap-0.5 mt-1 text-gold-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
              ))}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">{t('reviews.basedOn')}</span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl gold-gradient-bg text-dark-950 font-bold text-xs shadow-gold-glow hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{t('reviews.writeReview')}</span>
          </button>
        </div>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((rev) => {
          const locationText = rev.locationKey ? t(rev.locationKey) : (rev.defaultLocation || 'Verified Diner');
          const dateText = rev.dateKey ? t(rev.dateKey) : (rev.defaultDate || 'Just now');
          const commentText = rev.commentKey ? t(rev.commentKey) : rev.defaultComment;
          const dishText = rev.dishKey ? t(rev.dishKey) : rev.defaultDish;

          return (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800/80 glass-panel flex flex-col justify-between hover:border-gold-500/40 transition-all group"
            >
              <div>
                {/* Header with name & stars */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-serif text-base font-bold text-white group-hover:text-gold-400 transition-colors">
                      {rev.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-light flex items-center gap-1">
                      {locationText} • <span className="text-slate-500">{dateText}</span>
                    </span>
                  </div>
                  {rev.verified && (
                    <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" title={t('reviews.verifiedCustomer')}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 text-gold-400 mb-3">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                  "{commentText}"
                </p>
              </div>

              {/* Dish Tag */}
              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <span className="text-gold-400/90 font-medium">🍽️ {dishText}</span>
                <ThumbsUp className="w-3.5 h-3.5 text-slate-500" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-dark-900 border border-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-dark-800"
            >
              ✕
            </button>

            <h3 className="font-serif text-2xl font-bold text-white mb-1">
              {t('reviews.addReviewTitle')}
            </h3>
            <p className="text-xs text-slate-400 mb-6">{t('reviews.addReviewSubtitle')}</p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('reviews.yourName')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('reviews.yourNamePlaceholder')}
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-slate-700 text-white text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('reviews.ratingLabel')}</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-slate-700 text-white text-sm focus:border-gold-500 focus:outline-none"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                  <option value={3}>⭐⭐⭐ (3/5)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('reviews.dishOrdered')}</label>
                <input
                  type="text"
                  placeholder={t('reviews.dishPlaceholder')}
                  value={newReview.dish}
                  onChange={(e) => setNewReview({ ...newReview, dish: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-slate-700 text-white text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('reviews.yourReview')}</label>
                <textarea
                  required
                  rows={3}
                  placeholder={t('reviews.reviewPlaceholder')}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-slate-700 text-white text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-dark-800 text-slate-300 text-xs font-bold hover:bg-dark-700"
                >
                  {t('reviews.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl gold-gradient-bg text-dark-950 text-xs font-bold shadow-gold-glow"
                >
                  {t('reviews.submitReview')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
