

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