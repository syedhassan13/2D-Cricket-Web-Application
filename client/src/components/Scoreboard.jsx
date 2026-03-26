function Scoreboard({ score, wickets, balls }) {
  return (
    <div style={{ background: "#222", color: "white", padding: "10px" }}>
      <h2>Score: {score}</h2>
      <h3>Wickets: {wickets}</h3>
      <h3>Balls: {balls}</h3>
    </div>
  );
}

export default Scoreboard;