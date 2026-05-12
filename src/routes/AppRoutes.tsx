import { Routes, Route } from 'react-router';
import { Layout } from '../components/layout/Layout';
import { Home } from '../pages/Home';
import { Dashboard } from '../pages/Dashboard';
import { Movies } from '../pages/Movies';
import { Favorites } from '../pages/Favorites';
import { AddMovie } from '../pages/AddMovie';
import { Settings } from '../pages/Settings';
import { Recommendations } from '../pages/Recommendations';
import { NotFound } from '../pages/NotFound';

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
