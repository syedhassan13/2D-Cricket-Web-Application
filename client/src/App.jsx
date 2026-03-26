import { useState } from 'react';
import './App.css';
import Scoreboard from './components/Scoreboard';
import Controls from './components/Controls';
import Pitch from './components/Pitch';
import PowerBar from './components/PowerBar';

function App() {

  const [score , setScore] = useState(0);
  const [wickets , setWickets] = useState(0);
  const [balls , setBalls] = useState(0);

  const [gameStatus , setGameStatus] = useState("IDLE");
  const [battingStyle, setBattingStyle] = useState("AGGRESSIVE");
   // Handle Bowl outcome
  const handleBowl = (outcome) => {
    if (outcome === "W") {
      setWickets(w => w + 1);
    } else {
      setScore(s => s + parseInt(outcome));
    }
    setBalls(b => b + 1);

    // Optional: Check if game finished (10 wickets)
    if (wickets + 1 >= 10) setGameStatus("FINISHED");
  };

  return (
    
  <div>
     <h1 style={{ textAlign: "center" }}>2D Cricket Game</h1>
     <Scoreboard score={score} wickets={wickets} balls={balls}/>
     <Pitch/>
     <PowerBar battingStyle={battingStyle}/>

     <Controls battingStyle={battingStyle}/>
    </div>
  );
}

export default App;
