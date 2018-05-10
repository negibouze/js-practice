<template>
  <div class="game">
    <div class="game-board">
      <Board
        :squares="squares"
        :onClick="handleClick"
      />
    </div>
    <div class="game-info">
      <div class="status">{{ status }}</div>
      <button>order</button>
      <ol>
        <li v-for="(v, i) in moves" :key="'move-' + v">
          <button @click="jumpTo(i)">{{ v }}</button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import Board from '../Board'
import './Game'

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
      return squares[a];
    }
  }
  return null;
}

export default {
  name: "Game",
  data: function() {
    return {
      history: [{
        squares: Array(9).fill(null),
        tap: {
          col: 0,
          row: 0
        }
      }],
      current: 0,
      xIsNext: true
    }
  },
  computed: {
    squares: function() {
      return this.history[this.current].squares
    },
    edgeLength: function() {
      return Math.sqrt(this.squares.length)
    },
    player: function() {
      return this.xIsNext ? 'X' : 'O'
    },
    status: function() {
      const winner = calculateWinner(this.squares)
      return winner ? `Winner: ${winner}` : `Next player: ${this.player}`
    },
    moves: function() {
      return this.history.map((step, move) => {
        return (move ? `Go to move #${move}` : 'Go to game start') + ` (col: ${step.tap.col}, row: ${step.tap.row})`;
      })
    }
  },
  methods: {
    handleClick: function(i) {
      const squares = this.squares.slice();
      if (calculateWinner(this.squares) || this.squares[i]) {
        return;
      }
      squares[i] = this.player
      const tap = ((i) => {
        const v = i === 0 ? [1, 1] : [(i % this.edgeLength) + 1, parseInt(i / this.edgeLength) + 1];
        return { col: v[0], row: v[1] }
      })(i);
      this.history = this.history.slice(0, (this.current + 1)).concat([{
        squares,
        tap
      }])
      this.current = this.history.length - 1      
      this.xIsNext = !this.xIsNext
    },
    jumpTo: function(i) {
      this.current = i
      this.xIsNext = (i % 2) === 0
    }
  },
  components: {
    Board
  }
}
</script>
