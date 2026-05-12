import { useSelector, useDispatch } from 'react-redux';
import { HeroSection } from '../components/home/HeroSection';
import { RecommendationSection } from '../components/recommendations/RecommendationSection';
import { selectAllMovies } from '../features/movies/movieSelectors';
import { toggleWatched, toggleFavorite, deleteMovie } from '../features/movies/movieSlice';
import { generateRecommendations, getFeaturedMovie } from '../features/recommendations/recommendationUtils';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

export function Home() {
  const dispatch = useDispatch();
  const movies = useSelector(selectAllMovies);
  const { kidsMode } = useTheme();

  const featuredMovie = getFeaturedMovie(movies);
  const recommendations = generateRecommendations(movies, kidsMode);

  const handleToggleWatched = (id: number) => {
    dispatch(toggleWatched(id));
  };

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      dispatch(deleteMovie(id));
    }
  };

  return (
    <div>
      <HeroSection featuredMovie={featuredMovie} />

      {kidsMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-2">🎈 Kids Mode Active</h3>
          <p className="text-slate-300">
            Showing only family-friendly content rated G, PG, and PG-13.
            You can turn this off in Settings.
          </p>
        </motion.div>
      )}

      {recommendations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Start Watching Movies!</h3>
          <p className="text-slate-400 mb-6">
            Mark movies as watched to get personalized recommendations
          </p>
        </motion.div>
      ) : (
        recommendations.map((section, index) => (
          <RecommendationSection
            key={index}
            title={section.title}
            description={section.description}
            movies={section.movies}
            onToggleWatched={handleToggleWatched}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
