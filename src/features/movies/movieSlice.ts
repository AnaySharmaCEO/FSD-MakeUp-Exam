import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moviesData from '../../data/movies.json';
import { Movie, MovieFilters } from '../../utils/constants';

interface MovieState {
  movies: Movie[];
  filters: MovieFilters;
  sortBy: string;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

// Load initial state from localStorage
const loadStateFromLocalStorage = (): MovieState | null => {
  try {
    const serializedState = localStorage.getItem('movieAppState');
    if (serializedState) {
      const state = JSON.parse(serializedState);
      // Merge with imported data, preserving user modifications
      const movieMap = new Map(state.movies.map((m: Movie) => [m.id, m]));
      const mergedMovies = (moviesData as Movie[]).map(movie =>
        movieMap.has(movie.id) ? movieMap.get(movie.id)! : movie
      );

      // Add any user-added movies that aren't in the original dataset
      const userAddedMovies = state.movies.filter((m: Movie) => m.id > 10000);
      return {
        movies: [...mergedMovies, ...userAddedMovies],
        filters: state.filters || {
          genre: 'all',
          rating: 'all',
          watchStatus: 'all',
          searchQuery: ''
        },
        sortBy: state.sortBy || 'title-asc',
        searchQuery: state.searchQuery || '',
        loading: false,
        error: null
      };
    }
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
  }
  return null;
};

const initialState: MovieState = loadStateFromLocalStorage() || {
  movies: moviesData as Movie[],
  filters: {
    genre: 'all',
    rating: 'all',
    watchStatus: 'all',
    searchQuery: ''
  },
  sortBy: 'title-asc',
  searchQuery: '',
  loading: false,
  error: null
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // Add a new movie (user-created)
    addMovie: (state, action: PayloadAction<Partial<Movie>>) => {
      const newMovie: Movie = {
        id: Date.now(),
        title: action.payload.title || '',
        year: action.payload.year || new Date().getFullYear(),
        genre: action.payload.genre || 'Drama',
        rating: action.payload.rating || 'PG-13',
        imdbId: action.payload.imdbId || '',
        writer: action.payload.writer || 'Unknown',
        director: action.payload.director || 'Unknown',
        watched: false,
        favorite: false,
        createdAt: new Date().toISOString()
      };
      state.movies.unshift(newMovie);
    },

    // Delete a movie
    deleteMovie: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
    },

    // Update a movie
    updateMovie: (state, action: PayloadAction<Movie>) => {
      const index = state.movies.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.movies[index] = { ...state.movies[index], ...action.payload };
      }
    },

    // Toggle watched status
    toggleWatched: (state, action: PayloadAction<number>) => {
      const movie = state.movies.find(m => m.id === action.payload);
      if (movie) {
        movie.watched = !movie.watched;
      }
    },

    // Toggle favorite status
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const movie = state.movies.find(m => m.id === action.payload);
      if (movie) {
        movie.favorite = !movie.favorite;
      }
    },

    // Set filter
    setFilter: (state, action: PayloadAction<Partial<MovieFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // Set sort
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },

    // Set search query
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },

    // Reset filters
    resetFilters: (state) => {
      state.filters = {
        genre: 'all',
        rating: 'all',
        watchStatus: 'all',
        searchQuery: ''
      };
      state.sortBy = 'title-asc';
    }
  }
});

export const {
  addMovie,
  deleteMovie,
  updateMovie,
  toggleWatched,
  toggleFavorite,
  setFilter,
  setSortBy,
  setSearchQuery,
  resetFilters
} = movieSlice.actions;

export default movieSlice.reducer;
