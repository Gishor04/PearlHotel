import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Header & Nav
    topAddress: 'No: 82, A9 Road, Navatkuli Junction, Kaithady, Jaffna',
    openHours: 'Open Daily: 6:00 AM – 10:30 PM',
    callUs: 'Call: +94 77 123 4567',
    home: 'Home',
    menu: 'Menu & Foods',
    adminLogin: 'Admin Portal',
    getDirections: 'Location & Map',
    orderWhatsApp: 'Order via WhatsApp',
    quickCall: 'Call Now',

    // Hero Section
    badge: 'Authentic Ceylon Fine Dining & Street Specialties',
    heroTitlePrefix: 'PEARL',
    heroTitleSuffix: 'HOTEL',
    heroSubtitle: 'Fresh Foods • Best Taste • Premium Quality',
    heroDesc: 'Experience authentic Jaffna cuisine. From sizzling Kottu and aromatic Dum Biriyani to crispy Appam and Ceylon teas, prepared fresh daily.',
    viewMenu: 'View Menu',
    exploreFoods: 'Explore Foods',
    topRated: 'Top Rated',
    freshDishes: '50+ Dishes',
    freshQuality: '100% Fresh',

    // Storefront Section
    ourLocation: 'Visit Our Restaurant',
    storefrontTitle: 'Experience Pearl Hotel Live',
    storefrontDesc: 'Located conveniently at Navatkuli Junction along A9 road, Jaffna. Visit us for live hot Kottu, Appam, Ceylon tea & comfortable dining.',
    addressLabel: 'Address:',
    phoneLabel: 'Phone:',
    hoursLabel: 'Opening Hours:',

    // Menu Section
    menuBadge: 'Pearl Hotel Jaffna Menu',
    ourMenuTitle: 'Our Menu',
    ourMenuHighlight: 'Section by Section',
    menuDesc: 'Browse authentic dishes categorized section by section. Select any category pill to filter directly.',
    searchPlaceholder: 'Search dishes, ingredients...',
    allCategories: 'All Categories',
    all: 'All',
    vegOnly: 'Veg Only',
    nonVegOnly: 'Non-Veg Only',
    noFoodsFound: 'No Food Items Found',
    resetFilters: 'Reset Filters',

    // Food Card & Modal
    veg: 'Veg',
    nonVeg: 'Non-Veg',
    prepTime: 'Prep:',
    viewDetails: 'View Details',
    orderNow: 'Order Now',
    whatsappOrderMessage: 'Hello Pearl Hotel! I would like to order:',

    // Admin Wall
    adminTitle: 'Admin Authentication',
    adminSubtitle: 'Enter admin passcode to manage menu products & categories',
    passcodePlaceholder: 'Enter Admin Passcode',
    loginBtn: 'Login to Admin',
    invalidPasscode: 'Incorrect admin passcode!',
    adminSuccess: 'Welcome to Pearl Hotel Admin Dashboard',

    // Reviews
    reviewsBadge: 'Customer Feedback',
    reviewsTitle: 'What Our Diners Say',
    avgRating: '4.9 out of 5',
    basedOn: 'based on 850+ Jaffna diners',
    writeReview: 'Write a Review',
    addReviewTitle: 'Share Your Dining Experience',
    yourName: 'Your Name',
    yourReview: 'Your Review',
    ratingLabel: 'Rating (1 to 5 Stars)',
    submitReview: 'Submit Review',
    reviewSubmitted: 'Thank you for your review!',

    // Footer
    footerDesc: 'Jaffna’s premier dining venue serving authentic Kottu, Biriyani, Ceylon teas, and Sri Lankan specialties.',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    rights: 'All Rights Reserved. Pearl Hotel Restaurant.'
  },

  ta: {
    // Header & Nav
    topAddress: 'இல: 82, A9 வீதி, நாவற்குழி சந்தி, கைதடி, யாழ்ப்பாணம்',
    openHours: 'தினமும் திறந்திருக்கும்: காலை 6:00 – இரவு 10:30',
    callUs: 'அழைக்க: +94 77 123 4567',
    home: 'முகப்பு',
    menu: 'உணவு பட்டியல்',
    adminLogin: 'நிர்வாகி பகுதி',
    getDirections: 'வரைபடம் & இருப்பிடம்',
    orderWhatsApp: 'வாட்ஸ்அப் ஆர்டர்',
    quickCall: 'இப்போதே அழைக்க',

    // Hero Section
    badge: 'பாரம்பரிய இலங்கை மற்றும் யாழ்ப்பாண உணவகம்',
    heroTitlePrefix: 'பேர்ல்',
    heroTitleSuffix: 'ஹோட்டல்',
    heroSubtitle: 'புதிய உணவுகள் • சிறந்த சுவை • உயர்ந்த தரம்',
    heroDesc: 'சுவையான சூடான கொத்து, மணமுறும் பிரியாணி, மொறுமொறுப்பான ஆப்பம் மற்றும் தேநீர் வகைகள். தினமும் புதிதாக தயாரிக்கப்படுகிறது.',
    viewMenu: 'உணவு பட்டியல்',
    exploreFoods: 'உணவுகளை பார்க்க',
    topRated: 'சிறந்த மதிப்பீடு',
    freshDishes: '50+ உணவுகள்',
    freshQuality: '100% தரம்',

    // Storefront Section
    ourLocation: 'எங்கள் உணவகம்',
    storefrontTitle: 'நேரில் வாருங்கள் - பேர்ல் ஹோட்டல்',
    storefrontDesc: 'நாவற்குழி சந்திப்பில் A9 வீதியில் அமைந்துள்ளது. சூடான கொத்து, ஆப்பம், இலங்கை தேநீரை ருசித்து மகிழுங்கள்.',
    addressLabel: 'முகவரி:',
    phoneLabel: 'தொலைபேசி:',
    hoursLabel: 'நேரம்:',

    // Menu Section
    menuBadge: 'பேர்ல் ஹோட்டல் யாழ்ப்பாணம்',
    ourMenuTitle: 'எங்கள்',
    ourMenuHighlight: 'உணவு பிரிவுகள்',
    menuDesc: 'ஒவ்வொரு பிரிவாக உணவுகளை தேடுங்கள். விருப்பமான உணவை தேர்வு செய்து ஆர்டர் செய்யுங்கள்.',
    searchPlaceholder: 'உணவு பெயர் தேடுக...',
    allCategories: 'அனைத்து பிரிவுகளும்',
    all: 'அனைத்தும்',
    vegOnly: 'சைவம் மட்டும்',
    nonVegOnly: 'அசைவம் மட்டும்',
    noFoodsFound: 'உணவுகள் எதுவும் கிடைக்கவில்லை',
    resetFilters: 'மீளமைக்க',

    // Food Card & Modal
    veg: 'சைவம்',
    nonVeg: 'அசைவம்',
    prepTime: 'நேரம்:',
    viewDetails: 'விவரங்கள்',
    orderNow: 'ஆர்டர் செய்க',
    whatsappOrderMessage: 'வணக்கம் பேர்ல் ஹோட்டல்! நான் இந்த உணவை ஆர்டர் செய்ய விரும்புகிறேன்:',

    // Admin Wall
    adminTitle: 'நிர்வாகி உள்நுழைவு',
    adminSubtitle: 'உணவு பட்டியலை மாற்ற கடவுச்சொல்லை உள்ளிடுக',
    passcodePlaceholder: 'கடவுச்சொல் உள்ளிடுக',
    loginBtn: 'உள்நுழைக',
    invalidPasscode: 'தவறான கடவுச்சொல்!',
    adminSuccess: 'நிர்வாகி பகுதிக்கு நல்வரவு',

    // Reviews
    reviewsBadge: 'வாடிக்கையாளர் கருத்துக்கள்',
    reviewsTitle: 'வாடிக்கையாளர்களின் அனுபவம்',
    avgRating: '4.9 / 5 நட்சத்திரங்கள்',
    basedOn: '850+ வாடிக்கையாளர்களின் மதிப்பீடு',
    writeReview: 'கருத்து பதிவிடுக',
    addReviewTitle: 'உங்கள் அனுபவத்தை பகிர்க',
    yourName: 'உங்கள் பெயர்',
    yourReview: 'உங்கள் கருத்து',
    ratingLabel: 'மதிப்பீடு (1-5 நட்சத்திரம்)',
    submitReview: 'சமர்ப்பிக்க',
    reviewSubmitted: 'நன்றி! உங்கள் கருத்து பதிவு செய்யப்பட்டது.',

    // Footer
    footerDesc: 'யாழ்ப்பாணத்தின் முன்னணி உணவகம். கொத்து, பிரியாணி, இலங்கை தேநீர் மற்றும் சுவையான உணவுகள்.',
    quickLinks: 'விரைவு இணைப்புகள்',
    contactUs: 'தொடர்புகொள்ள',
    rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. பேர்ல் ஹோட்டல்.'
  },

  si: {
    // Header & Nav
    topAddress: 'අංක: 82, A9 පාර, නාවට්කුලි හන්දිය, කයිතඩි, යාපනය',
    openHours: 'දිනපතා: පෙ.ව. 6:00 – ප.ව. 10:30',
    callUs: 'ඇමතුම්: +94 77 123 4567',
    home: 'මුල් පිටුව',
    menu: 'ආහාර මෙනුව',
    adminLogin: 'පරිපාලක පද්ධතිය',
    getDirections: 'ස්ථානය සහ සිතියම',
    orderWhatsApp: 'WhatsApp මගින් ඇණවුම් කරන්න',
    quickCall: 'දැන් අමතන්න',

    // Hero Section
    badge: 'ප්‍රණීත ලංකා සහ යාපනය ආහාර සංස්කෘතිය',
    heroTitlePrefix: 'පර්ල්',
    heroTitleSuffix: 'හෝටලය',
    heroSubtitle: 'නැවුම් ආහාර • ඉහළම රසය • උසස් ප්‍රමිතිය',
    heroDesc: 'උණු උණු කොත්තු, රසවත් බිරියානි, ආප්ප සහ නැවුම් ලංකා තේ රස විඳින්න.',
    viewMenu: 'මෙනුව බලන්න',
    exploreFoods: 'ආහාර සොයන්න',
    topRated: 'ඉහළම ඇගයීම',
    freshDishes: 'ආහාර 50+',
    freshQuality: '100% නැවුම්',

    // Storefront Section
    ourLocation: 'අපගේ ආපනශාලාව',
    storefrontTitle: 'පර්ල් හෝටලයට පැමිණෙන්න',
    storefrontDesc: 'A9 මාර්ගයේ නාවට්කුලි හන්දිය අසල පිහිටා ඇත. උණුසුම් කොත්තු, ආප්ප සහ තේ රස විඳින්න පැමිණෙන්න.',
    addressLabel: 'ලිපිනය:',
    phoneLabel: 'දුරකථන:',
    hoursLabel: 'වේලාවන්:',

    // Menu Section
    menuBadge: 'පර්ල් හෝටලය යාපනය',
    ourMenuTitle: 'අපගේ',
    ourMenuHighlight: 'ආහාර මෙනුව',
    menuDesc: 'වර්ගීකරණය කරන ලද ආහාර වර්ග නරඹන්න. පහසුවෙන් ඇණවුම් කරන්න.',
    searchPlaceholder: 'ආහාර නම සොයන්න...',
    allCategories: 'සියලුම වර්ග',
    all: 'සියල්ල',
    vegOnly: 'නිවැරදි තෙල්/ශාක ආහාර පමණි',
    nonVegOnly: 'මස්/මාළු ආහාර',
    noFoodsFound: 'ආහාර සොයා ගැනීමට නොහැකි විය',
    resetFilters: 'නැවත සකසන්න',

    // Food Card & Modal
    veg: 'එළවළු',
    nonVeg: 'මාළු/මස්',
    prepTime: 'කාලය:',
    viewDetails: 'විස්තර බලන්න',
    orderNow: 'ඇණවුම් කරන්න',
    whatsappOrderMessage: 'ආයුබෝවන් පර්ල් හෝටලය! මට මෙම ආහාරය ඇණවුම් කිරීමට අවශ්‍යයි:',

    // Admin Wall
    adminTitle: 'පරිපාලක පිවිසුම',
    adminSubtitle: 'ආහාර මෙනුව සංස්කරණය කිරීමට මුරපදය ඇතුළත් කරන්න',
    passcodePlaceholder: 'මුරපදය ඇතුළත් කරන්න',
    loginBtn: 'ඇතුළු වන්න',
    invalidPasscode: 'වැරදි මුරපදයකි!',
    adminSuccess: 'සාදරයෙන් පිළිගනිමු',

    // Reviews
    reviewsBadge: 'පාරිභෝගික අදහස්',
    reviewsTitle: 'අපගේ පාරිභෝගිකයින් පවසන දේ',
    avgRating: '4.9 / 5',
    basedOn: '850+ පාරිභෝගික ඇගයීම් මත',
    writeReview: 'අදහසක් එක් කරන්න',
    addReviewTitle: 'ඔබගේ අත්දැකීම බෙදාගන්න',
    yourName: 'ඔබගේ නම',
    yourReview: 'ඔබගේ අදහස',
    ratingLabel: 'ඇගයීම (තරු 1-5)',
    submitReview: 'යොමු කරන්න',
    reviewSubmitted: 'ස්තුතියි! ඔබගේ අදහස සටහන් විය.',

    // Footer
    footerDesc: 'යාපනයේ ප්‍රමුඛතම ආපනශාලාව. රසවත් කොත්තු, බිරියානි, තේ සහ විශේෂ ආහාර.',
    quickLinks: 'ඉක්මන් සබැඳි',
    contactUs: 'සම්බන්ධ වන්න',
    rights: 'සියලුම හිමිකම් ඇවිරිණි. පර්ල් හෝටලය.'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('pearl_language') || 'en';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('pearl_language', lang);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
