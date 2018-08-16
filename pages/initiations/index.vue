<template>
<v-layout
  row
  justify-center
  align-center
  >
  <v-flex xs12 md12 lg10 xl8>
    <v-layout row wrap align-center>
      <v-flex xs9>
       <h1 class="display-1 font-weight-light pt-4 pb-4 page-title">
        Initiations
      </h1>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs3>
        <v-btn block outline color="grey">
          <v-icon class="pr-1 pb-1">add</v-icon>
          Create new initiation
        </v-btn>
      </v-flex>
      <v-flex xs12>
      <v-divider class="mt-3 mb-4"></v-divider>
      </v-flex>
    </v-layout>
    <initiation
      v-for="initiation in initiations"
      :key="initiation.id"
      v-bind="initiation"
    >
    </initiation>
  </v-flex>
    </v-layout>
</template>

<script>
import Initiation from '~/components/initiations/Initiation'

export default {
  async fetch ({ store }) {
    await store.dispatch('initiations/init')
  },
  computed: {
    initiations () {
      return this.$store.state.initiations.all
    }
  },
  components: {
    Initiation
  }
}
</script>

<style scoped>
 .edit {
   margin-left: -10px;
 }
.page-title {
  color: #777777
}
</style>
