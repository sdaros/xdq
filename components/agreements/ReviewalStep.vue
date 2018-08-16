<template>
  <v-container v-if="loggedInUserDataRole === 'dataSupplier'" class="pa-0">
    <v-layout>
       <v-flex>
         <v-alert
           dismissible
           v-model="alert"
           type="info"
           color="primary lighten-2"
           >
           Your submitted attribute matchings are currently awaiting reviewal
         </v-alert>
         <matchings />
       </v-flex>
     </v-layout>
     <v-layout row wrap class="mt-3">
       <v-flex class="pl-3" xs3>
        <v-btn
         outline
          :loading="loading"
         @click="updateMatchings()"
       >
         request reviewal
       </v-btn>
       </v-flex>
       <v-spacer></v-spacer>
       <v-flex xs5>
         <v-layout>
          <v-flex xs2 class="approvals pl-3">
           <v-tooltip bottom>
             <v-chip slot="activator" label disabled outline color="primary" class="approvals">
               {{ current }} of 2
             </v-chip>
             <span v-if="current === 0">
               No users have yet approved the current attribute matchings
             </span>
             <span v-else>
               {{ this.$auth.user.name }} has approved the current attribute matchings
             </span>
           </v-tooltip>
         </v-flex>
         <v-flex xs10>
         <v-btn
           depressed
           color="primary"
           @click="advance(1)"
           v-if="current === 2"
         >
           to confirmation
           <v-icon right dark>chevron_right</v-icon>
         </v-btn>
          <v-btn
           depressed
           color="primary"
           @click="dataSupplierProgress = 3"
           v-else
         >
           Approve
           <v-icon right dark>check_circle</v-icon>
         </v-btn>
         </v-flex>
         </v-layout>
       </v-flex>
       </v-layout>
  </v-container>
  <v-container v-else class="pa-0">
    <v-layout>
       <v-flex>
         <matchings />
       </v-flex>
     </v-layout>
     <v-layout row wrap class="mt-3">
       <v-flex class="pl-3" xs3>
        <v-btn
         outline
          :loading="loading"
         @click="updateMatchings()"
       >
         request reviewal
       </v-btn>
       </v-flex>
       <v-spacer></v-spacer>
       <v-flex xs5>
         <v-layout>
          <v-flex xs2 class="approvals pl-3">
           <v-tooltip bottom>
             <v-chip slot="activator" label disabled outline color="primary" class="approvals">
               {{ current }} of 2
             </v-chip>
             <span v-if="current === 0">
               No users have yet approved the current attribute matchings
             </span>
             <span v-else>
               {{ this.$auth.user.name }} has approved the current attribute matchings
             </span>
           </v-tooltip>
         </v-flex>
         <v-flex xs10>
         <v-btn
           depressed
           color="primary"
           @click="advance(1)"
           v-if="current === 2"
         >
           to confirmation
           <v-icon right dark>chevron_right</v-icon>
         </v-btn>
          <v-btn
           depressed
           color="primary"
           @click="dataConsumerProgress = 3"
           v-else
         >
           Approve
           <v-icon right dark>check_circle</v-icon>
         </v-btn>
         </v-flex>
         </v-layout>
       </v-flex>
       </v-layout>
  </v-container>
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
      alert: true,
      loading: false
    }
  },
  methods: {
    async updateMatchings () {
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
      this.loading = false
    },
    advance (nextStep) {
      if (this.loggedInUserDataRole === 'dataSupplier') {
        this.dataSupplierProgress = nextStep
      } else {
        this.dataConsumerProgress = nextStep
      }
    }
  },
  computed: {
    agreement () {
      return this.$store.state.agreements[this.id]
    },
    dataSupplierProgress: {
      get () {
        return this.$store.state.agreements.progress.dataSupplier
      },
      set (value) {
        this.$store.dispatch(
          'agreements/updateDataSupplierProgress',
          {
            progress: value,
            agreementProgressId: this.agreement.progress.id
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
            progress: value,
            agreementProgressId: this.agreement.progress.id
          }
        )
      }
    },
    loggedInUserDataRole () {
      return this.$store.state.loggedInUserDataRole
    }
  },
  components: {
    Matchings
  }
}
</script>
<style scoped>
  .approvals {
    height: 2.75em;
    padding-top: 2px;
  }
</style>
