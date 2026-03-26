/**
 * Scoreboard Component
 * 
 * Displays the current match state:
 *   - Total Runs
 *   - Wickets Fallen
 *   - Overs (formatted as X.Y)
 * 
 * Updates dynamically after each ball.
 */

import React from 'react';
import { formatOvers, TOTAL_OVERS, TOTAL_WICKETS } from '../utils/gameLogic';
import './Scoreboard.css';

const Scoreboard = ({ runs, wickets, ballsBowled }) => {
  return (
    <div className="scoreboard">
      <h2 className="scoreboard-title">🏏 SCOREBOARD</h2>

      <div className="scoreboard-stats">
        {/* ===== Runs ===== */}
        <div className="stat-box runs-box">
          <span className="stat-label">Runs</span>
          <span className="stat-value runs-value">{runs}</span>
        </div>

        {/* ===== Wickets ===== */}
        <div className="stat-box wickets-box">
          <span className="stat-label">Wickets</span>
          <span className="stat-value wickets-value">
            {wickets}/{TOTAL_WICKETS}
          </span>
        </div>

        {/* ===== Overs ===== */}
        <div className="stat-box overs-box">
          <span className="stat-label">Overs</span>
          <span className="stat-value overs-value">
            {formatOvers(ballsBowled)}/{TOTAL_OVERS}.0
          </span>
        </div>
      </div>

      {/* ===== Score Summary Line ===== */}
      <div className="score-summary">
        {runs}/{wickets} ({formatOvers(ballsBowled)} ov)
      </div>
    </div>
  );
};

export default Scoreboard;