import { useSelector, useDispatch } from 'react-redux';
import { Sparkles } from 'lucide-react';
import { RecommendationSection } from '../components/recommendations/RecommendationSection';
import { selectAllMovies } from '../features/movies/movieSelectors';
import { toggleWatched, toggleFavorite, deleteMovie } from '../features/movies/movieSlice';
import { generateRecommendations } from '../features/recommendations/recommendationUtils';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

export function Recommendations() {
  const dispatch = useDispatch();
  const movies = useSelector(selectAllMovies);
  const { kidsMode } = useTheme();

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          <h1 className="text-4xl font-bold text-white">For You</h1>
        </div>
        <p className="text-slate-400">
          Personalized movie recommendations based on your watch history and favorites
        </p>
      </motion.div>

      {kidsMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-2">🎈 Kids Mode Active</h3>
          <p className="text-slate-300">
            Showing only family-friendly recommendations rated G, PG, and PG-13
          </p>
        </motion.div>
      )}

      {recommendations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-slate-900 border border-slate-800 rounded-xl"
        >
          <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Start Your Journey!</h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Mark movies as watched and add favorites to get personalized recommendations
            tailored just for you.
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
