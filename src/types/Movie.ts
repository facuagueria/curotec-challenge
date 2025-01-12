/**
 * Base movie interface containing core movie properties
 */
export interface Movie {
  title: string
  year: number
  cast: string[]
  genres: string[]
  href?: string | null
  extract?: string
  thumbnail?: string
  thumbnail_width?: number
  thumbnail_height?: number
}

/**
 * Extended movie interface that includes rating information
 * Used throughout the application for displaying and managing movie ratings
 */
export interface MovieWithRating extends Movie {
  averageRating: number // Average rating out of 10
  totalRating: number // Total number of ratings received
}
