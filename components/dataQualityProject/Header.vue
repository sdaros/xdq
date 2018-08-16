<template>
  <v-layout>
    <v-flex>
      <v-toolbar class="mb-3" color="grey" flat dark>
        <v-toolbar-title>{{ name }}</v-toolbar-title>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    name: {
      required: true,
      type: String
    }
  }
}
</script>
