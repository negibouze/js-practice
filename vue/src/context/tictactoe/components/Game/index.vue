<template>
  <div class="game">
    ゲーム
    <Board />
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
