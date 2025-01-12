import type { MovieWithRating } from '@/types/Movie'

export interface MovieServiceInterface {
  getMovies(): Promise<MovieWithRating[]>
  getMovieByField(
    field: keyof MovieWithRating,
    value: MovieWithRating[keyof MovieWithRating],
  ): Promise<MovieWithRating | null>
  rateMovie(title: string, rating: number): Promise<void>
}
