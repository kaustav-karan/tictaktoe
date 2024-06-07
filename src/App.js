import { useEffect, useState } from 'react';
import './App.css';
import Square from './Component/Square';
import { Patterns } from './Patterns';

function App() {
  const [board, setBoard] = useState(
    JSON.parse(localStorage.getItem('board')) || ["", "", "", "", "", "", "", "", ""]
  );
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
  }, [board]);

  useEffect(() => {
    if (result.state !== "none") {
      alert(`Player ${result.winner} has won!`);
      resetGame();
    }
  }, [result]);

  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(board));
  }, [board]);

  const chooseSquare = (square) => {
    setBoard(
      board.map((val, idx) => {
        if (idx === square && val === "") {
          return player;
        }
        return val;
      })
    );
  };

  const checkWin = () => {
    Patterns.forEach((currentPattern) => {
      const firstPlayer = board[currentPattern[0]];

      if (firstPlayer === "") return;

      let foundWinninPattern = true;
      currentPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
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
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    })
    if (filled) {
      setResult({ winner: "No one", state: "Tie" });
    }
  }

  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
    setResult({ winner: "none", state: "none" });
    localStorage.removeItem('board');
  }

  return (
    <div className="App">
      <div className="board">
        <div className="row">
          <Square val={board[0]} chooseSquare={() => { chooseSquare(0); }} />
          <Square val={board[1]} chooseSquare={() => { chooseSquare(1); }} />
          <Square val={board[2]} chooseSquare={() => { chooseSquare(2); }} />
        </div>
        <div className="row">
          <Square val={board[3]} chooseSquare={() => { chooseSquare(3); }} />
          <Square val={board[4]} chooseSquare={() => { chooseSquare(4); }} />
          <Square val={board[5]} chooseSquare={() => { chooseSquare(5); }} />
        </div>
        <div className="row">
          <Square val={board[6]} chooseSquare={() => { chooseSquare(6); }} />
          <Square val={board[7]} chooseSquare={() => { chooseSquare(7); }} />
          <Square val={board[8]} chooseSquare={() => { chooseSquare(8); }} />
        </div>
      </div>
    </div>
  );
}

export default App;
