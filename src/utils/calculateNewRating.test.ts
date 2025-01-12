import { describe, it, expect } from 'vitest'
import { calculateNewRating } from './calculateNewRating'
import type { MovieWithRating } from '@/types/Movie'

describe('calculateNewRating', () => {
  it('should calculate new average rating correctly', () => {
    // Arrange
    const mockMovie: MovieWithRating = {
      title: 'Test Movie',
      cast: [],
      genres: [],
      year: 2024,
      averageRating: 8,
      totalRating: 100,
    }

    const newRating = 6

    // Act
    const result = calculateNewRating(mockMovie, newRating)

    // Assert
    expect(result.averageRating).toBe(7.98)
    expect(result.totalRating).toBe(101)
  })

  it('should preserve existing movie properties', () => {
    // Arrange
    const mockMovie: MovieWithRating = {
      title: 'Test Movie',
      cast: [],
      genres: [],
      year: 2024,
      averageRating: 8,
      totalRating: 100,
    }

    const newRating = 6

    // Act
    const result = calculateNewRating(mockMovie, newRating)

    // Assert
    expect(result.title).toBe(mockMovie.title)
    expect(result.year).toBe(mockMovie.year)
  })

  it('should throw error for ratings outside 1-10 range', () => {
    // Arrange
    const mockMovie: MovieWithRating = {
      title: 'Test Movie',
      cast: [],
      genres: [],
      year: 2024,
      averageRating: 8,
      totalRating: 100,
    }

    const invalidRatings = [11, 0, -1]

    // Act & Assert
    invalidRatings.forEach((rating) => {
      expect(() => calculateNewRating(mockMovie, rating)).toThrow('Rating must be between 1 and 10')
    })
  })

  it('should round average rating to 2 decimal places', () => {
    // Arrange
    const mockMovie: MovieWithRating = {
      title: 'Test Movie',
      cast: [],
      genres: [],
      year: 2024,
      averageRating: 8.333333,
      totalRating: 100,
    }

    const newRating = 7

    // Act
    const result = calculateNewRating(mockMovie, newRating)

    // Assert
    expect(result.averageRating.toString()).toMatch(/^\d+\.\d{2}$/)
  })
})
