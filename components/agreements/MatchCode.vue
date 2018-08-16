<template>
  <v-list-tile-avatar tile :color="confidenceColor">
    <span class="white--text headline">
      {{ confidenceNumber }}
    </span>
  </v-list-tile-avatar>
</template>

<script>
export default {
  props: {
    confidenceNumber: Number
  },
  computed: {
    confidenceColor () {
      if (this.confidenceNumber < 50) {
        return 'orange darken-1'
      }
      if (this.confidenceNumber >= 50 && this.confidenceNumber < 75) {
        return 'lime darken-1'
      }
      if (this.confidenceNumber > 75) {
        return 'green'
      }
    }
  }
}
</script>
