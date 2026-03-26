/**
 * PowerBar Component
 * 
 * Renders the probability-based power bar with colored segments.
 * Each segment's width is proportional to its probability.
 * A slider continuously moves across the bar; its position at the
 * time of clicking "Play Shot" determines the outcome.
 * 
 * Props:
 *   - probabilities: Array of { label, value, probability, color }
 *   - sliderPosition: Current slider position (0 to 1)
 *   - isAnimating: Whether the game is currently animating
 */

import React from 'react';
import './PowerBar.css';

const PowerBar = ({ probabilities, sliderPosition, isAnimating }) => {
  /**
   * Compute cumulative positions for each segment.
   * Used to render segments and determine slider location.
   */
  let cumulative = 0;
  const segments = probabilities.map((p) => {
    const start = cumulative;
    cumulative += p.probability;
    return { ...p, start, end: cumulative };
  });

  return (
    <div className="power-bar-wrapper">
      <h3 className="power-bar-title">⚡ Power Bar</h3>

      {/* ===== Power Bar Container ===== */}
      <div className="power-bar-container">
        {/* Render each probability segment */}
        {segments.map((seg, index) => (
          <div
            key={index}
            className="power-bar-segment"
            style={{
              width: `${seg.probability * 100}%`,
              backgroundColor: seg.color,
            }}
            title={`${seg.label}: ${(seg.probability * 100).toFixed(0)}%`}
          >
            {/* Only show label if segment is wide enough */}
            {seg.probability >= 0.08 && (
              <span className="segment-label">
                {seg.value === 'W' ? 'W' : seg.value}
              </span>
            )}
          </div>
        ))}

        {/* ===== Moving Slider Indicator ===== */}
        <div
          className={`power-bar-slider ${isAnimating ? 'slider-paused' : ''}`}
          style={{ left: `${sliderPosition * 100}%` }}
        >
          <div className="slider-arrow">▼</div>
          <div className="slider-line" />
        </div>
      </div>

      {/* ===== Probability Legend ===== */}
      <div className="power-bar-legend">
        {probabilities.map((p, index) => (
          <div key={index} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: p.color }}
            />
            <span className="legend-text">
              {p.label} ({(p.probability * 100).toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PowerBar;