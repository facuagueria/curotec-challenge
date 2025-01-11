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

export interface MovieWithRating extends Movie {
  averageRating: number
  totalRating: number
}
