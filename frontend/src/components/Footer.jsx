import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, MapPin, Phone, Clock, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-gold-600/20 text-slate-400 relative overflow-hidden pt-16 pb-8">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-crimson-800 to-gold-600 p-[1.5px]">
                <div className="w-full h-full bg-dark-950 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-gold-400" />
                </div>
              </div>
              <span className="font-serif text-2xl font-black text-white tracking-wide">
                PEARL HOTEL
              </span>
            </div>
            <p className="text-xs text-gold-400/90 font-serif tracking-widest uppercase font-semibold">
              Fresh Foods • Best Taste • Premium Quality
            </p>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Experience modern luxury dining and classic Ceylon street flavors. From hand-crafted Kottu and authentic Dum Biriyani to golden Appam and Ceylon tea.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-gold-400 transition-colors">Full Food Menu</Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Top Cuisine</h4>
            <ul className="space-y-2 text-xs font-light">
              <li className="text-slate-300">Sizzling Chicken & Beef Kottu</li>
              <li className="text-slate-300">Dum Biriyani & Special Meals</li>
              <li className="text-slate-300">Authentic Egg & Milk Appam</li>
              <li className="text-slate-300">Devilled Prawns, Squid & Chicken</li>
              <li className="text-slate-300">Ceylon Black & Milk Teas</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Visit & Contact</h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>No: 82, A9 Road, Navatkuli Junction, Kaithady, Jaffna</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>0212 213 826</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>Open Daily: 6:00 AM – 11:30 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 PEARL HOTEL Restaurant. All Rights Reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-crimson-800 fill-crimson-800" /> for Authentic Ceylon Food Lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
