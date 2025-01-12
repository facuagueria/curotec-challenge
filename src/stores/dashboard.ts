import { ref } from 'vue'
import { defineStore } from 'pinia'
import { MovieService } from '@/services/MovieService'
import { MovieRepository } from '@/repositories/MovieRepository'

const movieService = new MovieService(new MovieRepository())

type Stats = {
  totalMovies: number
  moviesByRating: {
    rating: number
    count: number
  }[]
}

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref<Stats>({
    totalMovies: 0,

    moviesByRating: [],
  })
  const isLoading = ref(false)

  async function getStats() {
    isLoading.value = true
    // simulate an API call
    setTimeout(async () => {
      stats.value.totalMovies = (await movieService.getMovies()).length

      // search movies by rating, taking into account that rating is between 1 and 10
      const moviesByRating = (await movieService.getMovies()).reduce(
        (acc, movie) => {
          acc[movie.averageRating] = (acc[movie.averageRating] || 0) + 1
          return acc
        },
        {} as Record<number, number>,
      )

      stats.value.moviesByRating = Object.entries(moviesByRating).map(([rating, count]) => ({
        rating: parseInt(rating),
        count,
      }))

      isLoading.value = false
    }, 2000)
  }

  return { stats, isLoading, getStats }
})
