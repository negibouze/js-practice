<template>
  <div class="board">
    ボード
    <Square />
  </div>
</template>

<script>
import Square from '../Square'
import './Board'

export default {
  name: "Board",
  components: {
    Square 
  }
}
</script>
