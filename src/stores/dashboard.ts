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

      const moviesByRating = (await movieService.getMovies()).reduce(
        (acc, movie) => {
          const rating = Math.floor(movie.averageRating)
          acc[rating] = (acc[rating] || 0) + 1
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
