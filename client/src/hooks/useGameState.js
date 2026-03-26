/**
 * Custom Hook: useGameState
 * 
 * Manages all game state using React hooks.
 * Handles runs, wickets, balls bowled, batting style, animations,
 * and game over conditions. Provides clean API for components.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  getInitialGameState,
  getProbabilities,
  determineOutcome,
  isGameOver,
  TOTAL_BALLS,
  TOTAL_WICKETS,
} from '../utils/gameLogic';
import { getCommentary } from '../data/commentary';

const useGameState = () => {
  // ===== Core Game State =====
  const [gameState, setGameState] = useState(getInitialGameState());

  // ===== Slider State =====
  // Slider position ranges from 0 to 1, continuously bouncing back and forth
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderDirection = useRef(1);     // 1 = moving right, -1 = moving left
  const animationFrameRef = useRef(null);
  const SLIDER_SPEED = 0.008;            // Speed of slider movement per frame

  // ===== Slider Animation Loop =====
  useEffect(() => {
    const animateSlider = () => {
      setSliderPosition((prev) => {
        let next = prev + SLIDER_SPEED * sliderDirection.current;

        // Bounce at edges
        if (next >= 1) {
          next = 1;
          sliderDirection.current = -1;
        } else if (next <= 0) {
          next = 0;
          sliderDirection.current = 1;
        }

        return next;
      });

      animationFrameRef.current = requestAnimationFrame(animateSlider);
    };

    // Only animate slider when game is active and not in animation
    if (!gameState.gameOver && !gameState.isAnimating) {
      animationFrameRef.current = requestAnimationFrame(animateSlider);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState.gameOver, gameState.isAnimating]);

  /**
   * Handles batting style change.
   * Updates the probability distribution shown on the power bar.
   */
  const setBattingStyle = useCallback((style) => {
    if (gameState.isAnimating || gameState.gameOver) return;
    setGameState((prev) => ({ ...prev, battingStyle: style }));
  }, [gameState.isAnimating, gameState.gameOver]);

  /**
   * Handles playing a shot.
   * 1. Captures the current slider position
   * 2. Triggers bowling animation
   * 3. Determines outcome from power bar segment
   * 4. Triggers batting animation
   * 5. Updates score, wickets, balls, commentary
   * 6. Checks for game over
   */
  const playShot = useCallback(() => {
    if (gameState.isAnimating || gameState.gameOver) return;

    // Capture slider position at the moment of click
    const capturedPosition = sliderPosition;
    const probabilities = getProbabilities(gameState.battingStyle);
    const outcome = determineOutcome(capturedPosition, probabilities);

    // ===== Phase 1: Start bowling animation =====
    setGameState((prev) => ({
      ...prev,
      isAnimating: true,
      ballAnimation: 'bowling',
      lastOutcome: null,
    }));

    // ===== Phase 2: After bowling, show batting animation =====
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        ballAnimation: 'batting',
      }));

      // ===== Phase 3: After batting, show result =====
      setTimeout(() => {
        const isWicket = outcome.value === 'W';
        const runsScored = isWicket ? 0 : outcome.value;
        const commentary = getCommentary(outcome.value);

        setGameState((prev) => {
          const newRuns = prev.runs + runsScored;
          const newWickets = prev.wickets + (isWicket ? 1 : 0);
          const newBallsBowled = prev.ballsBowled + 1;
          const newGameOver = isGameOver(newBallsBowled, newWickets);

          return {
            ...prev,
            runs: newRuns,
            wickets: newWickets,
            ballsBowled: newBallsBowled,
            gameOver: newGameOver,
            lastOutcome: outcome,
            commentary: commentary,
            isAnimating: false,
            ballAnimation: 'result',
          };
        });
      }, 600); // Batting animation duration
    }, 800); // Bowling animation duration
  }, [gameState.isAnimating, gameState.gameOver, gameState.battingStyle, sliderPosition]);

  /**
   * Resets the entire game to initial state.
   */
  const restartGame = useCallback(() => {
    setGameState(getInitialGameState());
    setSliderPosition(0);
    sliderDirection.current = 1;
  }, []);

  // ===== Return public API =====
  return {
    gameState,
    sliderPosition,
    probabilities: getProbabilities(gameState.battingStyle),
    setBattingStyle,
    playShot,
    restartGame,
    TOTAL_BALLS,
    TOTAL_WICKETS,
  };
};

export default useGameState;