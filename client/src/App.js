/**
 * App.js - Main Application Component
 * 
 * 2D Cricket Web Application
 * 
 * This is the root component that orchestrates all game elements:
 *   - CricketGround (Canvas-rendered field with animations)
 *   - Scoreboard (runs, wickets, overs)
 *   - PowerBar (probability-based outcome bar with slider)
 *   - GameControls (batting style + play shot buttons)
 *   - Commentary (dynamic messages per outcome)
 *   - GameOverScreen (final score overlay)
 * 
 * Game Logic:
 *   - 2 overs (12 balls), 2 wickets max
 *   - Batting style (Aggressive/Defensive) changes probability distribution
 *   - Slider continuously moves across the power bar
 *   - Clicking "Play Shot" captures slider position → determines outcome
 *   - Outcome is DETERMINISTIC based on slider position (no randomness)
 * 
 * Author: Student - CS-4032 Web Programming Assignment #02
 */

import React from 'react';
import './App.css';

// Components
import CricketGround from './components/CricketGround';
import Scoreboard from './components/Scoreboard';
import PowerBar from './components/PowerBar';
import GameControls from './components/GameControls';
import Commentary from './components/Commentary';
import GameOverScreen from './components/GameOverScreen';

// Custom Hook
import useGameState from './hooks/useGameState';

function App() {
  // ===== Initialize all game state and handlers via custom hook =====
  const {
    gameState,
    sliderPosition,
    probabilities,
    setBattingStyle,
    playShot,
    restartGame,
  } = useGameState();

  const {
    runs,
    wickets,
    ballsBowled,
    battingStyle,
    gameOver,
    lastOutcome,
    commentary,
    isAnimating,
    ballAnimation,
  } = gameState;

  return (
    <div className="app">
      {/* ===== Header ===== */}
      <header className="app-header">
        <h1 className="app-title">🏏 2D Cricket Game</h1>
        <p className="app-subtitle">Probability-Based Power Bar Batting</p>
      </header>

      {/* ===== Main Game Layout ===== */}
      <main className="game-layout">
        {/* Left Column: Cricket Ground + Commentary */}
        <div className="left-column">
          <CricketGround
            ballAnimation={ballAnimation}
            lastOutcome={lastOutcome}
          />
          <Commentary message={commentary} />
        </div>

        {/* Right Column: Scoreboard + Power Bar + Controls */}
        <div className="right-column">
          <Scoreboard
            runs={runs}
            wickets={wickets}
            ballsBowled={ballsBowled}
          />

          <PowerBar
            probabilities={probabilities}
            sliderPosition={sliderPosition}
            isAnimating={isAnimating}
          />

          <GameControls
            battingStyle={battingStyle}
            setBattingStyle={setBattingStyle}
            playShot={playShot}
            restartGame={restartGame}
            isAnimating={isAnimating}
            gameOver={gameOver}
          />
        </div>
      </main>

      {/* ===== Game Over Overlay ===== */}
      {gameOver && (
        <GameOverScreen
          runs={runs}
          wickets={wickets}
          ballsBowled={ballsBowled}
          restartGame={restartGame}
        />
      )}

      {/* ===== Footer ===== */}
      <footer className="app-footer">
        <p>CS-4032: Web Programming — Assignment #02</p>
      </footer>
    </div>
  );
}

export default App;