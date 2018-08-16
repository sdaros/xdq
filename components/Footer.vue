<template>
  <v-footer class="secondary darken-1" app>
    <span class="white--text">&copy; {{ year }} {{ name }}</span>
  </v-footer>
</template>

<script>
export default {
  props: {
    name: String,
    year: String
  }
}
</script>
