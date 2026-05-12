# Movie & Watchlist Manager App

A premium ReactJS-based Movie & Watchlist Manager built for academic excellence, strong React fundamentals, professional UI/UX, and scalable architecture.

This project is designed to go beyond a basic CRUD assignment and feel like a real-world product prototype inspired by Netflix, IMDb, Letterboxd, and modern SaaS dashboards.

---

# Project Objective

Design and develop a ReactJS application that allows users to:

* Browse movies from a real-world movie dataset
* Manage personal watchlists
* Mark movies as watched/unwatched
* Add/remove favorites
* Get smart mock recommendations
* Personalize app settings (theme, kids mode, preferences)
* View analytics through a professional dashboard

The goal is to create a modular, scalable, responsive, and viva-friendly project that strongly aligns with the college syllabus.

---

# Tech Stack

## Frontend

* ReactJS (Functional Components Only)
* React Router DOM
* Redux Toolkit
* Tailwind CSS (preferred)
* Framer Motion (animations)
* React Toastify
* LocalStorage

## Dataset

* Kaggle Movie Dataset (`Movie_Database.csv`)
* Cleaned and transformed into JSON

## Data Preprocessing

* Python
* Pandas
* NumPy

---

# Core Academic Concepts Covered

## Unit 1 — Foundations of React + ES6

* React architecture
* Virtual DOM
* Component-based architecture
* ES6 features
* Arrow functions
* Destructuring
* Spread operator
* Array methods
* `.map()`
* `.filter()`
* `.find()`
* `.reduce()`

## Unit 2 — JSX

* JSX syntax
* Expressions inside JSX
* Conditional rendering
* JSX attributes
* Inline styling
* Props
* State management
* Dynamic UI rendering

## Unit 3 — Elements + Components

* Functional components
* Reusable components
* Stateless components
* Component hierarchy
* Rendering elements
* Updating UI dynamically

## Unit 4 — Redux

* Redux fundamentals
* Store
* Actions
* Reducers
* Redux Toolkit
* Global state management
* Context API comparison
* Redux DevTools
* State synchronization

---

# Features

# Dashboard

* Total Movies
* Watched Movies
* Unwatched Movies
* Favorite Movies
* Average Rating
* Top Rated Movie
* Most Popular Movie
* Most Watched Genre
* Animated stat cards
* Progress indicators

---

# Movies Module

* Display movies using premium movie cards
* Movie poster support
* Genre badges
* Rating badges
* Add new movie
* Edit movie
* Delete movie
* Mark watched/unwatched
* Mark favorite/unfavorite
* Search by title
* Filter by genre
* Filter by language
* Sort by rating/year/popularity
* Pagination for large dataset

---

# Favorites Module

* Favorite movie listing
* Favorite count
* Remove from favorites
* Top-rated favorites
* Empty state UI

---

# Smart Mock Recommendation System

* Based on previously watched genres
* “Because You Watch Action” logic
* You May Also Like
* Based on Watch History
* Trending in Favorite Genre
* Continue Watching

---

# Settings Page

## Includes

* Kids Mode ON/OFF
* Theme Switcher
* Dark Mode
* Light Mode
* Cinematic Theme
* Minimal Theme
* Kids Theme
* Accent Color Customization
* Layout Preferences
* Notification Preferences

All preferences persist using LocalStorage.

---

# UI/UX Enhancements

* Responsive mobile-first design
* Premium cinematic layout
* Sticky navbar
* Hero section
* Framer Motion animations
* Toast notifications
* Skeleton loaders
* Empty states
* Smooth hover effects
* Micro interactions

---

# Folder Structure

```text
src/
│
├── app/
│   └── store.js
│
├── features/
│   ├── movies/
│   ├── settings/
│   └── recommendations/
│
├── components/
│   ├── layout/
│   ├── dashboard/
│   ├── movies/
│   ├── settings/
│   ├── recommendations/
│   └── common/
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Movies.jsx
│   ├── Favorites.jsx
│   ├── AddMovie.jsx
│   ├── Settings.jsx
│   ├── Recommendations.jsx
│   └── NotFound.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── context/
│   └── ThemeContext.jsx
│
├── data/
│   └── movies.json
│
├── utils/
│   └── constants.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Installation

## 1. Clone Project

```bash
git clone your-repository-link
cd movie-watchlist-manager
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Start Development Server

```bash
npm run dev
```

---

# Required Packages

```bash
npm install react-router-dom
npm install @reduxjs/toolkit react-redux
npm install framer-motion
npm install react-toastify
npm install
```

If using Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

# Why Redux?

Redux is used because multiple modules depend on shared synchronized state:

* Dashboard
* Movies
* Favorites
* Recommendations
* Settings

Using only `useState` creates prop drilling and poor scalability.

Redux Toolkit provides:

* cleaner architecture
* centralized state
* predictable updates
* easier debugging
* better maintainability

---

# Why Real Dataset?

Using a real Kaggle movie dataset improves:

* realism
* scalability
* practical relevance
* faculty impression
* project uniqueness

Compared to manually entering dummy data, a real dataset makes the project feel production-ready.

---

# Why Preprocessing?

Raw CSV is not frontend optimized.

Preprocessing helps:

* remove duplicates
* clean invalid data
* simplify fields
* improve rendering performance
* convert CSV to optimized JSON

This creates a smoother React application.

---

# Future Scope

* Real TMDB API integration
* Authentication system
* User profiles
* Cloud database support
* True ML recommendation engine
* Watch history analytics
* Review and rating system
* Social sharing
* Admin dashboard

---

# Viva Preparation Questions

## Why React instead of traditional JavaScript?

Because React provides reusable components, Virtual DOM, better state management, and faster UI updates.

## Why use `.map()`?

To dynamically render movie cards from an array of movie objects.

## Why use Redux Toolkit?

To manage global shared state efficiently and avoid prop drilling.

## Why use LocalStorage?

To persist favorites, watched history, and settings even after page refresh.

## Why use pagination?

Because rendering 9000+ movies at once causes performance issues and poor UX.

---

# Final Goal

This project is built to demonstrate:

> “This student understands React deeply.”

and not:

> “This student copied a CRUD project.”

The final application is designed to be:

* professional
* premium
* modular
* scalable
* responsive
* intelligent
* viva-proof
* high-scoring

---

# Author

Built as a professional academic ReactJS project focused on maximum scoring, strong architecture, and portfolio-level presentation.
