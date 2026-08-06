import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col justify-between bg-dark-950 text-slate-100 font-sans selection:bg-gold-500/30 selection:text-gold-400">
          <Toaster position="bottom-right" reverseOrder={false} />

          {/* Global Navigation with top contact bar & language switcher */}
          <Navbar />

          {/* Main Content View */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Floating Actions: WhatsApp Click-to-Order & Direct Phone Call */}
          <FloatingActions />

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}
