import { useSelector, useDispatch } from 'react-redux';
import { Film } from 'lucide-react';
import { MovieCard } from '../components/movies/MovieCard';
import { MovieFilters } from '../components/movies/MovieFilters';
import { EmptyState } from '../components/movies/EmptyState';
import { motion } from 'motion/react';
import {
  selectFilteredAndSortedMovies,
  selectFilters,
  selectSortBy,
  selectUniqueGenres
} from '../features/movies/movieSelectors';
import {
  toggleWatched,
  toggleFavorite,
  deleteMovie,
  setFilter,
  setSortBy,
  setSearchQuery,
  resetFilters
} from '../features/movies/movieSlice';
import { useState } from 'react';
import { Button } from '../app/components/ui/button';

export function Movies() {
  const dispatch = useDispatch();
  const movies = useSelector(selectFilteredAndSortedMovies);
  const filters = useSelector(selectFilters);
  const sortBy = useSelector(selectSortBy);
  const genres = useSelector(selectUniqueGenres);

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

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

  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value));
    setCurrentPage(1);
  };

  const handleGenreChange = (value: string) => {
    dispatch(setFilter({ genre: value }));
    setCurrentPage(1);
  };

  const handleWatchStatusChange = (value: string) => {
    dispatch(setFilter({ watchStatus: value }));
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value));
    setCurrentPage(1);
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">All Movies</h1>
        <p className="text-slate-400">
          {movies.length} {movies.length === 1 ? 'movie' : 'movies'} found
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <MovieFilters
        searchQuery={filters.searchQuery}
        onSearchChange={handleSearchChange}
        genre={filters.genre}
        onGenreChange={handleGenreChange}
        watchStatus={filters.watchStatus}
        onWatchStatusChange={handleWatchStatusChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        genres={genres}
        onReset={handleReset}
        />
      </motion.div>

      {currentMovies.length === 0 ? (
        <EmptyState
          icon={Film}
          title="No movies found"
          description="Try adjusting your filters or search query to find more movies."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentMovies.map((movie, index) => (
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

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Previous
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      onClick={() => handlePageChange(pageNum)}
                      className={
                        currentPage === pageNum
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
