import { ref } from 'vue'
import { defineStore } from 'pinia'
import { MovieService } from '@/services/MovieService'
import { MovieRepository } from '@/repositories/MovieRepository'

const movieService = new MovieService(new MovieRepository())

type MovieStats = {
  rating?: number
  year?: number
  count: number
}


type Stats = {
  totalMovies: number
  moviesByRating: MovieStats[]
  moviesByYear: MovieStats[]
}

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref<Stats>({
    totalMovies: 0,
    moviesByRating: [],
    moviesByYear: [],
  })

  const isLoading = ref(false)

  const getMoviesByRating = async () => {
    const moviesByRating = (await movieService.getMovies()).reduce(
      (acc, movie) => {
        const rating = Math.floor(movie.averageRating)
        acc[rating] = (acc[rating] || 0) + 1
        return acc
      },
      {} as Record<number, number>,
    )

    return Object.entries(moviesByRating).map(([rating, count]) => ({
      rating: parseInt(rating),
      count,
    }))
  }

  const getMoviesByYear = async () => {
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

  async function getStats() {
    isLoading.value = true
    // simulate an API call
    setTimeout(async () => {
      stats.value.totalMovies = (await movieService.getMovies()).length
      stats.value.moviesByRating = await getMoviesByRating()
      stats.value.moviesByYear = await getMoviesByYear()

      isLoading.value = false
    }, 2000)
  }

  return { stats, isLoading, getStats }
})
