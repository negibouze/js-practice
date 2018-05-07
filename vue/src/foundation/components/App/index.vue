<template>
  <div id="app" class="App">
    <header class="App-header">
      <img src="./logo.png" alt="Logo" class="App-logo">
      <h1 class="App-title">Welcom to Vue</h1>
    </header>
    <Game />
  </div>
</template>

<script>
import Game from '../../../context/tictactoe/components/Game'
import './App'

export default {
  name: "App",
  components: {
    Game
  }
}
</script>
