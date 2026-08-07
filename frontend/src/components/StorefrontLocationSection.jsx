import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function StorefrontLocationSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-8">
      <div className="rounded-3xl bg-gradient-to-tr from-dark-900 via-dark-950 to-dark-900 border border-gold-600/30 overflow-hidden shadow-2xl glass-panel relative">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
          
          {/* Left Column: Real Storefront Photo Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-gold-glow group">
              <img
                src="/images/restaurant_storefront.jpg"
                alt="Pearl Hotel Physical Restaurant Location Navatkuli Jaffna"
                className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
              
              {/* Badge overlay on Image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel border border-gold-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-gold-400 uppercase">{t('storefront.liveFrontTag')}</span>
                  <h4 className="font-serif text-base font-bold text-white">{t('storefront.branchTitle')}</h4>
                  <p className="text-xs text-slate-300">{t('storefront.junctionSub')}</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Navatkuli+Junction,+Kaithady,+Jaffna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full gold-gradient-bg text-dark-950 shadow-gold-glow hover:scale-110 transition-transform"
                  title="Open Google Maps"
                >
                  <Navigation className="w-4 h-4 fill-dark-950" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Address, Phone, Hours & Directions */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-800 border border-gold-600/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>{t('storefront.ourLocation')}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
                {t('storefront.title')}
              </h2>
              <p className="mt-3 text-slate-300 text-sm font-light leading-relaxed">
                {t('storefront.description')}
              </p>
            </div>

            {/* Info Cards List */}
            <div className="w-full space-y-4 pt-2">
              
              {/* Address Card */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-dark-950/80 border border-slate-800">
                <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/30 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">{t('storefront.addressLabel')}</span>
                  <p className="text-sm font-medium text-white mt-0.5">
                    {t('storefront.fullAddress')}
                  </p>
                </div>
              </div>

              {/* Phone Call Card */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-dark-950/80 border border-slate-800">
                <div className="p-2.5 rounded-lg bg-crimson-800/20 text-red-400 border border-crimson-800/40 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">{t('storefront.phoneLabel')}</span>
                    <p className="text-sm font-bold text-white mt-0.5">{t('storefront.phoneNumbers')}</p>
                  </div>
                  <a
                    href="tel:+94771234567"
                    className="px-4 py-2 rounded-full gold-gradient-bg text-dark-950 text-xs font-bold shadow-gold-glow hover:scale-105 transition-transform"
                  >
                    {t('nav.quickCall')}
                  </a>
                </div>
              </div>

              {/* Opening Hours Card */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-dark-950/80 border border-slate-800">
                <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/30 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">{t('storefront.hoursLabel')}</span>
                  <p className="text-sm font-medium text-white mt-0.5">
                    {t('storefront.hoursDetail')}
                  </p>
                </div>
              </div>

            </div>

            {/* Google Maps Button */}
            <a
              href="https://maps.google.com/?q=Navatkuli+Junction,+Kaithady,+Jaffna"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-2xl bg-dark-800 hover:bg-dark-700 text-white font-bold text-sm border border-gold-600/40 hover:border-gold-400 flex items-center justify-center gap-2 shadow-glass transition-all"
            >
              <span>{t('storefront.openDirectionsMaps')}</span>
              <ExternalLink className="w-4 h-4 text-gold-400" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
