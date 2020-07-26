import React from "react";

import Board from "./Board";
import calculateWinner from "./calculateWinner";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      step: 0,
      xIsNext: true,
    };
  }

  getNextPlayer() {
    return this.state.xIsNext ? "X" : "O";
  }

  jumpTo(step) {
    this.setState({
      step,
      xIsNext: step % 2 === 0,
    });
  }

  handleSquareClick(i) {
    const history = this.state.history.slice(0, this.state.step + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.getNextPlayer();
    this.setState({
      history: history.concat([{ squares }]),
      xIsNext: !this.state.xIsNext,
      step: history.length,
    });
  }

  render() {
    const { history } = this.state;
    const current = history[this.state.step];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const label = move ? `Go to move #${move}` : "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{label}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner is: ${winner}`;
    } else {
      status = `Next player: ${this.getNextPlayer()}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleSquareClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
