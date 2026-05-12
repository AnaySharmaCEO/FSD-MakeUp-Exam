import { Movie } from '../../utils/constants';

export interface RecommendationSection {
  title: string;
  description: string;
  movies: Movie[];
}

/**
 * Generate smart movie recommendations based on user behavior
 */
export function generateRecommendations(
  allMovies: Movie[],
  kidsMode: boolean
): RecommendationSection[] {
  const sections: RecommendationSection[] = [];

  // Filter for kids mode if enabled
  const availableMovies = kidsMode
    ? allMovies.filter(m =>
        ['Animation', 'Family', 'Comedy', 'Adventure'].includes(m.genre) &&
        ['G', 'PG', 'PG-13'].includes(m.rating)
      )
    : allMovies;

  // 1. Based on Watch History
  const watchedMovies = availableMovies.filter(m => m.watched);
  if (watchedMovies.length > 0) {
    const mostWatchedGenre = getMostCommonGenre(watchedMovies);
    const genreRecommendations = availableMovies
      .filter(m => !m.watched && m.genre === mostWatchedGenre)
      .slice(0, 6);

    if (genreRecommendations.length > 0) {
      sections.push({
        title: `Because You Watch ${mostWatchedGenre}`,
        description: `More ${mostWatchedGenre} movies based on your history`,
        movies: genreRecommendations
      });
    }
  }

  // 2. Popular Unwatched Movies
  const unwatchedMovies = availableMovies
    .filter(m => !m.watched)
    .sort((a, b) => b.year - a.year)
    .slice(0, 6);

  if (unwatchedMovies.length > 0) {
    sections.push({
      title: kidsMode ? 'Discover New Adventures' : 'Trending & New Releases',
      description: kidsMode
        ? 'Exciting new movies perfect for you'
        : 'Popular movies you haven\'t watched yet',
      movies: unwatchedMovies
    });
  }

  // 3. Continue Watching (watched but revisit)
  if (watchedMovies.length > 0) {
    const recentWatched = [...watchedMovies]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);

    sections.push({
      title: 'Watch Again',
      description: 'Movies you loved',
      movies: recentWatched
    });
  }

  // 4. From Your Favorites
  const favoriteMovies = availableMovies.filter(m => m.favorite);
  if (favoriteMovies.length > 0) {
    const favoriteGenres = [...new Set(favoriteMovies.map(m => m.genre))];
    const similarToFavorites = availableMovies
      .filter(m => !m.favorite && favoriteGenres.includes(m.genre))
      .slice(0, 6);

    if (similarToFavorites.length > 0) {
      sections.push({
        title: 'More Like Your Favorites',
        description: 'Similar to movies you marked as favorites',
        movies: similarToFavorites
      });
    }
  }

  // 5. Explore Different Genres
  const genres = [...new Set(availableMovies.map(m => m.genre))];
  const randomGenre = genres[Math.floor(Math.random() * genres.length)];
  const genreMovies = availableMovies
    .filter(m => m.genre === randomGenre)
    .slice(0, 6);

  if (genreMovies.length > 0) {
    sections.push({
      title: `Explore ${randomGenre}`,
      description: `Discover great ${randomGenre} movies`,
      movies: genreMovies
    });
  }

  return sections;
}

function getMostCommonGenre(movies: Movie[]): string {
  const genreCounts = movies.reduce((acc: Record<string, number>, movie) => {
    acc[movie.genre] = (acc[movie.genre] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Action';
}

export function getFeaturedMovie(movies: Movie[]): Movie | null {
  // Get a highly rated recent movie
  const candidates = movies
    .filter(m => m.year >= 2020)
    .sort((a, b) => b.year - a.year);

  return candidates[0] || movies[0] || null;
}
