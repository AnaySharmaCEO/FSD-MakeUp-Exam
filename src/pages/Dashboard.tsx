import { useSelector } from 'react-redux';
import { Film, Eye, EyeOff, Heart, TrendingUp, Star } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { selectDashboardStats, selectWatchedMovies, selectFavoriteMovies } from '../features/movies/movieSelectors';
import { motion } from 'motion/react';
import { Progress } from '../app/components/ui/progress';

export function Dashboard() {
  const stats = useSelector(selectDashboardStats);
  const watchedMovies = useSelector(selectWatchedMovies);
  const favoriteMovies = useSelector(selectFavoriteMovies);

  const watchPercentage = stats.total > 0 ? Math.round((stats.watched / stats.total) * 100) : 0;

  const statsData = [
    {
      title: 'Total Movies',
      value: stats.total,
      icon: Film,
      color: 'bg-blue-600'
    },
    {
      title: 'Watched Movies',
      value: stats.watched,
      icon: Eye,
      color: 'bg-green-600'
    },
    {
      title: 'Unwatched Movies',
      value: stats.unwatched,
      icon: EyeOff,
      color: 'bg-yellow-600'
    },
    {
      title: 'Favorite Movies',
      value: stats.favorites,
      icon: Heart,
      color: 'bg-red-600'
    },
    {
      title: 'Most Common Genre',
      value: stats.mostCommonGenre,
      icon: TrendingUp,
      color: 'bg-purple-600'
    },
    {
      title: 'Recently Added',
      value: stats.recentlyAdded,
      icon: Star,
      color: 'bg-orange-600'
    }
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Overview of your movie collection</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StatCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            </motion.div>
          ))}
        </div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Your Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 font-medium">Watch Completion</span>
                <span className="text-white font-bold">{watchPercentage}%</span>
              </div>
              <Progress value={watchPercentage} className="h-3" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-slate-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{stats.watched}</div>
                <div className="text-sm text-slate-400">Completed</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{stats.unwatched}</div>
                <div className="text-sm text-slate-400">To Watch</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{stats.favorites}</div>
                <div className="text-sm text-slate-400">Favorites</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{stats.mostCommonGenre}</div>
                <div className="text-sm text-slate-400">Top Genre</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to MovieManiac! 🎬</h2>
          <p className="text-slate-300 leading-relaxed">
            Your personal movie management hub with 600+ movies. Track your watch history, build your favorites collection,
            and get smart recommendations based on your preferences. All your data is automatically saved locally.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
