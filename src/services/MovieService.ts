import type { MovieRepository } from '@/repositories/MovieRepository'
import type { MovieServiceInterface } from '@/interfaces/MovieInterface'

export class MovieService implements MovieServiceInterface {
  constructor(private movieRepository: MovieRepository) {}

  async getMovies() {
    return this.movieRepository.getMovies()
  }

  async getMovieByTitle(title: string) {
    return this.movieRepository.getMovieByTitle(title)
  }

  async rateMovie(title: string, rating: number) {
    return this.movieRepository.rateMovie(title, rating)
  }

}
