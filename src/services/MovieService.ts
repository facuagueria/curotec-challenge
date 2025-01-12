import type { MovieRepository } from '@/repositories/MovieRepository'
import type { MovieServiceInterface } from '@/interfaces/MovieInterface'
import type { MovieWithRating } from '@/types/Movie'

export class MovieService implements MovieServiceInterface {
  constructor(private movieRepository: MovieRepository) {}

  async getMovies() {
    return this.movieRepository.getMovies()
  }

  async getMovieByField(
    field: keyof MovieWithRating,
    value: MovieWithRating[keyof MovieWithRating],
  ) {
    return this.movieRepository.getMovieByField(field, value)
  }

  async rateMovie(title: string, rating: number) {
    return this.movieRepository.rateMovie(title, rating)
  }
}
