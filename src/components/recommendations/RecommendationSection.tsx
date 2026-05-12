import { Movie } from '../../utils/constants';
import { MovieCard } from '../movies/MovieCard';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface RecommendationSectionProps {
  title: string;
  description: string;
  movies: Movie[];
  onToggleWatched: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
}

export function RecommendationSection({
  title,
  description,
  movies,
  onToggleWatched,
  onToggleFavorite,
  onDelete
}: RecommendationSectionProps) {
  if (movies.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
          <p className="text-slate-400">{description}</p>
        </div>
        <ChevronRight className="w-6 h-6 text-slate-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.slice(0, 4).map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MovieCard
              movie={movie}
              onToggleWatched={onToggleWatched}
              onToggleFavorite={onToggleFavorite}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
