<template>
  <v-container v-if="loggedInUserDataRole === 'dataSupplier'" class="pa-0">
    <v-layout>
      <v-flex>
        <matchings />
      </v-flex>
    </v-layout>
    <v-layout row justify-end class="mt-3">
      <v-flex xs5 class="pl-4">
       <v-btn
        :loading="loading"
        outline
        @click="updateMatchings(2)"
      >
        request reviewal
        <v-icon right>chevron_right</v-icon>
      </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container v-else class="pa-0">
    <v-layout>
      <v-flex>
        <p>Waiting for Data Supplier's proposal</p>
      </v-flex>
    </v-layout> </v-container>
</template>

<script>
import Matchings from '~/components/agreements/Matchings'
export default {
  props: {
    id: String
  },
  data () {
    return {
      current: 0,
      loading: false
    }
  },
  computed: {
    loggedInUserDataRole () {
      return this.$store.state.loggedInUserDataRole
    },
    agreement () {
      return this.$store.state.agreements[this.id]
    },
    dataSupplierProgress: {
      get () {
        return this.$store.state.agreements.progress.dataSupplier
      },
      set (value) {
        console.log('this agreement: ' + this.agreement)
        this.$store.dispatch(
          'agreements/updateDataSupplierProgress',
          {
            agreementProgressId: this.agreement.progress.id,
            progress: value
          }
        )
      }
    },
    dataConsumerProgress: {
      get () {
        return this.$store.state.agreements.progress.dataConsumer
      },
      set (value) {
        this.$store.dispatch(
          'agreements/updateDataConsumerProgress',
          {
            agreementProgressId: this.agreement.progress.id,
            progress: value
          }
        )
      }
    }
  },
  methods: {
    async updateMatchings (nextStep) {
      this.loading = true
      await this.$store.dispatch(
        'agreements/updateMatchings',
        {
          id: this.id,
          dataConsumerAttributes: this.$store.state.agreements.dataConsumerAttributes,
          dataSupplierAttributes: this.$store.state.agreements.dataSupplierAttributes,
          matchCodes: this.$store.state.agreements.matchCodes,
          matchesWanted: this.$store.state.agreements.matchesWanted
        }
      )
      this.dataSupplierProgress = nextStep
      this.dataConsumerProgress = nextStep
      this.loading = false
    }
  },
  components: {
    Matchings
  }
}
</script>
<style>
  .approvals {
    margin-left: -0.75em;
    height: 2.75em;
 }
</style>
