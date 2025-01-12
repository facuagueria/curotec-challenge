// Store for managing dashboard state
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { MovieService } from '@/services/MovieService'
import { MovieRepository } from '@/repositories/MovieRepository'

// Initialize movie service
const movieService = new MovieService(new MovieRepository())

// Types for statistics
type MoviesByRating = {
  rating: number
  count: number
}

type MoviesByYear = {
  year: number 
  count: number
}

type Stats = {
  totalMovies: number
  moviesByRating: MoviesByRating[]
  moviesByYear: MoviesByYear[]
}

// Define store
export const useDashboardStore = defineStore('dashboard', () => {
  // Initial state
  const stats = ref<Stats>({
    totalMovies: 0,
    moviesByRating: [],
    moviesByYear: [],
  })

  const isLoading = ref(false)

  // Get movies grouped by rating
  const getMoviesByRating = async () => {
    // Reduce movies to an object with rating counts
    const moviesByRating = (await movieService.getMovies()).reduce(
      (acc, movie) => {
        const rating = Math.floor(movie.averageRating)
        acc[rating] = (acc[rating] || 0) + 1
        return acc
      },
      {} as Record<number, number>,
    )

    // Convert to array of objects
    return Object.entries(moviesByRating).map(([rating, count]) => ({
      rating: parseInt(rating),
      count,
    }))
  }

  // Get movies grouped by year
  const getMoviesByYear = async () => {
    // Similar to getMoviesByRating but grouping by year
    const moviesByYear = (await movieService.getMovies()).reduce(
      (acc, movie) => {
        const year = movie.year
        acc[year] = (acc[year] || 0) + 1
        return acc
      },
      {} as Record<number, number>,
    )

    return Object.entries(moviesByYear).map(([year, count]) => ({
      year: parseInt(year),
      count,
    }))
  }

  // Get all statistics
  async function getStats() {
    isLoading.value = true
    // Simulate API delay
    setTimeout(async () => {
      stats.value.totalMovies = (await movieService.getMovies()).length
      stats.value.moviesByRating = await getMoviesByRating()
      stats.value.moviesByYear = await getMoviesByYear()

      isLoading.value = false
    }, 2000)
  }

  return { stats, isLoading, getStats }
})