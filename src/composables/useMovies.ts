/**
 * Composable for managing movie-related operations
 * Provides reactive state and methods for movie interactions
 */
import { computed } from 'vue'
import { useMoviesStore } from '@/stores/movies'

export const useMovies = () => {
  const moviesStore = useMoviesStore()
  
  // Reactive computed properties
  const movies = computed(() => moviesStore.movies)
  const isLoading = computed(() => moviesStore.isLoading)

  /**
   * Fetches all movies from the store
   * Handles errors and provides error logging
   */
  const getMovies = async () => {
    try {
      const movies = await moviesStore.getMovies()
      return movies
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Updates a movie's rating
   * @param title - Movie title
   * @param rating - New rating value
   */
  const rateMovie = async (title: string, rating: number) => {
    try {
      const movie = await moviesStore.rateMovie(title, rating)
      return movie
    } catch (error) {
      console.error(error)
    }
  }

  return { movies, isLoading, getMovies, rateMovie }
}
