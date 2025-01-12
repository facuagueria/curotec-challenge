import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest'
import { MovieRepository } from './MovieRepository'
import movies from '@/data/movies.json'
import { calculateNewRating } from '@/utils/calculateNewRating'

// Mock calculateNewRating
vi.mock('@/utils/calculateNewRating', () => ({
  calculateNewRating: vi.fn(),
}))

describe('MovieRepository', () => {
  let repository: MovieRepository
  let localStorageMock: Record<string, string>

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {}
    global.localStorage = {
      getItem: vi.fn((key) => localStorageMock[key] || null),
      setItem: vi.fn((key, value) => {
        localStorageMock[key] = value
      }),
      clear: vi.fn(),
      removeItem: vi.fn(),
      key: vi.fn(),
      length: 0,
    }

    repository = new MovieRepository()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getMovies', () => {
    it('should return movies from localStorage if available', async () => {
      const mockMovies = [
        {
          title: 'Test Movie',
          cast: [],
          genres: [],
          year: 2024,
          averageRating: 8,
          totalRating: 50,
        },
      ]
      localStorageMock.movies = JSON.stringify(mockMovies)

      const result = await repository.getMovies()

      expect(result).toEqual(mockMovies)
      expect(localStorage.getItem).toHaveBeenCalledWith('movies')
    })

    it('should initialize movies with random ratings if not in localStorage', async () => {
      const result = await repository.getMovies()

      expect(result.length).toBe(movies.length)
      result.forEach((movie) => {
        expect(movie.averageRating).toBeGreaterThanOrEqual(1)
        expect(movie.averageRating).toBeLessThanOrEqual(10)
        expect(movie.totalRating).toBeGreaterThanOrEqual(1)
        expect(movie.totalRating).toBeLessThanOrEqual(100)
      })
      expect(localStorage.setItem).toHaveBeenCalledWith('movies', expect.any(String))
    })
  })

  describe('getMovieByTitle', () => {
    it('should return movie if found', async () => {
      const mockMovies = [
        {
          title: 'Test Movie',
          cast: [],
          genres: [],
          year: 2024,
          averageRating: 8,
          totalRating: 50,
        },
        {
          title: 'Another Movie',
          cast: [],
          genres: [],
          year: 2024,
          averageRating: 7,
          totalRating: 30,
        },
      ]
      localStorageMock.movies = JSON.stringify(mockMovies)

      const result = await repository.getMovieByField('title', 'Test Movie')

      expect(result).toEqual(mockMovies[0])
    })

    it('should return null if movie not found', async () => {
      const mockMovies = [
        {
          title: 'Test Movie',
          cast: [],
          genres: [],
          year: 2024,
          averageRating: 8,
          totalRating: 50,
        },
      ]
      localStorageMock.movies = JSON.stringify(mockMovies)

      const result = await repository.getMovieByField('title', 'Non Existent')

      expect(result).toBeNull()
    })
  })

  describe('rateMovie', () => {
    it('should update movie rating if movie exists', async () => {
      const mockMovies = [
        {
          title: 'Test Movie',
          cast: [],
          genres: [],
          year: 2024,
          averageRating: 8,
          totalRating: 50,
        },
        {
          title: 'Another Movie',
          cast: [],
          genres: [],
          year: 2024,
          averageRating: 7,
          totalRating: 30,
        },
      ]
      localStorageMock.movies = JSON.stringify(mockMovies)

      const updatedMovie = { ...mockMovies[0], averageRating: 8.5, totalRating: 51 }
      vi.mocked(calculateNewRating).mockReturnValue(updatedMovie)

      await repository.rateMovie('Test Movie', 9)

      expect(calculateNewRating).toHaveBeenCalledWith(mockMovies[0], 9)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'movies',
        JSON.stringify([updatedMovie, mockMovies[1]]),
      )
    })

    it('should not update anything if movie does not exist', async () => {
      const mockMovies = [
        {
          title: 'Test Movie',
          cast: [],
          genres: [],
          year: 2024,
          averageRating: 8,
          totalRating: 50,
        },
      ]
      localStorageMock.movies = JSON.stringify(mockMovies)

      await repository.rateMovie('Non Existent', 9)

      expect(calculateNewRating).not.toHaveBeenCalled()
      expect(localStorage.setItem).not.toHaveBeenCalled()
    })
  })
})
