import type { MovieWithRating } from "@/types/Movie";

/**
 * Calculates the new average rating for a movie after adding a new rating
 * @param currentMovie - Movie object with current rating and total votes
 * @param newRating - New rating value (1-10)
 * @returns Object with updated averageRating and totalRatings
 */
export const calculateNewRating = (currentMovie: MovieWithRating, newRating: number): MovieWithRating => {
    // Validate rating is between 1 and 10
    if (newRating < 1 || newRating > 10) {
      throw new Error('Rating must be between 1 and 10');

    }
  
    // Increment total ratings
    const newTotalRatings = currentMovie.totalRating + 1;
  
    // Calculate new average
    // (Current average * current total + new rating) / new total
    const newAverageRating = (
      (currentMovie.averageRating * currentMovie.totalRating + newRating) / 
      newTotalRatings
    );
  
    return {
        ...currentMovie,
      averageRating: Number(newAverageRating.toFixed(2)), // Round to 2 decimal places
      totalRating: newTotalRatings
    };

  };
