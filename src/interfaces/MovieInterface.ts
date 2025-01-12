/**
 * Interface defining the contract for movie-related services
 * Ensures consistent implementation of movie operations across the application
 */
import type { MovieWithRating } from '@/types/Movie'

export interface MovieServiceInterface {
  /**
   * Retrieves all movies with their ratings
   */
  getMovies(): Promise<MovieWithRating[]>

  /**
   * Finds a movie by any field in MovieWithRating
   * @param field - Field to search by
   * @param value - Value to match
   */
  getMovieByField(
    field: keyof MovieWithRating,
    value: MovieWithRating[keyof MovieWithRating],
  ): Promise<MovieWithRating | null>

  /**
   * Updates a movie's rating
   * @param title - Movie title
   * @param rating - New rating value
   */
  rateMovie(title: string, rating: number): Promise<void>
}
