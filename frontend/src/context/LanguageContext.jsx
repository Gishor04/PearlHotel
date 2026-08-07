import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const categoryTranslations = {
  'Breakfast & Snacks': {
    en: 'Breakfast & Snacks',
    ta: 'காலை உணவு & சிற்றுண்டி',
    si: 'උදෑසන ආහාර සහ කෙටි කෑම',
  },
  'Tea & Beverages': {
    en: 'Tea & Beverages',
    ta: 'தேநீர் & பானங்கள்',
    si: 'තේ සහ බීම වර්ග',
  },
  Curries: {
    en: 'Curries',
    ta: 'கறி வகைகள்',
    si: 'කරි වර්ග',
  },
  Meals: {
    en: 'Meals',
    ta: 'சாப்பாடு / உணவுகள்',
    si: 'බත් සහ ව්‍යංජන',
  },
  'Specials & Devils': {
    en: 'Specials & Devils',
    ta: 'ஸ்பெஷல் & டெவில் வகைகள்',
    si: 'විශේෂ ඩෙවිල් කෑම',
  },
  Biryani: {
    en: 'Biryani',
    ta: 'பிரியாணி',
    si: 'බිරියානි',
  },
  'Rice Table': {
    en: 'Rice Table',
    ta: 'ரைஸ் வகைகள்',
    si: 'ෆ්‍රයිඩ් රයිස්',
  },
  'Kottu Table': {
    en: 'Kottu Table',
    ta: 'கொத்து வகைகள்',
    si: 'කොත්තු වර්ග',
  },
};

