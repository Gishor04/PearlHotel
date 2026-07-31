# 👑 Pearl Hotel - Premium 2026 Luxury Restaurant Website

A state-of-the-art, high-performance, dark luxury restaurant web application for **PEARL HOTEL**, built with modern 2026 UI/UX aesthetics, React 19, Vite, Tailwind CSS, Framer Motion, Node.js/Express, and MongoDB Atlas.

---

## 🌟 Highlights & Features

- **Dark Luxury Aesthetics**:
  - Obsidian Black (`#050505`, `#09090b`), Dark Crimson Red accents, Metallic Gold gradients (`#d4af37`, `#f59e0b`), and subtle glassmorphism backdrop blur.
  - Smooth Framer Motion page entrance, float animations, and interactive hover glowing states.

- **Customer Experience**:
  - **Hero Section**: Animated particle glow background, crown jewel badge, title "PEARL HOTEL", subtitle *"Fresh Foods • Best Taste • Premium Quality"*, and CTA buttons ("View Menu", "Explore Foods").
  - **Category Pills**: Horizontal scrollable bar featuring all categories: *Breakfast, Tea, Snacks, Curries, Rice, Kottu, Biriyani, Special Meals, Drinks*.
  - **Live Search & Filter**: Instant filtering by Food Name, Category, and Vegetarian / Non-Vegetarian preference.
  - **Food Product Cards**: High-definition Unsplash dish images, Veg/Non-Veg indicator badges, Availability badges (*Available / Out of Stock*), Category labels, star ratings, prep times, and LKR prices (`Rs. 1,200`).
  - **Quick Order Tray Drawer**: Interactive client-side drawer allowing customers to build an order list, calculate total LKR subtotal, adjust quantities, and submit table order requests.

- **Admin Panel (`/admin`)**:
  - **No Authentication Required**: Direct access at `/admin` for rapid management.
  - **Food Products Management**: Add new dish with live image URL preview, edit existing dish fields (Name, Price, Category, Description, Type), delete dish with toast feedback, and quick toggle availability (*Available <-> Out of Stock*).
  - **Category Management**: Create new menu categories and remove existing ones dynamically.

- **MongoDB Atlas Auto-Seeding**:
  - Automatically seeds categories and 53 authentic Sri Lankan food products (Plain Tea, Milk Tea, Appam, String Hopper, Puttu, Dosa, Parotta, Rolls, Samosa, Vadai, Chicken/Beef/Mutton/Fish Curries, Prawn/Squid/Chicken Devils, Dum Biriyanis, Fried Rice variations, Kottu variations, and fresh fruit juices) on first server launch.

- **SEO & Performance**:
  - Full title, meta tags, OpenGraph social media tags, custom SVG favicon, and JSON-LD `Restaurant` Schema for Google Search indexing.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Lucide React, Axios, React Hot Toast, React Router DOM v6
- **Backend**: Node.js, Express.js, Cors, Dotenv, Mongoose
- **Database**: MongoDB Atlas (`pearl_hotel` DB)

---

## 📁 Project Structure

```
PearlFood/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js            # MongoDB Atlas Mongoose connection
│   │   ├── controllers/
│   │   │   ├── categoryController.js
│   │   │   └── foodController.js
│   │   ├── models/
│   │   │   ├── Category.js
│   │   │   └── Food.js
│   │   ├── routes/
│   │   │   ├── categoryRoutes.js
│   │   │   └── foodRoutes.js
│   │   ├── seed/
│   │   │   ├── autoSeed.js      # Automatic database populator on launch
│   │   │   ├── runSeed.js       # Manual force seed script
│   │   │   └── seedData.js      # Sample food & category dataset
│   │   └── server.js            # Express server entry point
│   ├── .env                     # MongoDB URI & Port config
│   └── package.json
└── frontend/
    ├── public/
    │   └── favicon.svg          # Pearl Hotel crown SVG favicon
    ├── src/
    │   ├── components/
    │   │   ├── CategoryFilter.jsx
    │   │   ├── FoodCard.jsx
    │   │   ├── FoodModal.jsx
    │   │   ├── Footer.jsx
    │   │   ├── HeroSection.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── QuickOrderModal.jsx
    │   │   └── SearchBar.jsx
    │   ├── pages/
    │   │   ├── AdminDashboard.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── MenuPage.jsx
    │   │   └── NotFoundPage.jsx
    │   ├── services/
    │   │   └── api.js           # Axios REST API client
    │   ├── App.jsx              # App routes & global state
    │   ├── index.css            # Tailwind directives & luxury dark theme rules
    │   └── main.jsx
    ├── index.html               # Head tags & JSON-LD Structured Data
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

---

## 🚀 How to Run the Application

### 1. Start the Backend Server
```bash
cd backend
npm start
```
*The backend connects to MongoDB Atlas (`pearl_hotel` database) and listens on `http://localhost:5001`. Data seeding will trigger automatically if the database collections are empty.*

### 2. Start the Frontend Server
```bash
cd frontend
npm run dev
```
*Open `http://localhost:3000` in your web browser.*

---

## 🔗 Key Routes

- **`/`**: Home Page (Luxury Hero, Live Search, Category Bar, Dish Grid)
- **`/menu`**: Full Food Menu Page (Sort by Price/Rating, Category Filters)
- **`/admin`**: Open Admin Panel (Add/Edit/Delete Foods & Categories, Price & Stock toggles)

---

## 👑 Pearl Hotel 2026
*Built for authentic Ceylon culinary excellence and modern digital dining.*
