<template>
  <div class="game">
    <div class="game-board">
      <Board />
    </div>
    <div class="game-info">
      <div class="status">{status}</div>
      <button>order</button>
      <ol></ol>
    </div>
  </div>
</template>

<script>
import Board from '../Board'
import './Game'

export default {
  name: "Game",
  components: {
    Board
  }
}
</script>
