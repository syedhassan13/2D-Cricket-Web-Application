/**
 * GameOverScreen Component
 * 
 * Displayed when the match ends (all overs bowled or all wickets lost).
 * Shows final score summary and a button to restart the game.
 */

import React from 'react';
import { formatOvers, TOTAL_WICKETS } from '../utils/gameLogic';
import './GameOverScreen.css';

const GameOverScreen = ({ runs, wickets, ballsBowled, restartGame }) => {
  // Determine how the game ended
  const allOut = wickets >= TOTAL_WICKETS;
  const endReason = allOut
    ? 'ALL OUT! 💀'
    : 'INNINGS COMPLETE! ✅';

  // Performance rating based on runs
  const getPerformance = () => {
    if (runs >= 50) return { text: '🌟 Outstanding!', class: 'perf-outstanding' };
    if (runs >= 35) return { text: '👏 Great Innings!', class: 'perf-great' };
    if (runs >= 20) return { text: '👍 Good Effort!', class: 'perf-good' };
    if (runs >= 10) return { text: '😐 Could be better', class: 'perf-okay' };
    return { text: '😞 Better luck next time!', class: 'perf-poor' };
  };

  const performance = getPerformance();

  return (
    <div className="game-over-overlay">
      <div className="game-over-card">
        <h1 className="game-over-title">🏏 GAME OVER</h1>
        <p className="end-reason">{endReason}</p>

        <div className="final-score">
          <div className="final-score-main">
            <span className="final-runs">{runs}</span>
            <span className="final-separator">/</span>
            <span className="final-wickets">{wickets}</span>
          </div>
          <p className="final-overs">({formatOvers(ballsBowled)} overs)</p>
        </div>

        <p className={`performance-text ${performance.class}`}>
          {performance.text}
        </p>

        <div className="game-over-stats">
          <div className="go-stat">
            <span className="go-stat-label">Runs Scored</span>
            <span className="go-stat-value">{runs}</span>
          </div>
          <div className="go-stat">
            <span className="go-stat-label">Wickets Lost</span>
            <span className="go-stat-value">{wickets}</span>
          </div>
          <div className="go-stat">
            <span className="go-stat-label">Balls Faced</span>
            <span className="go-stat-value">{ballsBowled}</span>
          </div>
          <div className="go-stat">
            <span className="go-stat-label">Run Rate</span>
            <span className="go-stat-value">
              {ballsBowled > 0
                ? ((runs / ballsBowled) * 6).toFixed(2)
                : '0.00'}
            </span>
          </div>
        </div>

        <button className="play-again-btn" onClick={restartGame}>
          🔄 Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;