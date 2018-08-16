<template>
  <v-layout
    row
    :class="{reverse: loggedInUserDataRole !== 'dataSupplier'}"
  >
    <v-flex xs6>
      <v-list-tile
        avatar
        @click="showChat(index-1)"
      >
        <v-list-tile-content>
          <v-list-tile-title>
            {{ supplierAttribute.label }}
          </v-list-tile-title>
          <v-list-tile-sub-title>
            Type: {{ supplierAttribute.type }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-flex>
    <v-flex xs6>
      <v-list-tile
        avatar
        @click="showChat(index-1)"
      >
        <v-list-tile-content>
          <v-list-tile-title>
            {{ consumerAttribute.label }}
          </v-list-tile-title>
          <v-list-tile-sub-title>
            Type: {{ consumerAttribute.type }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-flex>
  </v-layout>
</template>

<script>
import MatchCode from '~/components/agreements/MatchCode'
export default {
  props: {
    consumerAttribute: Object,
    supplierAttribute: Object,
    disabled: Boolean,
    matchCode: Number,
    index: Number
  },
  computed: {
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
    MatchCode
  }
}
</script>
