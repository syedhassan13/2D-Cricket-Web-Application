/**
 * CricketGround Component
 * 
 * Renders the 2D cricket field using HTML5 Canvas.
 * Includes: outfield, pitch, crease lines, stumps, batsman, and ball.
 * Handles bowling and batting animations on the canvas.
 */

import React, { useRef, useEffect, useCallback } from 'react';
import './CricketGround.css';

const CricketGround = ({ ballAnimation, lastOutcome }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const ballYRef = useRef(100);      // Ball Y position for bowling animation
  const batAngleRef = useRef(0);     // Bat swing angle for batting animation
  const frameCountRef = useRef(0);

  /**
   * Draws the complete cricket ground scene on the canvas.
   * Called every animation frame for smooth rendering.
   */
  const draw = useCallback((ctx, width, height) => {
    // ===== Clear canvas =====
    ctx.clearRect(0, 0, width, height);

    // ===== Draw outfield (green oval) =====
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(width / 2, height / 2, width * 0.45, height * 0.45, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#2d8a4e';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // ===== Draw inner circle =====
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(width / 2, height / 2, width * 0.22, height * 0.22, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.stroke();
    ctx.restore();

    // ===== Draw pitch (brown rectangle in center) =====
    const pitchWidth = 40;
    const pitchHeight = height * 0.55;
    const pitchX = width / 2 - pitchWidth / 2;
    const pitchY = height / 2 - pitchHeight / 2;

    ctx.fillStyle = '#c4a265';
    ctx.fillRect(pitchX, pitchY, pitchWidth, pitchHeight);
    ctx.strokeStyle = '#8b7355';
    ctx.lineWidth = 1;
    ctx.strokeRect(pitchX, pitchY, pitchWidth, pitchHeight);

    // ===== Draw crease lines =====
    // Batting crease (bottom)
    const batsmanCreaseY = pitchY + pitchHeight - 40;
    ctx.beginPath();
    ctx.moveTo(pitchX - 15, batsmanCreaseY);
    ctx.lineTo(pitchX + pitchWidth + 15, batsmanCreaseY);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Bowling crease (top)
    const bowlerCreaseY = pitchY + 40;
    ctx.beginPath();
    ctx.moveTo(pitchX - 15, bowlerCreaseY);
    ctx.lineTo(pitchX + pitchWidth + 15, bowlerCreaseY);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // ===== Draw stumps (batsman end - bottom) =====
    const stumpX = width / 2;
    const stumpY = batsmanCreaseY + 5;
    drawStumps(ctx, stumpX, stumpY);

    // ===== Draw stumps (bowler end - top) =====
    drawStumps(ctx, stumpX, bowlerCreaseY - 5);

    // ===== Draw batsman =====
    drawBatsman(ctx, stumpX + 25, batsmanCreaseY - 10, batAngleRef.current);

    // ===== Draw ball =====
    const ballX = width / 2;
    drawBall(ctx, ballX, ballYRef.current);

    // ===== Draw outcome text =====
    if (ballAnimation === 'result' && lastOutcome) {
      drawOutcomeText(ctx, width, height, lastOutcome);
    }
  }, [ballAnimation, lastOutcome]);

  /**
   * Draws three stumps at the given position.
   */
  const drawStumps = (ctx, x, y) => {
    ctx.fillStyle = '#deb887';
    for (let i = -6; i <= 6; i += 6) {
      ctx.fillRect(x + i - 1.5, y - 15, 3, 30);
    }
    // Bails
    ctx.fillStyle = '#f5deb3';
    ctx.fillRect(x - 8, y - 16, 7, 2);
    ctx.fillRect(x + 1, y - 16, 7, 2);
  };

  /**
   * Draws the batsman figure with bat.
   * @param {number} batAngle - Current bat swing angle in radians
   */
  const drawBatsman = (ctx, x, y, batAngle) => {
    ctx.save();
    ctx.translate(x, y);

    // Body
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(0, -25, 8, 12, 0, 0, Math.PI * 2); // Torso
    ctx.fill();

    // Head with helmet
    ctx.fillStyle = '#1a5276';
    ctx.beginPath();
    ctx.arc(0, -42, 8, 0, Math.PI * 2);
    ctx.fill();

    // Helmet grill
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-5, -40);
    ctx.lineTo(-5, -36);
    ctx.moveTo(-2, -40);
    ctx.lineTo(-2, -36);
    ctx.moveTo(1, -40);
    ctx.lineTo(1, -36);
    ctx.stroke();

    // Legs
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-3, -14);
    ctx.lineTo(-6, 5);
    ctx.moveTo(3, -14);
    ctx.lineTo(6, 5);
    ctx.stroke();

    // Pads
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(-8, -5, 5, 12);
    ctx.fillRect(3, -5, 5, 12);

    // Bat (with swing animation)
    ctx.save();
    ctx.translate(8, -22);
    ctx.rotate(batAngle - 0.5); // Base angle + swing
    ctx.fillStyle = '#deb887';
    ctx.fillRect(0, 0, 4, 35);      // Bat handle
    ctx.fillStyle = '#f5deb3';
    ctx.fillRect(-3, 30, 10, 18);    // Bat blade
    ctx.restore();

    ctx.restore();
  };

  /**
   * Draws the cricket ball at the given position.
   */
  const drawBall = (ctx, x, y) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    // Red cricket ball with shine
    const gradient = ctx.createRadialGradient(x - 2, y - 2, 1, x, y, 6);
    gradient.addColorStop(0, '#ff4444');
    gradient.addColorStop(1, '#cc0000');
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = '#990000';
    ctx.lineWidth = 1;
    ctx.stroke();
    // Seam line
    ctx.beginPath();
    ctx.arc(x, y, 4, 0.2, Math.PI - 0.2);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.restore();
  };

  /**
   * Draws the outcome text (e.g., "FOUR!", "WICKET!") on the canvas.
   */
  const drawOutcomeText = (ctx, width, height, outcome) => {
    const text = outcome.value === 'W' ? 'WICKET!' :
                 outcome.value === 0 ? 'DOT BALL' :
                 outcome.value === 4 ? 'FOUR!' :
                 outcome.value === 6 ? 'SIX!' :
                 `${outcome.value} RUN${outcome.value > 1 ? 'S' : ''}`;

    ctx.save();
    ctx.font = 'bold 36px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Glow effect
    ctx.shadowColor = outcome.color;
    ctx.shadowBlur = 20;
    ctx.fillStyle = outcome.color;
    ctx.fillText(text, width / 2, height * 0.18);

    // White outline
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeText(text, width / 2, height * 0.18);
    ctx.restore();
  };

  // ===== Animation Loop =====
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const pitchHeight = canvas.height * 0.55;
    const pitchTopY = canvas.height / 2 - pitchHeight / 2;
    const bowlerY = pitchTopY + 40;
    const batsmanY = pitchTopY + pitchHeight - 50;

    const animate = () => {
      frameCountRef.current++;

      // ===== Bowling Animation: Ball travels from bowler to batsman =====
      if (ballAnimation === 'bowling') {
        ballYRef.current += 4; // Ball moves down
        if (ballYRef.current >= batsmanY) {
          ballYRef.current = batsmanY;
        }
      }

      // ===== Batting Animation: Bat swings =====
      if (ballAnimation === 'batting') {
        batAngleRef.current = Math.min(batAngleRef.current + 0.15, 1.2);
      }

      // ===== Reset for idle/new ball =====
      if (ballAnimation === 'idle' || ballAnimation === 'result') {
        // Gradually reset ball to bowler end
        ballYRef.current = bowlerY - 20;
        batAngleRef.current = 0;
      }

      draw(ctx, canvas.width, canvas.height);
      animationRef.current = requestAnimationFrame(animate);
    };

    // Reset positions when bowling starts
    if (ballAnimation === 'bowling') {
      ballYRef.current = bowlerY - 20;
      batAngleRef.current = 0;
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [ballAnimation, draw]);

  return (
    <div className="cricket-ground-container">
      <canvas
        ref={canvasRef}
        width={400}
        height={450}
        className="cricket-canvas"
      />
    </div>
  );
};

export default CricketGround;