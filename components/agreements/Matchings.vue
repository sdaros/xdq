<template>
   <v-layout row wrap>
      <draggable v-model="dataSupplierAttributes" :options="{handle: '.reorder'}">
        <template
          v-for="i in dataSupplierAttributes.length"
        >
        <v-layout class="pa-0" :key="i" row wrap>
            <match-code v-show="!hideMatchCode" class="pt-2" :confidenceNumber="matchCodes[i-1]" />
          <v-flex xs9>
            <matchings-tile
              :class="disabled ? 'disabled' : 'reorder'"
              :supplier-attribute="dataSupplierAttributes[i-1]"
              :consumer-attribute="dataConsumerAttributes[i-1]"
              :match-code="matchCodes[i-1]"
              :disabled="disabled"
              :index="i"
            ></matchings-tile>
            <matchings-metadata
              :supplier-attribute="dataSupplierAttributes[i-1]"
              :consumer-attribute="dataConsumerAttributes[i-1]"
              :index="i"
            ></matchings-metadata>
          </v-flex>
          <v-flex v-if="!hideButtons"class="pt-2" xs2>
            <matchings-button :index="i-1" />
          </v-flex>
          <v-flex xs9 offset-xs1 v-show="chatIndex === (i - 1)">
            <chat username="Peter" :messages="messages" />
          </v-flex>
        </v-layout>
      </template>
     </draggable>
   </v-layout>
</template>

<script>
import MatchingsTile from '~/components/agreements/MatchingsTile'
import MatchingsMetadata from '~/components/agreements/MatchingsMetadata'
import MatchingsButton from '~/components/agreements/MatchingsButton'
import MatchCode from '~/components/agreements/MatchCode'
import Chat from '~/components/Chat'
import draggable from 'vuedraggable'
export default {
  props: {
    disabled: Boolean,
    hideMatchCode: Boolean,
    hideButtons: Boolean
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
    messages () {
      return this.$store.state.agreements.messages
    },
    matchCodes () {
      return this.$store.state.agreements.matchCodes
    },
    loggedInUserDataRole () {
      return this.$store.state.loggedInUserDataRole
    },
    chatIndex: {
      get () {
        return this.$store.state.agreements.showChatIndex
      },
      set (value) {
        this.$store.commit('agreements/setShowChatIndex', value)
      }
    }
  },
  methods: {
    showChat (index) {
      if (this.chatIndex === index) {
        this.chatIndex = -1
      } else {
        this.chatIndex = index
      }
    }
  },
  components: {
    MatchingsTile,
    MatchingsMetadata,
    MatchCode,
    MatchingsButton,
    Chat,
    draggable
  }
}
</script>
<style scoped>
.page-title {
  color: #777777
}
.fab {
  margin-top: -0.25rem;
  margin-right: -1.75rem;
  float: right;
}
 .reorder {
   cursor: move;
   cursor: -webkit-grabbing;
 }
 .metadata-title {
   background-color: #EEEEEE;
   color: #888888; 
 }
 .metadata-card {
   padding-left: 0.75em;
 }
 .disabled {
   cursor: not-allowed;
 }
</style>
