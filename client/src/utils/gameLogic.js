/**
 * Game Logic Utility Functions
 * 
 * Contains pure functions for determining outcomes, formatting overs,
 * and managing game state transitions. Separated from rendering logic
 * for clean separation of concerns.
 */

import { AGGRESSIVE_PROBABILITIES, DEFENSIVE_PROBABILITIES } from '../data/probabilities';

// ===== Game Constants =====
export const TOTAL_OVERS = 2;          // 2 overs per match
export const BALLS_PER_OVER = 6;       // 6 balls per over
export const TOTAL_BALLS = TOTAL_OVERS * BALLS_PER_OVER; // 12 balls total
export const TOTAL_WICKETS = 2;        // 2 wickets max

/**
 * Returns the probability distribution for the selected batting style.
 * @param {string} style - 'aggressive' or 'defensive'
 * @returns {Array} - Array of probability segment objects
 */
export const getProbabilities = (style) => {
  return style === 'aggressive' ? AGGRESSIVE_PROBABILITIES : DEFENSIVE_PROBABILITIES;
};

/**
 * Determines the outcome based on the slider's current position on the power bar.
 * 
 * HOW IT WORKS:
 * The power bar spans from 0.0 to 1.0. Each outcome occupies a segment
 * proportional to its probability. The slider position (0 to 1) falls into
 * exactly one segment, and that segment's outcome is the result.
 * 
 * Example (Aggressive):
 *   [0.00 - 0.40) = Wicket
 *   [0.40 - 0.50) = 0 Runs
 *   [0.50 - 0.60) = 1 Run
 *   [0.60 - 0.70) = 2 Runs
 *   [0.70 - 0.75) = 3 Runs
 *   [0.75 - 0.85) = 4 Runs
 *   [0.85 - 1.00] = 6 Runs
 * 
 * @param {number} sliderPosition - Current slider position (0 to 1)
 * @param {Array} probabilities - The active probability distribution
 * @returns {Object} - The matching outcome segment { label, value, probability, color }
 */
export const determineOutcome = (sliderPosition, probabilities) => {
  let cumulative = 0;

  for (let i = 0; i < probabilities.length; i++) {
    cumulative += probabilities[i].probability;
    // Check if slider falls within this segment
    if (sliderPosition <= cumulative) {
      return probabilities[i];
    }
  }

  // Fallback: return last segment (handles floating point edge case)
  return probabilities[probabilities.length - 1];
};

/**
 * Formats the current ball count into overs notation (e.g., 1.3 = 1 over, 3 balls).
 * @param {number} ballsBowled - Total balls bowled so far
 * @returns {string} - Formatted overs string (e.g., "1.3")
 */
export const formatOvers = (ballsBowled) => {
  const completedOvers = Math.floor(ballsBowled / BALLS_PER_OVER);
  const remainingBalls = ballsBowled % BALLS_PER_OVER;
  return `${completedOvers}.${remainingBalls}`;
};

/**
 * Checks if the game should end.
 * @param {number} ballsBowled - Total balls bowled
 * @param {number} wickets - Total wickets fallen
 * @returns {boolean} - Whether the game is over
 */
export const isGameOver = (ballsBowled, wickets) => {
  return ballsBowled >= TOTAL_BALLS || wickets >= TOTAL_WICKETS;
};

/**
 * Returns the initial game state for starting/restarting.
 * @returns {Object} - Fresh game state
 */
export const getInitialGameState = () => ({
  runs: 0,
  wickets: 0,
  ballsBowled: 0,
  battingStyle: 'aggressive',
  gameOver: false,
  lastOutcome: null,
  commentary: 'Select your batting style and play a shot! 🏏',
  isAnimating: false,
  ballAnimation: 'idle',       // 'idle' | 'bowling' | 'batting' | 'result'
});