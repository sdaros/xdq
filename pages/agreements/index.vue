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
          Agreements
        </h1>
      </v-flex>
      <v-flex xs3>
        <v-btn block outline color="grey">
          <v-icon class="pr-1 pb-1">add</v-icon>
          Create new agreement
        </v-btn>
      </v-flex>
      <v-flex xs12>
      <v-divider class="mt-3 mb-4"></v-divider>
      </v-flex>
    </v-layout>
    <agreement
      v-for="agreement in agreements"
      :key="agreement.id"
      :id="agreement.id"
      :dataConsumerId="agreement.dataQualityProject.dataConsumer.id"
    >
    </agreement>
  </v-flex>
    </v-layout>
</template>

<script>
import Agreement from '~/components/agreements/Agreement'

export default {
  async fetch ({ store }) {
    await store.dispatch('agreements/init')
  },
  computed: {
    agreements () {
      return this.$store.state.agreements.all
    }
  },
  components: {
    Agreement
  }
}
</script>
