import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, ArrowRight, LogOut } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('pearl_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Default admin passcode: 1234
    if (passcode.trim() === '1234' || passcode.trim() === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('pearl_admin_auth', 'true');
      toast.success(t('adminSuccess'));
    } else {
      toast.error(t('invalidPasscode'));
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pearl_admin_auth');
    toast.success('Logged out of Admin Portal');
  };

  if (isAuthenticated) {
    return (
      <div className="relative pt-24 min-h-screen bg-dark-950">
        {/* Admin Top Auth Banner */}
        <div className="bg-gradient-to-r from-crimson-900 via-dark-900 to-dark-950 border-b border-gold-600/30 py-3 px-6 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-gold-400 font-bold text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Pearl Hotel Admin Protected Portal</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-300 text-xs font-semibold border border-slate-700"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>

        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-dark-950 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-crimson-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-dark-900/90 border border-gold-500/40 rounded-3xl p-8 shadow-2xl glass-panel relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto mb-6 shadow-gold-glow">
          <Lock className="w-8 h-8" />
        </div>

        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl font-black text-white">
            {t('adminTitle')}
          </h2>
          <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
            {t('adminSubtitle')}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Admin Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-5 h-5 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Enter Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark-950 border border-slate-700 text-white font-mono text-sm focus:border-gold-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl gold-gradient-bg text-dark-950 font-bold text-sm shadow-gold-glow flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>{t('loginBtn')}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </form>
      </div>
    </div>
  );
}
