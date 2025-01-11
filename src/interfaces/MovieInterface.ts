import type { MovieWithRating } from '@/types/Movie'

export interface MovieServiceInterface {
  getMovies(): Promise<MovieWithRating[]>
  getMovieByTitle(title: string): Promise<MovieWithRating | null>
  rateMovie(title: string, rating: number): Promise<void>
}
