import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Utensils, AlertCircle, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

export default function QuickOrderModal({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  if (!isOpen) return null;

  const formatLKR = (amount) => `Rs. ${Number(amount).toLocaleString('en-LK')}`;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceDraftOrder = () => {
    toast.success('Order Submitted! Payment Status: NOT PAID (Pay at counter)', {
      duration: 5000,
      icon: '📝',
      style: {
        background: '#09090b',
        color: '#fbbf24',
        border: '1px solid #d4af37',
      },
    });
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-dark-950/80 backdrop-blur-md">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-dark-900 border-l border-gold-600/30 flex flex-col justify-between shadow-2xl glass-panel"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-white">Your Order Tray</h2>
                <p className="text-xs text-slate-400">Unpaid Table Draft Selection</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-dark-800 text-slate-400 hover:text-white border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unpaid Badge Notice */}
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center gap-2.5 text-xs text-amber-300">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Payment Status: NOT PAID</strong> (Direct counter payment only).
            </span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 my-12">
                <Utensils className="w-12 h-12 text-slate-600 mb-3" />
                <p className="font-serif text-base font-bold text-slate-300">Your Order Tray is Empty</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Browse our menu and select Ceylon Kottu, Biriyani, Appam, or Teas to add to your tray.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-950/80 border border-slate-800 gap-3"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-white truncate">{item.name}</h4>
                    <p className="text-xs text-gold-400 font-semibold">{formatLKR(item.price)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-dark-800 p-1 rounded-xl border border-slate-700">
                      <button
                        onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                        className="p-1 text-slate-300 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                        className="p-1 text-slate-300 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item._id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-dark-950/90 space-y-4">
              <div className="flex items-center justify-between text-slate-300 text-sm font-medium">
                <span>Subtotal (Not Paid)</span>
                <span className="font-serif text-xl font-bold text-gold-400">{formatLKR(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={onClearCart}
                  className="px-4 py-3 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-red-400 text-xs font-semibold border border-slate-700 transition-all"
                >
                  Clear All
                </button>

                <button
                  onClick={handlePlaceDraftOrder}
                  className="flex-1 py-3 px-6 rounded-xl gold-gradient-bg text-dark-950 font-bold text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span>Submit Order (Not Paid)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
