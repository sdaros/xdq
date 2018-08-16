<template>
<v-layout column class="mb-2">
  <v-stepper v-model="dataSupplierProgress">
    <v-stepper-header>
      <v-stepper-step :complete="isStepComplete(1)" :step="1">
        proposal
      </v-stepper-step>
      <v-divider />
      <v-stepper-step :complete="isStepComplete(2)" :step="2">
        reviewal
      </v-stepper-step>
      <v-divider />
      <v-stepper-step :complete="isStepComplete(3)" :step="3">
        confirmation
      </v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1" class="pb-4" >
        <proposal-step :id="id">
        </proposal-step>
      </v-stepper-content>
      <v-stepper-content step="2">
        <reviewal-step :id="id">
        </reviewal-step>
      </v-stepper-content>
      <v-stepper-content step="3">
        <confirmation-step :id="id">
        </confirmation-step>
      </v-stepper-content>
    </v-stepper-items>
       </v-stepper>
      </v-layout>
</template>
<script>
import ProposalStep from '~/components/agreements/ProposalStep'
import ReviewalStep from '~/components/agreements/ReviewalStep'
import ConfirmationStep from '~/components/agreements/ConfirmationStep'
export default {
  props: {
    id: String,
    dataConsumerId: String
  },
  mounted () {
    if (this.$auth.user.organization === this.dataConsumerId) {
      this.$store.commit('setLoggedInUserDataRole', 'dataConsumer')
    } else {
      this.$store.commit('setLoggedInUserDataRole', 'dataSupplier')
    }
    this.$store.dispatch('agreements/initAgreement', this.id)
  },
  data () {
    return {
      agreementSteps: [
        'proposal', 'reviewal', 'confirmation'
      ],
      loading: false
    }
  },
  computed: {
    dataConsumerAttributes: {
      get () {
        return this.$store.state.agreements.dataConsumerAttributes
      },
      set (value) {
        this.$store.commit('agreements/setDataConsumerAttributes', value)
      }
    },
    dataSupplierAttributes: {
      get () {
        return this.$store.state.agreements.dataSupplierAttributes
      },
      set (value) {
        this.$store.commit('agreements/setDataSupplierAttributes', value)
      }
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
    agreement () {
      return this.$store.state.agreements[this.id]
    },
    matchCodes () {
      return this.$store.state.agreements.matchCodes
    },
    name () {
      return this.agreement.dataQualityProject.name
    },
    dataSupplier () {
      return this.agreement.dataQualityProject.dataSupplier.name
    },
    dataConsumer () {
      return this.agreement.dataQualityProject.dataConsumer.name
    },
    loggedInUserDataRole () {
      return this.$store.state.loggedInUserDataRole
    }
  },
  methods: {
    isStepComplete (step) {
      switch (step) {
        case 1:
          return this.dataSupplierProgress > step
        case 2:
          return this.dataSupplierProgress > step &&
            this.dataConsumerProgress > step
        case 3:
          return this.dataSupplierProgress > step &&
            this.dataConsumerProgress > step
        default:
          return false
      }
    },
    advance (index) {
      switch (index) {
        case 0:
          this.$store.commit('agreements/setDataSupplierProgress', 2)
          this.e1 = 2
          break
        case 1:
          this.$store.commit('agreements/setDataSupplierProgress', 3)
          this.e1 = 3
          break
        default:
          this.$store.commit('agreements/setDataSupplierProgress', 4)
          this.e1 = 1
      }
    }
  },
  components: {
    ProposalStep,
    ReviewalStep,
    ConfirmationStep
  }
}
</script>
<style scoped>
.page-title {
  color: #777777
}
 .reorder {
   cursor: move;
   cursor: -webkit-grabbing;
 }
 .approvals {
   margin-left: -0.75em;
   height: 2.75em;
 }
</style>
