import { useSelector, useDispatch } from 'react-redux';
import { Heart } from 'lucide-react';
import { MovieCard } from '../components/movies/MovieCard';
import { EmptyState } from '../components/movies/EmptyState';
import { selectFavoriteMovies } from '../features/movies/movieSelectors';
import { toggleWatched, toggleFavorite, deleteMovie } from '../features/movies/movieSlice';
import { Button } from '../app/components/ui/button';
import { Link } from 'react-router';
import { motion } from 'motion/react';

export function Favorites() {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(selectFavoriteMovies);

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
          <Heart className="w-8 h-8 text-red-500 fill-current" />
          <h1 className="text-4xl font-bold text-white">Favorite Movies</h1>
        </div>
        <p className="text-slate-400">
          {favoriteMovies.length} {favoriteMovies.length === 1 ? 'movie' : 'movies'} in your favorites
        </p>
      </motion.div>

      {favoriteMovies.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No favorite movies yet"
          description="Start adding movies to your favorites by clicking the heart icon on any movie card."
          action={
            <Link to="/movies">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Browse Movies
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <MovieCard
                movie={movie}
                onToggleWatched={handleToggleWatched}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
