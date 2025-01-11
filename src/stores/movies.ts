import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Movie } from '@/types/Movie'
import { MovieService } from '@/services/MovieService'
import { MovieRepository } from '@/repositories/MovieRepository'

const movieService = new MovieService(new MovieRepository())

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([])
  const isLoading = ref(false)


  async function getMovies() {
    isLoading.value = true
    // simulate an API call
    setTimeout(async () => {
      movies.value = await movieService.getMovies()
      isLoading.value = false
    }, 2000)
  }


  async function rateMovie(title: string, rating: number) {
    // simulate an API call
    setTimeout(async () => {
      await movieService.rateMovie(title, rating)
    }, 2000)
  }

  return { movies, isLoading, getMovies, rateMovie }
})

