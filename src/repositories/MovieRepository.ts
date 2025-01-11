import type { Movie, MovieWithRating } from '@/types/Movie'
import movies from '@/data/movies.json'
import { calculateNewRating } from '@/utils/calculateNewRating'

export class MovieRepository {
  async getMovies(): Promise<MovieWithRating[]> {
    const moviesLocalStorage = localStorage.getItem('movies')

    if (moviesLocalStorage) return JSON.parse(moviesLocalStorage)

    // add rating average to every movie
    const moviesFromJson = movies.map((movie: Movie) => {
      return {
        ...movie,
        averageRating: Math.floor(Math.random() * 10) + 1,
        totalRating: Math.floor(Math.random() * 100) + 1,
      }
    })

    localStorage.setItem('movies', JSON.stringify(moviesFromJson))

    return moviesFromJson
  }

  // At this point, we should have the movies in the localStorage
  async getMovieByTitle(title: string): Promise<MovieWithRating | null> {
    const movies = await this.getMovies()

    const movie = movies.find((movie: MovieWithRating) => movie.title === title)

    return movie ?? null
  }

  // At this point, we should have the movies in the localStorage
  async rateMovie(title: string, rating: number): Promise<void> {
    const movie = await this.getMovieByTitle(title)

    if (movie) {
      const newMovie = calculateNewRating(movie, rating)

      const movies = await this.getMovies()

      const newMovies = movies.map((movie: MovieWithRating) => {
        return movie.title === title ? newMovie : movie
      })

      localStorage.setItem('movies', JSON.stringify(newMovies))
    }
  }
}
