import { createSelector } from '@reduxjs/toolkit';
import { filterMovies, sortMovies, calculateStats } from './movieUtils';
import { RootState } from '../../app/store';

// Basic selectors
export const selectAllMovies = (state: RootState) => state.movies.movies;
export const selectFilters = (state: RootState) => state.movies.filters;
export const selectSortBy = (state: RootState) => state.movies.sortBy;
export const selectSearchQuery = (state: RootState) => state.movies.searchQuery;
export const selectLoading = (state: RootState) => state.movies.loading;

// Memoized selector for filtered and sorted movies
export const selectFilteredAndSortedMovies = createSelector(
  [selectAllMovies, selectFilters, selectSortBy],
  (movies, filters, sortBy) => {
    const filtered = filterMovies(movies, filters);
    return sortMovies(filtered, sortBy);
  }
);

// Selector for favorite movies
export const selectFavoriteMovies = createSelector(
  [selectAllMovies],
  (movies) => movies.filter(movie => movie.favorite)
);

// Selector for watched movies
export const selectWatchedMovies = createSelector(
  [selectAllMovies],
  (movies) => movies.filter(movie => movie.watched)
);

// Selector for dashboard statistics
export const selectDashboardStats = createSelector(
  [selectAllMovies],
  (movies) => calculateStats(movies)
);

// Selector for unique genres
export const selectUniqueGenres = createSelector(
  [selectAllMovies],
  (movies) => {
    const genres = [...new Set(movies.map(m => m.genre))];
    return genres.sort();
  }
);
