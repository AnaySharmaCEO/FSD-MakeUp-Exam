export const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Drama',
  'Documentary',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
  'Western'
];

export const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'TV-MA', 'Not Rated', 'Unrated', 'Approved'];

export const SORT_OPTIONS = [
  { value: 'title-asc', label: 'Title (A-Z)' },
  { value: 'title-desc', label: 'Title (Z-A)' },
  { value: 'year-desc', label: 'Year (Newest)' },
  { value: 'year-asc', label: 'Year (Oldest)' },
  { value: 'recent', label: 'Recently Added' }
];

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: string;
  imdbId: string;
  writer: string;
  director: string;
  watched: boolean;
  favorite: boolean;
  createdAt: string;
}

export interface MovieFilters {
  genre: string;
  rating: string;
  watchStatus: string;
  searchQuery: string;
}
