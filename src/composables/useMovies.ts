import { computed } from 'vue'
import { useMoviesStore } from '@/stores/movies'

export const useMovies = () => {
  const moviesStore = useMoviesStore()
  const movies = computed(() => moviesStore.movies)
  const isLoading = computed(() => moviesStore.isLoading)

  const getMovies = async () => {
    try {
      const movies = await moviesStore.getMovies()

      return movies
    } catch (error) {
      console.error(error)
    }
  }

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
