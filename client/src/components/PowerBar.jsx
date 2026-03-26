import { GAME_CONFIG } from "../constants/gameConfig";
import useAnimation from "../hooks/useAnimation";
import { getOutcomeFromSlider } from "../utils/physics";
import { useState } from "react";

function PowerBar({ battingStyle, onHit }) {
  const { sliderRef, start, stop } = useAnimation(1);
  const outcomes = GAME_CONFIG[battingStyle].outcomes;

  const [bowlPressed, setBowlPressed] = useState(false);

  return (
    <div style={{ width: "600px", margin: "20px auto", position: "relative" }}>
      {/* Probability segments */}
      <div style={{ display: "flex", height: "40px" }}>
        {Object.entries(outcomes).map(([run, prob]) => (
          <div
            key={run}
            style={{
              width: `${prob * 100}%`,
              background:
                run === "W"
                  ? "red"
                  : run === "6"
                  ? "gold"
                  : run === "4"
                  ? "blue"
                  : "gray",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
            }}
          >
            {run}
          </div>
        ))}
      </div>

      {/* Slider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${sliderRef.current}%`,
          width: "2px",
          height: "40px",
          background: "white",
        }}
      />

      {/* Buttons */}
      <div style={{ marginTop: "10px" }}>
        {!bowlPressed ? (
          <button
            onClick={() => {
              start();
              setBowlPressed(true);
            }}
          >
            BOWL
          </button>
        ) : (
          <button
            onClick={() => {
              stop();
              setBowlPressed(false);
              const outcome = getOutcomeFromSlider(
                sliderRef.current,
                battingStyle,
                GAME_CONFIG
              );
              onHit(outcome); // Update App state
            }}
          >
            HIT
          </button>
        )}
      </div>
    </div>
  );
}

export default PowerBar;