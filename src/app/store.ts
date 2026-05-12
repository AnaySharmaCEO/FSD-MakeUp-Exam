import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movies/movieSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer
  }
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    const serializedState = JSON.stringify({
      movies: state.movies.movies,
      filters: state.movies.filters,
      sortBy: state.movies.sortBy,
      searchQuery: state.movies.searchQuery
    });
    localStorage.setItem('movieAppState', serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
