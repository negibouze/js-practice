import React, { Component } from 'react';
import Square from '../Square';
import './Board';

class Board extends Component {
  renderSquare(i) {
    const key = `square-${i}`;
    return (
      <Square
        key={key}
        value={this.props.squares[i]}
        highlight={this.props.winningLine.includes(i)}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderRowSquares(edgeLength, rowNum) {
    const add = edgeLength * rowNum;
    const row = [];
    for (let i = 0; i < edgeLength; i++) {
      row.push(this.renderSquare(i + add))
    }
    return row;
  }

  render() {
    const edgeLength = Math.sqrt(this.props.squares.length);
    let rows = [];
    for (let i = 0; i < edgeLength; i++) {
      const key = `row-${i}`;
      rows.push(<div className="board-row" key={key}>{this.renderRowSquares(edgeLength, i)}</div>);
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default Board;
