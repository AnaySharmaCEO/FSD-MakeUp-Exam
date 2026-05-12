import { Play, Plus, Info } from 'lucide-react';
import { Button } from '../../app/components/ui/button';
import { Link } from 'react-router';
import { Movie } from '../../utils/constants';
import { motion } from 'motion/react';
import { useTheme, getAccentClasses } from '../../context/ThemeContext';

interface HeroSectionProps {
  featuredMovie: Movie | null;
}

export function HeroSection({ featuredMovie }: HeroSectionProps) {
  const { accentColor } = useTheme();
  const accentClasses = getAccentClasses(accentColor);

  if (!featuredMovie) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-[600px] mb-12 rounded-2xl overflow-hidden"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${accentClasses.gradient} opacity-20`} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full mb-4"
          >
            <span className={`${accentClasses.text} font-semibold`}>Featured Movie</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
          >
            {featuredMovie.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="px-3 py-1 bg-slate-800 rounded-md text-white font-medium">
              {featuredMovie.year}
            </span>
            <span className="px-3 py-1 bg-slate-800 rounded-md text-white font-medium">
              {featuredMovie.genre}
            </span>
            <span className="px-3 py-1 bg-slate-800 rounded-md text-white font-medium">
              {featuredMovie.rating}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-slate-300 text-lg mb-8 line-clamp-3"
          >
            Directed by {featuredMovie.director}. {featuredMovie.writer && `Written by ${featuredMovie.writer}.`}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/movies">
              <Button className={`${accentClasses.primary} text-white px-8 py-6 text-lg`}>
                <Play className="w-5 h-5 mr-2" />
                Explore Movies
              </Button>
            </Link>
            <Link to="/favorites">
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 px-8 py-6 text-lg">
                <Plus className="w-5 h-5 mr-2" />
                My Watchlist
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
