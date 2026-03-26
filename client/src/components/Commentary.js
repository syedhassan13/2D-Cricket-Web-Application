/**
 * Commentary Component
 * 
 * Displays dynamic commentary messages after each ball.
 * Messages are context-based (selected from multiple options per outcome).
 * Features smooth fade-in animation on each new message.
 */

import React, { useState, useEffect } from 'react';
import './Commentary.css';

const Commentary = ({ message }) => {
  const [fadeKey, setFadeKey] = useState(0);

  // Trigger fade-in animation whenever the message changes
  useEffect(() => {
    setFadeKey((prev) => prev + 1);
  }, [message]);

  return (
    <div className="commentary-container">
      <div className="commentary-header">📢 Commentary</div>
      <div className="commentary-message" key={fadeKey}>
        {message}
      </div>
    </div>
  );
};

export default Commentary;