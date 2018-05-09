<template>
  <button class="square" :class="{ highlight }" @click="$emit('onClick')">
    {{ value }}
  </button>
</template>

<script>
import './Square'

export default {
  name: "Square",
  props: {
    value: String,
    highlight: {
      type: Boolean,
      default: false
    }
  }
}
</script>
