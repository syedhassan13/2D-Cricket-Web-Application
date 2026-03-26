/**
 * Probability Distributions for Batting Styles
 * 
 * Each batting style has a set of outcomes with assigned probabilities.
 * The probabilities MUST sum exactly to 1.0.
 * 
 * The power bar is divided into segments proportional to these probabilities.
 * For example, if Wicket = 0.40, then 40% of the power bar represents the Wicket zone.
 * 
 * Aggressive: High risk (40% wicket chance) but high reward (15% six, 10% four).
 * Defensive:  Low risk (15% wicket chance) but low reward (5% six, 5% four).
 */

// Each entry: { label, probability, color }
// Order determines segment placement on the power bar (left to right).

export const AGGRESSIVE_PROBABILITIES = [
  { label: 'Wicket', value: 'W', probability: 0.40, color: '#e74c3c' },   // Red - Danger
  { label: '0 Runs', value: 0,   probability: 0.10, color: '#95a5a6' },   // Gray - Dot ball
  { label: '1 Run',  value: 1,   probability: 0.10, color: '#3498db' },   // Blue - Single
  { label: '2 Runs', value: 2,   probability: 0.10, color: '#2ecc71' },   // Green - Double
  { label: '3 Runs', value: 3,   probability: 0.05, color: '#1abc9c' },   // Teal - Triple
  { label: '4 Runs', value: 4,   probability: 0.10, color: '#f39c12' },   // Orange - Boundary
  { label: '6 Runs', value: 6,   probability: 0.15, color: '#9b59b6' },   // Purple - Six!
];

export const DEFENSIVE_PROBABILITIES = [
  { label: 'Wicket', value: 'W', probability: 0.15, color: '#e74c3c' },   // Red - Danger
  { label: '0 Runs', value: 0,   probability: 0.25, color: '#95a5a6' },   // Gray - Dot ball
  { label: '1 Run',  value: 1,   probability: 0.25, color: '#3498db' },   // Blue - Single
  { label: '2 Runs', value: 2,   probability: 0.15, color: '#2ecc71' },   // Green - Double
  { label: '3 Runs', value: 3,   probability: 0.10, color: '#1abc9c' },   // Teal - Triple
  { label: '4 Runs', value: 4,   probability: 0.05, color: '#f39c12' },   // Orange - Boundary
  { label: '6 Runs', value: 6,   probability: 0.05, color: '#9b59b6' },   // Purple - Six!
];

/**
 * Validates that probabilities sum to exactly 1.0 (with floating point tolerance).
 * @param {Array} probabilities - Array of probability objects
 * @returns {boolean} - Whether probabilities are valid
 */
export const validateProbabilities = (probabilities) => {
  const total = probabilities.reduce((sum, p) => sum + p.probability, 0);
  return Math.abs(total - 1.0) < 0.001; // Allow tiny floating-point error
};