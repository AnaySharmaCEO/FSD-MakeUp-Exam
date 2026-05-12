import { Movie, MovieFilters } from '../../utils/constants';

/**
 * Utility functions for movie operations
 */

export const filterMovies = (movies: Movie[], filters: MovieFilters): Movie[] => {
  let filtered = [...movies];

  // Search by title
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(movie =>
      movie.title.toLowerCase().includes(query) ||
      movie.director?.toLowerCase().includes(query) ||
      movie.writer?.toLowerCase().includes(query)
    );
  }

  // Filter by genre
  if (filters.genre && filters.genre !== 'all') {
    filtered = filtered.filter(movie => movie.genre === filters.genre);
  }

  // Filter by rating
  if (filters.rating && filters.rating !== 'all') {
    filtered = filtered.filter(movie => movie.rating === filters.rating);
  }

  // Filter watched/unwatched
  if (filters.watchStatus === 'watched') {
    filtered = filtered.filter(movie => movie.watched);
  } else if (filters.watchStatus === 'unwatched') {
    filtered = filtered.filter(movie => !movie.watched);
  }

  return filtered;
};

export const sortMovies = (movies: Movie[], sortBy: string): Movie[] => {
  const sorted = [...movies];

  switch (sortBy) {
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'year-desc':
      return sorted.sort((a, b) => b.year - a.year);
    case 'year-asc':
      return sorted.sort((a, b) => a.year - b.year);
    case 'recent':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    default:
      return sorted;
  }
};

export const calculateStats = (movies: Movie[]) => {
  const total = movies.length;
  const watched = movies.filter(m => m.watched).length;
  const unwatched = total - watched;
  const favorites = movies.filter(m => m.favorite).length;

  // Most common genre
  const genreCounts = movies.reduce((acc: Record<string, number>, movie) => {
    acc[movie.genre] = (acc[movie.genre] || 0) + 1;
    return acc;
  }, {});
  const mostCommonGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  // Recently added
  const recentMovies = [...movies].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const recentlyAdded = recentMovies[0]?.title || 'None';

  return {
    total,
    watched,
    unwatched,
    favorites,
    mostCommonGenre,
    recentlyAdded
  };
};