export const foodItemTranslations = {
  'Plain Tea': {
    name: { en: 'Plain Tea', ta: 'பிளைன் டீ', si: 'ප්ලේන් ටී' },
    desc: {
      en: 'Brewed pure Ceylon black tea served steaming hot.',
      ta: 'தூய்மையான சிலோன் கருப்பு தேநீர் சுடச்சுட வழங்கப்படுகிறது.',
      si: 'නැවුම් ලංකා කළු තේ උණුසුම්ව ලබා දේ.',
    },
  },
  'Milk Tea': {
    name: { en: 'Milk Tea', ta: 'பால் டீ', si: 'කිරි තේ' },
    desc: {
      en: 'Rich Ceylon black tea brewed with fresh steamed milk and subtle sweetness.',
      ta: 'சுவையான சிலோன் தேநீருடன் புதிய பால் சேர்த்து தயாரித்த பால் டீ.',
      si: 'නැවුම් එළකිරි එකතු කළ ප්‍රණීත කිරි තේ.',
    },
  },
  'Ginger Ceylon Tea': {
    name: { en: 'Ginger Ceylon Tea', ta: 'இஞ்சி தேநீர்', si: 'ඉඟුරු තේ' },
    desc: {
      en: 'Steaming black Ceylon tea infused with freshly crushed spicy ginger root.',
      ta: 'புதிய இஞ்சி சாறு கலந்த சுடச்சுட தேநீர்.',
      si: 'අලුත් ඉඟුරු එකතු කළ උණුසුම් තේ.',
    },
  },
  'Cardamom Special Tea': {
    name: { en: 'Cardamom Special Tea', ta: 'ஏலக்காய் சிறப்பு தேநீர்', si: 'කරாබුනැටි சிறப்பு තේ' },
    desc: {
      en: 'Fragrant spicy Ceylon tea infused with aromatic green cardamom pods.',
      ta: 'மணமுறும் ஏலக்காய் சேர்த்த சிறப்பு தேநீர்.',
      si: 'සුවඳවත් කරාබුනැටි එකතු කළ විශේෂ තේ.',
    },
  },
  'Light Tea': {
    name: { en: 'Light Tea', ta: 'லைட் டீ', si: 'ලයිට් ටී' },
    desc: {
      en: 'Mild Ceylon black tea infusion, light and aromatic.',
      ta: 'மிதமான சுவையுடைய சிலோன் கருப்பு தேநீர்.',
      si: 'සැහැල්ලු රසවත් කළු තේ.',
    },
  },
  Nestomalt: {
    name: { en: 'Nestomalt', ta: 'நெஸ்டோமால்ட்', si: 'නෙස්ටොමෝල්ට්' },
    desc: {
      en: 'Warm wholesome malted beverage rich in essential vitamins.',
      ta: 'சத்துக்கள் நிறைந்த சுடச்சுட நெஸ்டோமால்ட் பானம்.',
      si: 'පෝෂණීය උණුසුම් නෙස්ටොමෝල්ට් බීම.',
    },
  },
  Nescafe: {
    name: { en: 'Nescafe', ta: 'நெஸ்காபே காபி', si: 'නෙස්කැෆේ කෝපි' },
    desc: {
      en: 'Rich aromatic coffee blend served hot with frothy milk.',
      ta: 'மணமுறும் சுடச்சுட பால் காபி.',
      si: 'ප්‍රණීත උණුසුම් කිරි කෝපි.',
    },
  },
  'Fresh Lime Juice': {
    name: { en: 'Fresh Lime Juice', ta: 'புதிய எலுமிச்சை ஜூஸ்', si: 'දෙහි බීම' },
    desc: {
      en: 'Chilled freshly squeezed lime juice with mint leaves and ice.',
      ta: 'புதிய எலுமிச்சை சாறு மற்றும் புதினா இலைகள் கலந்த குளிர் பானம்.',
      si: 'නැවුම් දෙහි සහ මිංචි එකතු කළ සිසිල් බීම.',
    },
  },
  'Passion Fruit Juice': {
    name: { en: 'Passion Fruit Juice', ta: 'பேஷன் ஃப்ரூட் ஜூஸ்', si: 'පැෂන් ෆෲට් බීම' },
    desc: {
      en: 'Tropical fresh passion fruit juice, sweet and refreshing.',
      ta: 'சுவையான புதிய பேஷன் ஃப்ரூட் ஜூஸ்.',
      si: 'නැවුම් පැෂன் ෆෲට් සිසිල් බීම.',
    },
  },
  'Iced Milo': {
    name: { en: 'Iced Milo', ta: 'ஐஸ் மைலோ', si: 'අයිස් මයිලෝ' },
    desc: {
      en: 'Cold chocolate malt drink served over crushed ice with extra Milo powder topping.',
      ta: 'குளிர்ந்த மைலோ சாக்லேட் பானம்.',
      si: 'සිසිල් මයිලෝ චොක්ලට් බීම.',
    },
  },
  'Fresh King Coconut (Thambili)': {
    name: { en: 'Fresh King Coconut (Thambili)', ta: 'இளநீர் / தம்பிலி', si: 'තැඹිලි' },
    desc: {
      en: 'Natural sweet tropical king coconut water freshly opened.',
      ta: 'இயற்கையான சுவையான புதிய தம்பிலி இளநீர்.',
      si: 'නැවුම් ස්වාභාවික මිහිරි තැඹිලි වතුර.',
    },
  },
  'Plain Appam': {
    name: { en: 'Plain Appam', ta: 'பிளைன் ஆப்பம்', si: 'ප්ලේන් ආප්ප' },
    desc: {
      en: 'Bowl-shaped coconut milk hopper with crispy golden edges.',
      ta: 'தேங்காய் பால் ஊற்றி சுடப்பட்ட மொறுமொறுப்பான ஆப்பம்.',
      si: 'පොල්කිරි යොදා සෑදූ ප්‍රණීත ආප්ප.',
    },
  },
  'Paal Appam': {
    name: { en: 'Paal Appam', ta: 'பால் ஆப்பம்', si: 'කිරි ආප්ප' },
    desc: {
      en: 'Sweet coconut cream hopper infused with cardamom aroma.',
      ta: 'இனிப்பான தேங்காய் பால் ஆப்பம்.',
      si: 'මිහිරි පොල්කිරි පිරවූ ආප්ප.',
    },
  },
  'Egg Appam': {
    name: { en: 'Egg Appam', ta: 'முட்டை ஆப்பம்', si: 'බිත්තර ආප්ප' },
    desc: {
      en: 'Golden hopper with a soft poached egg cooked at the center.',
      ta: 'நடுவில் முட்டை சேர்க்கப்பட்ட சுவையான ஆப்பம்.',
      si: 'මැදට බිත්තරයක් එකතු කළ ආප්ප.',
    },
  },
  'String Hopper': {
    name: { en: 'String Hopper (10 Pcs)', ta: 'இடியாப்பம் (10 துண்டுகள்)', si: 'ඉඳිආප්ප (10)' },
    desc: {
      en: 'Steamed rice noodle nests served with pol sambol and dahl curry (Set of 10).',
      ta: 'சுடச்சுட இடியாப்பம், தேங்காய் சம்பல் மற்றும் பருப்பு கறியுடன்.',
      si: 'පොල් සම්බෝල සහ පරිප්පු හොදි සමඟ ඉඳිආප්ප.',
    },
  },
  Puttu: {
    name: { en: 'Puttu', ta: 'புட்டு', si: 'පිට්ටු' },
    desc: {
      en: 'Steamed rice flour and coconut cylinders served with spiced curry.',
      ta: 'அரிசி மா மற்றும் தேங்காய் துருவல் சேர்த்து அவிக்கப்பட்ட புட்டு.',
      si: 'හාල් පිටි සහ පොල් එකතු කර තැම්බූ පිට්ටු.',
    },
  },
  Dosai: {
    name: { en: 'Dosai', ta: 'தோசை', si: 'තෝසේ' },
    desc: {
      en: 'Crispy paper thin fermented rice crepe served with coconut chutney & sambar.',
      ta: 'மொறுமொறுப்பான தோசை, சாம்பார் மற்றும் தேங்காய் சட்னியுடன்.',
      si: 'තෝසේ, සාම්බාර් සහ පොල් චට්නි සමඟ.',
    },
  },
  Parotta: {
    name: { en: 'Parotta', ta: 'பரோட்டா', si: 'පරාටා' },
    desc: {
      en: 'Flaky layered griddled roti toasted golden brown.',
      ta: 'சுவையான சுடச்சுட பரோட்டா.',
      si: 'රන්වන් පැහැති රසවත් පරාටා.',
    },
  },
  'Roli / Roll': {
    name: { en: 'Roll / Roli', ta: 'ரோல் / ரோலி', si: 'රෝල්ස්' },
    desc: {
      en: 'Crispy fried classic pastry roll packed with savory stuffing.',
      ta: 'மொறுமொறுப்பான சுவையான ரோல்.',
      si: 'ප්‍රණීත රෝල්ස්.',
    },
  },
  'Chicken Kottu (Half)': {
    name: { en: 'Chicken Kottu (Half)', ta: 'சிக்கன் கொத்து (அரை)', si: 'චිකන් කොත්තු (අර්ධ)' },
    desc: {
      en: 'Sizzling godamba roti kottu chopped with chicken pieces & spicy gravy (Half portion).',
      ta: 'சுடச்சுட பொரித்த சிக்கன் துண்டுகள் மற்றும் கறியுடன் கொத்து (அரை அளவு).',
      si: 'ප්‍රණීත චිකන් කොත්තු (අර්ධ ප්‍රමාණය).',
    },
  },
  'Chicken Kottu (Full)': {
    name: { en: 'Chicken Kottu (Full)', ta: 'சிக்கன் கொத்து (முழு)', si: 'චිකන් කොත්තු (සම්පූර්ණ)' },
    desc: {
      en: 'Generous full portion of sizzling shredded kottu packed with roasted chicken & egg.',
      ta: 'சிக்கன் மற்றும் முட்டை சேர்க்கப்பட்ட சுவையான முழு கொத்து.',
      si: 'චිකන් සහ බිත්තර පිරවූ සම්පූර්ණ කොත්තු.',
    },
  },
  'Chicken Kottu (Full Portion)': {
    name: { en: 'Chicken Kottu (Full Portion)', ta: 'சிக்கன் கொத்து (முழு அளவு)', si: 'චිකන් කොත්තු (සම්පූර්ණ)' },
    desc: {
      en: 'Classic Sri Lankan street food chopped roti with roasted chicken & curry gravy (Full portion).',
      ta: 'சிக்கன் மற்றும் முட்டை சேர்க்கப்பட்ட சுவையான முழு கொத்து.',
      si: 'චිකන් සහ බිත්තර පිරවූ සම්පූර්ණ කොත්තු.',
    },
  },
  'Egg Kottu (Full Portion)': {
    name: { en: 'Egg Kottu (Full Portion)', ta: 'முட்டை கொத்து (முழு)', si: 'බිත්තර කොත්තු (සම්පූර්ණ)' },
    desc: {
      en: 'Chopped roti cooked on iron flat top with scrambled egg and curry (Full portion).',
      ta: 'முட்டை மற்றும் காய்கறி சேர்த்து தயாரிக்கப்பட்ட கொத்து.',
      si: 'බිත්තර එකතු කළ රසවත් කොත්තු.',
    },
  },
  'Veg Kottu (Full Portion)': {
    name: { en: 'Veg Kottu (Full Portion)', ta: 'வெஜ் கொத்து (முழு)', si: 'එළවළු කොත්තු (සම්පූර්ණ)' },
    desc: {
      en: 'Shredded godamba roti stir-fried with vegetables & spices (Full portion).',
      ta: 'காய்கறிகள் மற்றும் மசாலா சேர்த்து தயாரிக்கப்பட்ட சைவ கொத்து.',
      si: 'එළවළු එකතු කළ ප්‍රණීත කොත්තු.',
    },
  },
  'Beef Kottu (Full Portion)': {
    name: { en: 'Beef Kottu (Full Portion)', ta: 'பீஃப் கொத்து (முழு)', si: 'බීෆ් කොත්තු (සම්පූර්ණ)' },
    desc: {
      en: 'Spicy chopped roti with tender beef, egg & rich beef gravy (Full portion).',
      ta: 'மாட்டிறைச்சி மற்றும் கறியுடன் சுவையான கொத்து.',
      si: 'බීෆ් එකතු කළ ප්‍රණීත කොත්තු.',
    },
  },
  'Prawn Kottu (Full Portion)': {
    name: { en: 'Prawn Kottu (Full Portion)', ta: 'இறால் கொத்து (முழு)', si: 'ඉස්සන් කොත්තු (සම්පූර්ණ)' },
    desc: {
      en: 'Seafood special kottu chopped with fresh prawns, egg & capsicum (Full portion).',
      ta: 'புதிய இறால் மற்றும் முட்டை சேர்க்கப்பட்ட சீஃபுட் கொத்து.',
      si: 'ඉස්සන් එකතු කළ සීෆුඩ් කොත්තු.',
    },
  },
  'Squid Kottu (Full Portion)': {
    name: { en: 'Squid Kottu (Full Portion)', ta: 'கணவாய் கொத்து (முழு)', si: 'දැල්ලන් කොත්තු (සම්පූර්ණ)' },
    desc: {
      en: 'Tender squid rings chopped with roti, veggies & seafood sauce (Full portion).',
      ta: 'கணவாய் மீன் சேர்க்கப்பட்ட சுவையான கொத்து.',
      si: 'දැල්ලන් එකතු කළ සීෆුඩ් කොත්තු.',
    },
  },
  'Mix Kottu (Full Portion)': {
    name: { en: 'Mix Kottu (Full Portion)', ta: 'மிக்ஸ் கொத்து (முழு)', si: 'මික්ස් කොත්තු (සම්පූර්ණ)' },
    desc: {
      en: 'The supreme royal kottu combining chicken, beef, prawns & egg (Full portion).',
      ta: 'சிக்கன், பீஃப் மற்றும் இறால் கலந்த ராயல் மிக்ஸ் கொத்து.',
      si: 'චිකන්, බීෆ් සහ ඉස්සන් එකතු කළ විශේෂ කොත්තු.',
    },
  },
  'Seafood Mix Kottu': {
    name: { en: 'Seafood Mix Kottu', ta: 'சீஃபுட் மிக்ஸ் கொத்து', si: 'සීෆුඩ් මික්ස් කොත්තු' },
    desc: {
      en: 'Ocean squid, cuttlefish, and fresh prawns chopped in rich Jaffna curry kottu.',
      ta: 'இறால், கணவாய் மீன் கலந்த சுவையான கடல் உணவு கொத்து.',
      si: 'ඉස්සන් සහ දැල්ලන් එකතු කළ සීෆුඩ් කොත්තු.',
    },
  },
  'Chicken Dum Biryani': {
    name: { en: 'Chicken Dum Biryani', ta: 'சிக்கன் தம் பிரியாணி', si: 'චිකන් ඩම් බිරියානි' },
    desc: {
      en: 'Aromatic long grain basmati rice slow cooked in sealed handi with tender chicken.',
      ta: 'மணமுறும் பாஸ்மதி அரிசியில் சமைக்கப்பட்ட சிக்கன் தம் பிரியாணி.',
      si: 'රසවත් චිකන් ඩම් බිරියානි.',
    },
  },
  'Chicken Biryani': {
    name: { en: 'Chicken Biryani', ta: 'சிக்கன் பிரியாணி', si: 'චිකන් බිරියානි' },
    desc: {
      en: 'Royal Dum Biryani layered with succulent spiced chicken leg & boiled egg.',
      ta: 'சுவையான பாஸ்மதி சிக்கன் பிரியாணி.',
      si: 'ප්‍රණීත චිකන් බිරියානි.',
    },
  },
  'Mutton Dum Biryani': {
    name: { en: 'Mutton Dum Biryani', ta: 'மட்டன் தம் பிரியாணி', si: 'මට්න් ඩම් බිරියානි' },
    desc: {
      en: 'Succulent Ceylon mutton pieces layered with saffron basmati rice & boiled egg.',
      ta: 'ஆட்டுக்கறி மற்றும் அவித்த முட்டையுடன் சுவையான தம் பிரியாணி.',
      si: 'ප්‍රණීත එළුමස් ඩම් බිරියානි.',
    },
  },
  'Mutton Biryani': {
    name: { en: 'Mutton Biryani', ta: 'மட்டன் பிரியாணி', si: 'මට්න් බිරියානි' },
    desc: {
      en: 'Supreme Dum Biryani cooked with tender mutton pieces, mint & raita.',
      ta: 'சுவையான ஆட்டுக்கறி பாஸ்மதி பிரியாணி.',
      si: 'ප්‍රණීත මට්න් බිරියානි.',
    },
  },
  'Egg Biryani': {
    name: { en: 'Egg Biryani', ta: 'முட்டை பிரியாணி', si: 'බිත්තර බිරියානි' },
    desc: {
      en: 'Fragrant basmati rice slow-cooked with exotic biryani spices & boiled egg.',
      ta: 'அவித்த முட்டையுடன் சுவையான பாஸ்மதி பிரியாணி.',
      si: 'බිත්තර එකතු කළ බිරියානි.',
    },
  },
  'Beef Biryani': {
    name: { en: 'Beef Biryani', ta: 'பீஃப் பிரியாணி', si: 'බීෆ් බිරියානි' },
    desc: {
      en: 'Spiced basmati biryani cooked with tender beef chunks & caramelized onions.',
      ta: 'மாட்டிறைச்சி துண்டுகளுடன் சுவையான பாஸ்மதி பிரியாணி.',
      si: 'බීෆ් එකතු කළ රසවත් බිරියානි.',
    },
  },
  'Chicken Devil': {
    name: { en: 'Chicken Devil', ta: 'சிக்கன் டெவில்', si: 'චිකන් ඩෙවිල්' },
    desc: {
      en: 'Crispy fried chicken chunks sautéed in sweet & spicy chili pepper sauce.',
      ta: 'சுவையான காரசாரமான சிக்கன் டெவில்.',
      si: 'රසවත් චිකන් ඩෙවිල්.',
    },
  },
  'Prawn Devil': {
    name: { en: 'Prawn Devil', ta: 'இறால் டெவில்', si: 'ඉස්සන් ඩෙවිල්' },
    desc: {
      en: 'Juicy jumbo ocean prawns tossed in hot devilled chili glaze.',
      ta: 'காரசாரமான பெரிய இறால் டெவில்.',
      si: 'සැර රසවත් ඉස්සන් ඩෙවිල්.',
    },
  },
  'Squid Devil': {
    name: { en: 'Squid Devil', ta: 'கணவாய் டெவில்', si: 'දැල්ලන් ඩෙවිල්' },
    desc: {
      en: 'Tender ocean squid rings stir-fried with capsicum, onions & spicy pepper sauce.',
      ta: 'கணவாய் மீன் துண்டுகளுடன் காரசாரமான டெவில்.',
      si: 'දැල්ලන් එකතු කළ ඩෙවිල්.',
    },
  },
  'Beef Devil': {
    name: { en: 'Beef Devil', ta: 'பீஃப் டெவில்', si: 'බීෆ් ඩෙවිල්' },
    desc: {
      en: 'Seared beef strips tossed in fiery tomato-chili reduction with bell peppers.',
      ta: 'மாட்டிறைச்சி துண்டுகளுடன் காரசாரமான டெவில்.',
      si: 'බීෆ් එකතු කළ ඩෙවිල්.',
    },
  },
  'Chicken Rice (Full Portion)': {
    name: { en: 'Chicken Rice (Full Portion)', ta: 'சிக்கன் ரைஸ் (முழு)', si: 'චිකන් ෆ්‍රයිඩ් රයිස් (සම්පූර්ණ)' },
    desc: {
      en: 'Signature fried rice tossed with juicy marinated chicken pieces (Full portion).',
      ta: 'சிக்கன் துண்டுகள் சேர்த்து வறுத்த சுவையான ரைஸ்.',
      si: 'චිකන් එකතු කළ ෆ්‍රයිඩ් රයිස්.',
    },
  },
  'Mix Rice (Full Portion)': {
    name: { en: 'Mix Rice (Full Portion)', ta: 'மிக்ஸ் ரைஸ் (முழு)', si: 'මික්ස් ෆ්‍රයිඩ් රයිස් (සම්පූර්ණ)' },
    desc: {
      en: 'Ultimate mixed fried rice loaded with chicken, beef, prawns & egg (Full portion).',
      ta: 'சிக்கன், பீஃப் மற்றும் இறால் கலந்த ராயல் மிக்ஸ் ரைஸ்.',
      si: 'චිකන්, බීෆ් සහ ඉස්සන් එකතු කළ ෆ්‍රයිඩ් රයිස්.',
    },
  },
};

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

    // Footer & Specialties
    footerDesc: 'Jaffna’s premier dining venue serving authentic Kottu, Biriyani, Ceylon teas, and Sri Lankan specialties.',
    quickLinks: 'Quick Navigation',
    topSpecialties: 'Top Specialties',
    specialtyKottu: 'Sizzling Chicken & Seafood Kottu',
    specialtyBiryani: 'Dum Biryani & Special Rice Platters',
    specialtyAppam: 'Authentic Egg & Milk Paal Appam',
    specialtyDevils: 'Devilled Prawns, Squid & Chicken',
    specialtyTeas: 'Ceylon Black, Milk & Cardamom Teas',
    visitContact: 'Visit & Contact',
    rights: 'All Rights Reserved. Pearl Hotel Restaurant.',
    designedBy: 'Designed by PIRA AI AURA Team',
    craftedWith: 'Crafted for Authentic Ceylon Food Lovers',
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

    // Footer & Specialties
    footerDesc: 'யாழ்ப்பாணத்தின் முன்னணி உணவகம். கொத்து, பிரியாணி, இலங்கை தேநீர் மற்றும் சுவையான உணவுகள்.',
    quickLinks: 'விரைவு இணைப்புகள்',
    topSpecialties: 'சிறப்பு உணவுகள்',
    specialtyKottu: 'சுடச்சுட சிக்கன் & சீஃபுட் கொத்து',
    specialtyBiryani: 'தம் பிரியாணி & சிறப்பு ரைஸ்',
    specialtyAppam: 'பாரம்பரிய முட்டை & பால் ஆப்பம்',
    specialtyDevils: 'காரசாரமான இறால், கணவாய் & சிக்கன் டெவில்',
    specialtyTeas: 'சிலோன் கருப்பு, பால் & ஏலக்காய் தேநீர்',
    visitContact: 'தொடர்பு கொள்ள',
    rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. பேர்ல் ஹோட்டல்.',
    designedBy: 'PIRA AI AURA குழுவால் உருவாக்கப்பட்டது',
    craftedWith: 'இலங்கை உணவு பிரியர்களுக்காக உருவாக்கப்பட்டது',
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

    // Footer & Specialties
    footerDesc: 'යාපනයේ ප්‍රමුඛතම ආපනශාලාව. රසවත් කොත්තු, බිරියානි, තේ සහ විශේෂ ආහාර.',
    quickLinks: 'ඉක්මන් සබැඳි',
    topSpecialties: 'විශේෂ කෑම වර්ග',
    specialtyKottu: 'උණු උණු චිකන් සහ සීෆුඩ් කොත්තු',
    specialtyBiryani: 'ඩම් බිරියානි සහ විශේෂ ප්‍රණීත රයිස්',
    specialtyAppam: 'ප්‍රණීත බිත්තර සහ කිරි ආප්ප',
    specialtyDevils: 'සැර ඉස්සන්, දැල්ලන් සහ චිකන් ඩෙවිල්',
    specialtyTeas: 'ලංකා කළු තේ, කිරි තේ සහ ඉඟුරු තේ',
    visitContact: 'සම්බන්ධ වන්න',
    rights: 'සියලුම හිමිකම් ඇවිරිණි. පර්ල් හෝටලය.',
    designedBy: 'PIRA AI AURA කණ්ඩායම විසින් නිර්මාණය කරන ලදී',
    craftedWith: 'ප්‍රණීත ලංකා ආහාර රසවිඳින්නන් උදෙසා',
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

  const tCategory = (catName) => {
    if (!catName) return catName;
    const found = categoryTranslations[catName];
    if (found) {
      return found[language] || found['en'] || catName;
    }
    return catName;
  };

  const tFood = (food) => {
    if (!food) return food;
    const found = foodItemTranslations[food.name];
    if (found) {
      return {
        ...food,
        name: found.name[language] || found.name['en'] || food.name,
        description: found.desc[language] || found.desc['en'] || food.description,
        category: tCategory(food.category),
      };
    }
    return {
      ...food,
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
