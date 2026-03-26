
const COMMENTARY = {
  W: [
    "💥 BOWLED HIM! The stumps are shattered! That's a huge wicket!",
    "🙈 Caught behind! The batsman has to walk back to the pavilion!",
    "😱 What a delivery! The batsman is out! The crowd goes wild!",
    "🎯 Clean bowled! Middle stump cartwheeling! Brilliant bowling!",
    "👋 Edged and caught! The fielder takes a screamer! OUT!",
  ],
  0: [
    "🛡️ Dot ball! Good defensive play, but no run scored.",
    "⛔ Beaten outside off! The batsman plays and misses.",
    "🔒 Solid defense but no run. The pressure is building!",
    "😤 Left alone outside off stump. Good judgement by the batsman.",
  ],
  1: [
    "🏃 Quick single! Good running between the wickets!",
    "👟 Pushed into the gap for a single. Smart cricket!",
    "✅ Tapped to mid-on and they steal a quick single!",
    "🏃‍♂️ Nudged off the pads for one. Rotating the strike nicely!",
  ],
  2: [
    "🏃🏃 Excellent running! Two runs added to the total!",
    "💨 Driven through the gap! They come back for the second!",
    "🔥 Placed into the outfield — two runs. Well played!",
    "👏 Great placement! Two runs to the deep. Superb batting!",
  ],
  3: [
    "🏃🏃🏃 Three runs! Outstanding running between the wickets!",
    "💪 Driven to the deep! They run three! Incredible effort!",
    "⚡ Placed into the gap — three runs! What hustle!",
  ],
  4: [
    "🔥 FOUR! Crashing through the covers! Beautiful shot!",
    "💥 BOUNDARY! Smashed through mid-wicket! That's racing away!",
    "🎆 FOUR RUNS! Driven elegantly past the fielder to the rope!",
    "🏏 What a shot! Through extra cover for FOUR! Class!",
    "💫 Punched off the back foot! FOUR! Timing at its finest!",
  ],
  6: [
    "🚀 SIX! That's gone into the stands! MASSIVE hit!",
    "💣 MAXIMUM! Over long-on for a gigantic SIX!",
    "🎇 IT'S A SIX! Into the crowd! The batsman is on fire!",
    "☄️ HUGE SIX! That ball has left the stadium! Incredible power!",
    "🌟 SIX! Launched over mid-wicket! That's out of the park!",
  ],
};

/**
 * Returns a random commentary message for the given outcome.
 * @param {string|number} outcome - The outcome ('W', 0, 1, 2, 3, 4, 6)
 * @returns {string} - A randomly selected commentary message
 */
export const getCommentary = (outcome) => {
  const key = String(outcome);
  const messages = COMMENTARY[key] || ["Good ball!"];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export default COMMENTARY;