<template>
  <v-layout v-if="messages">
    <v-flex xs3>
      <v-btn flat icon @click="matchesWanted = index">
        <v-icon v-if="matchesWanted[index]">link</v-icon>
        <v-icon v-else>link_off</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12 class="ml-1">
      <v-icon color="blue lighten-1" small>messages</v-icon>
    </v-flex>
  </v-layout>
  <div v-else>
    <v-btn flat icon @click="matchesWanted = index">
        <v-icon v-if="matchesWanted[index]">link</v-icon>
        <v-icon v-else>link_off</v-icon>
    </v-btn>
  </div>
 </template>

<script>
export default {
  props: {
    index: Number
  },
  data () {
    return {
      confirmed: []
    }
  },
  computed: {
    messages () {
      return this.$store.state.agreements.messages
    },
    matchesWanted: {
      get () {
        return this.$store.state.agreements.matchesWanted
      },
      set (value) {
        this.$store.commit('agreements/toggleMatchWanted', value)
      }
    }
  }
}
</script>
