import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import ta from '../locales/ta.json';
import si from '../locales/si.json';

const LanguageContext = createContext();

const resources = { en, ta, si };

// Helper to get nested value from object by dot path e.g. "nav.home"
const getNestedValue = (obj, path) => {
  if (!obj || !path) return undefined;
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  return current;
};

// Normalize string for fuzzy matching e.g. "Veg Roll" -> "vegroll"
const normalizeKey = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('pearl_language') || 'en';
  });

  const changeLanguage = (lang) => {
    if (resources[lang]) {
      setLanguage(lang);
      localStorage.setItem('pearl_language', lang);
    }
  };

  // Main translation function using dot-notation keys e.g. t('nav.home')
  const t = (path, fallback = '') => {
    const activeDict = resources[language];
    let val = getNestedValue(activeDict, path);

    if (val === undefined) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[i18n Warning] Missing key "${path}" for locale "${language}".`);
      }
      val = getNestedValue(resources.en, path);
    }

    if (val === undefined) {
      return fallback || path;
    }

    return val;
  };

  // Dynamic Category Translator
  const tCategory = (catName) => {
    if (!catName) return catName;
    const activeDict = resources[language] || resources.en;
    const catDict = activeDict.categories || {};
    const enCatDict = resources.en.categories || {};

    if (catDict[catName]) return catDict[catName];

    // Fuzzy match
    const norm = normalizeKey(catName);
    const matchedKey = Object.keys(catDict).find((k) => normalizeKey(k) === norm);
    if (matchedKey) return catDict[matchedKey];

    const enMatchedKey = Object.keys(enCatDict).find((k) => normalizeKey(k) === norm);
    if (enMatchedKey) return enCatDict[enMatchedKey];

    return catName;
  };

  // Dynamic Food Translator with 100% Normalized Matching
  const tFood = (food) => {
    if (!food) return food;
    const rawName = food.name || '';
    const activeDict = resources[language] || resources.en;
    const foodItems = activeDict.foodItems || {};
    const enFoodItems = resources.en.foodItems || {};

    // 1. Direct key match
    let entry = foodItems[rawName];

    // 2. Normalized fuzzy match
    if (!entry) {
      const normRaw = normalizeKey(rawName);
      const matchedKey = Object.keys(foodItems).find(
        (k) => normalizeKey(k) === normRaw
      );
      if (matchedKey) {
        entry = foodItems[matchedKey];
      }
    }

    // 3. Fallback to English dictionary entry if target language missing
    let fallbackEntry = enFoodItems[rawName];
    if (!fallbackEntry) {
      const normRaw = normalizeKey(rawName);
      const matchedKey = Object.keys(enFoodItems).find(
        (k) => normalizeKey(k) === normRaw
      );
      if (matchedKey) {
        fallbackEntry = enFoodItems[matchedKey];
      }
    }

    const name = entry?.name || fallbackEntry?.name || food.name;
    const description = entry?.description || fallbackEntry?.description || food.description;

    return {
      ...food,
      name,
      description,
      category: tCategory(food.category),
    };
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, tCategory, tFood }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
