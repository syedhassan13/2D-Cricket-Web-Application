// physics.js

export function getOutcomeFromSlider(sliderPosition, battingStyle, GAME_CONFIG) {
  const outcomes = GAME_CONFIG[battingStyle].outcomes;

  // Convert outcomes object to array with start/end ranges
  let start = 0;
  const ranges = Object.entries(outcomes).map(([run, prob]) => {
    const end = start + prob * 100; // Convert probability to percentage
    const segment = { run, start, end };
    start = end;
    return segment;
  });

  // Find which segment sliderPosition falls into
  const selected = ranges.find(seg => sliderPosition <= seg.end && sliderPosition >= seg.start);
  return selected ? selected.run : 0;
}