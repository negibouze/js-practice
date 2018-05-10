<template>
  <button class="square" :class="{ highlight }" @click="onClick">
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
    },
    onClick: {
      type: Function,
      required: true
    }
  }
}
</script>
