<template>
  <div>
    <div class="status">{{ status }}</div>
    <div class="board">
      <div class="board-row" v-for="(v, i) in edgeLength">
        <Square v-for="(v, j) in edgeLength"
          :key="'square-' + ((edgeLength * i) + j)"
          :value="squares[((edgeLength * i) + j)]"
          :highlight="false"
          @onClick="() => onClick(((edgeLength * i) + j))"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Square from '../Square'
import './Board'

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
  name: "Board",
  data: function() {
    return {
      squares: Array(9).fill(null),
      xIsNext: true,
      player: 'X'
    }
  },
  computed: {
    status: function() {
      const winner = calculateWinner(this.squares)
      return winner ? `Winner: ${winner}` : `Next player: ${this.player}`
    },
    edgeLength: function() {
      return Math.sqrt(this.squares.length)
    }
  },
  methods: {
    onClick: function(i) {
      this.squares[i] = this.player
      this.xIsNext = !this.xIsNext
      this.player = this.xIsNext ? 'X' : 'O'
    }
  },
  components: {
    Square 
  }
}
</script>
