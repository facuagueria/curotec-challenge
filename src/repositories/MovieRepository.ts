/**
 * Repository class for handling movie data operations
 * Manages local storage interactions and movie data transformations
 */
import type { Movie, MovieWithRating } from '@/types/Movie'
import movies from '@/data/movies.json'
import { calculateNewRating } from '@/utils/calculateNewRating'

export class MovieRepository {
  /**
   * Retrieves all movies with ratings
   * If movies exist in localStorage, returns those
   * Otherwise, initializes movies with random ratings
   */
  async getMovies(): Promise<MovieWithRating[]> {
    const moviesLocalStorage = localStorage.getItem('movies')

    if (moviesLocalStorage) return JSON.parse(moviesLocalStorage)

    // Initialize movies with random ratings
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

  /**
   * Finds a movie by any field in the MovieWithRating type
   * @param field - Key of MovieWithRating to search by
   * @param value - Value to match
   * @returns Found movie or null
   */
  async getMovieByField(
    field: keyof MovieWithRating,
    value: MovieWithRating[keyof MovieWithRating],
  ): Promise<MovieWithRating | null> {
    const movies = await this.getMovies()
    const movie = movies.find((movie: MovieWithRating) => movie[field] === value)
    return movie ?? null
  }

  /**
   * Updates a movie's rating
   * @param title - Movie title to update
   * @param rating - New rating value
   */
  async rateMovie(title: string, rating: number): Promise<void> {
    const movie = await this.getMovieByField('title', title)

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
