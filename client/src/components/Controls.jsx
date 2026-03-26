function Controls({ battingStyle }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <button>Defensive</button>
      <button>Aggressive</button>

      <br /><br />

      <button style={{ fontSize: "20px", padding: "10px 20px" }}>
        BOWL
      </button>

      <p>Current Style: {battingStyle}</p>
    </div>
  );
}

export default Controls;