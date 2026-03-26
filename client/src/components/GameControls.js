/**
 * GameControls Component
 * 
 * Provides buttons for:
 *   - Selecting batting style (Aggressive / Defensive)
 *   - Playing a shot (triggers the power bar outcome)
 *   - Restarting the game
 * 
 * Buttons are disabled during animations to prevent double-clicks.
 */

import React from 'react';
import './GameControls.css';

const GameControls = ({
  battingStyle,
  setBattingStyle,
  playShot,
  restartGame,
  isAnimating,
  gameOver,
}) => {
  return (
    <div className="game-controls">
      {/* ===== Batting Style Selection ===== */}
      <div className="style-selection">
        <h3 className="controls-title">🏏 Batting Style</h3>
        <div className="style-buttons">
          <button
            className={`style-btn aggressive-btn ${
              battingStyle === 'aggressive' ? 'active' : ''
            }`}
            onClick={() => setBattingStyle('aggressive')}
            disabled={isAnimating || gameOver}
          >
            🔥 Aggressive
            <span className="style-desc">High Risk / High Reward</span>
          </button>
          <button
            className={`style-btn defensive-btn ${
              battingStyle === 'defensive' ? 'active' : ''
            }`}
            onClick={() => setBattingStyle('defensive')}
            disabled={isAnimating || gameOver}
          >
            🛡️ Defensive
            <span className="style-desc">Low Risk / Low Reward</span>
          </button>
        </div>
      </div>

      {/* ===== Action Buttons ===== */}
      <div className="action-buttons">
        <button
          className="play-shot-btn"
          onClick={playShot}
          disabled={isAnimating || gameOver}
        >
          {isAnimating ? '⏳ Ball in play...' : '🏏 Play Shot!'}
        </button>

        <button className="restart-btn" onClick={restartGame}>
          🔄 Restart Game
        </button>
      </div>
    </div>
  );
};

export default GameControls;