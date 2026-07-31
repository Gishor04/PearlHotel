import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddFoodModal from './components/AddFoodModal';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFoodAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-dark-950 text-slate-100 font-sans selection:bg-gold-500/30 selection:text-gold-400">
        <Toaster position="bottom-right" reverseOrder={false} />

        {/* Global Navigation */}
        <Navbar
          onOpenAddFood={() => setIsAddFoodOpen(true)}
        />

        {/* Main Content View */}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  key={`home-${refreshTrigger}`}
                  onOpenAddFood={() => setIsAddFoodOpen(true)}
                />
              }
            />
            <Route
              path="/menu"
              element={
                <MenuPage
                  key={`menu-${refreshTrigger}`}
                  onOpenAddFood={() => setIsAddFoodOpen(true)}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Add Food Product Modal */}
        <AddFoodModal
          isOpen={isAddFoodOpen}
          onClose={() => setIsAddFoodOpen(false)}
          onFoodAdded={handleFoodAdded}
        />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
