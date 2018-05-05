import React, { Component } from 'react';
import Board from '../Board';
import './Game';

function hasNullElements(array) {
  return array.includes(null);
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        name: squares[a],
        line: lines[i]
      }
    }
  }
  return null;
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        tap: {
          col: 0,
          row: 0
        }
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const tap = ((i) => {
      const v = i === 0 ? [1, 1] : [(i % 3) + 1, parseInt(i / 3) + 1];
      return { col: v[0], row: v[1] }
    })(i);
    this.setState({
      history: history.concat([{
        squares,
        tap
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      orderIsAsc: true
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  toggleOrder() {
    this.setState({
      orderIsAsc: !this.state.orderIsAsc
    })
  }

  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const current = history[stepNumber];
    const squares = current.squares;
    const winner = calculateWinner(squares);
    const moves = history.map((step, move) => {
      const text = (move ? `Go to move #${move}` : 'Go to game start') + ` (col: ${step.tap.col}, row: ${step.tap.row})`;
      const desc = stepNumber === move ? <b>{text}</b> : text;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    const status = ((winner) => {
      if (winner) { return `Winner: ${winner.name}` };
      return hasNullElements(squares) ? `Next player: ${this.state.xIsNext ? 'X' : 'O'}` : 'The game is a draw.';
    })(winner);
    const order = this.state.orderIsAsc ? '▲' : '▼';
    const sortedList = this.state.orderIsAsc ? moves : moves.reverse();

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningLine={winner ? winner.line : []}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <button onClick={() => this.toggleOrder()}>order {order}</button>
          <ol>{sortedList}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
