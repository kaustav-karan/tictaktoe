import { useEffect, useState } from 'react';
import './App.css';
import Square from './Component/Square';
import { Patterns } from './Patterns';

function App() {
  const [mat, setMat] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  useEffect(() => {
    checkWin();
    checkIfTie();

    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
    // eslint-disable-next-line
  }, [mat]);

  useEffect(() => {
    if (result.state !== "none") {
      alert(`Player ${result.winner} has won!`);
      resetGame();
    }
  }, [result]);

  const chooseSquare = (square) => {
    setMat(
      mat.map((val, idx) => {
        if (idx === square && val === "") {
          return player;
        }
        return val;
      })
    );
  };

  const checkWin = () => {
    Patterns.forEach((currentPattern) => {
      const firstPlayer = mat[currentPattern[0]];

      if (firstPlayer === "") return;

      let foundWinninPattern = true;
      currentPattern.forEach((idx) => {
        if (mat[idx] !== firstPlayer) {
          foundWinninPattern = false;
        }
      });
      if (foundWinninPattern) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    mat.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    })
    if (filled) {
      setResult({ winner: "No one", state: "Tie" });

    }
  }

  const resetGame = () => {
    setMat(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
    setResult({ winner: "none", state: "none" });
  }

  return (
    <div className="App">
      <div className="mat">
        <div className="row">
          <Square val={mat[0]} chooseSquare={() => { chooseSquare(0); }} />
          <Square val={mat[1]} chooseSquare={() => { chooseSquare(1); }} />
          <Square val={mat[2]} chooseSquare={() => { chooseSquare(2); }} />
        </div>
        <div className="row">
          <Square val={mat[3]} chooseSquare={() => { chooseSquare(3); }} />
          <Square val={mat[4]} chooseSquare={() => { chooseSquare(4); }} />
          <Square val={mat[5]} chooseSquare={() => { chooseSquare(5); }} />
        </div>
        <div className="row">
          <Square val={mat[6]} chooseSquare={() => { chooseSquare(6); }} />
          <Square val={mat[7]} chooseSquare={() => { chooseSquare(7); }} />
          <Square val={mat[8]} chooseSquare={() => { chooseSquare(8); }} />
        </div>
      </div>
    </div>
  );
}

export default App;
