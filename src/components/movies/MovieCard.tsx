import { Star, Eye, EyeOff, Heart, Trash2, Calendar, Film } from 'lucide-react';
import { Movie } from '../../utils/constants';
import { Card, CardContent } from '../../app/components/ui/card';
import { Button } from '../../app/components/ui/button';
import { Badge } from '../../app/components/ui/badge';
import { motion } from 'motion/react';

interface MovieCardProps {
  movie: Movie;
  onToggleWatched: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
}

export function MovieCard({ movie, onToggleWatched, onToggleFavorite, onDelete }: MovieCardProps) {
  return (
    <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 group overflow-hidden">
      <CardContent className="p-6 relative">
        {/* Hover gradient effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />

        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                {movie.genre}
              </Badge>
              <Badge variant="outline" className="border-slate-700 text-slate-400">
                {movie.rating}
              </Badge>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(movie.id)}
              className={`shrink-0 ${
                movie.favorite
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-slate-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${movie.favorite ? 'fill-current' : ''}`} />
            </Button>
          </motion.div>
        </div>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center text-slate-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center text-slate-400">
            <Film className="w-4 h-4 mr-2" />
            <span className="line-clamp-1">{movie.director}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
          <Button
            variant={movie.watched ? "default" : "outline"}
            size="sm"
            onClick={() => onToggleWatched(movie.id)}
            className={`flex-1 ${
              movie.watched
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {movie.watched ? (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Watched
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Unwatched
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(movie.id)}
            className="border-slate-700 text-slate-400 hover:text-red-500 hover:border-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
