<template>
  <div>
    <v-layout
      v-show="chatIndex === (index - 1)" row wrap
    >
      <v-subheader class="body-2">Metadata</v-subheader>
    </v-layout>
    <v-layout
      row
      v-show="chatIndex === (index - 1)" row wrap
      :class="{reverse: loggedInUserDataRole === 'dataConsumer'}"
    >
      <v-flex xs6>
        <template>
          <v-flex xs12 sm11 >
            <v-card flat class="metadata-card">
              <v-card-title class="body-1 metadata-title">
                Label
              </v-card-title>
              <v-card-text class="body-1">
                {{ supplierAttribute.label }}
              </v-card-text>
            </v-card>
          </v-flex>
         </template>
        <template>
          <v-flex xs12 sm11 >
            <v-card flat class="metadata-card">
              <v-card-title class="body-1 metadata-title">
                Type
              </v-card-title>
              <v-card-text class="body-1">
                {{ supplierAttribute.type }}
              </v-card-text>
            </v-card>
          </v-flex>
         </template>
        <template>
          <v-flex xs12 sm11 >
            <v-card flat class="metadata-card">
              <v-card-title class="body-1 metadata-title">
                Maximum Length
              </v-card-title>
              <v-card-text v-if="supplierAttribute.maximumLength" class="body-1">
                {{ supplierAttribute.maximumLength }}
              </v-card-text>
              <v-card-text v-else class="body-1">
                <em class="grey--text">No value provided</em>
              </v-card-text>
            </v-card>
          </v-flex>
        </template>
      </v-flex>
      <v-flex xs6>
        <template>
          <v-flex xs12 sm11 >
            <v-card flat class="metadata-card">
              <v-card-title class="body-1 metadata-title">
                Label
              </v-card-title>
              <v-card-text class="body-1">
                {{ consumerAttribute.label }}
              </v-card-text>
            </v-card>
          </v-flex>
         </template>
        <template>
          <v-flex xs12 sm11 >
            <v-card flat class="metadata-card">
              <v-card-title class="body-1 metadata-title">
                Type
              </v-card-title>
              <v-card-text class="body-1">
                {{ consumerAttribute.type }}
              </v-card-text>
            </v-card>
          </v-flex>
         </template>
        <template>
          <v-flex xs12 sm11 >
            <v-card flat class="metadata-card">
              <v-card-title class="body-1 metadata-title">
                Maximum Length
              </v-card-title>
              <v-card-text v-if="supplierAttribute.maximumLength" class="body-1">
                {{ consumerAttribute.maximumLength }}
              </v-card-text>
              <v-card-text v-else class="body-1">
                <em class="grey--text">No value provided</em>
              </v-card-text>
            </v-card>
          </v-flex>
        </template>
      </v-flex>
    </v-layout>
    <v-layout
      v-show="chatIndex === (index - 1)" row wrap
    >
      <v-subheader class="body-2">Examples</v-subheader>
    </v-layout>
    <v-layout
      row
      v-show="chatIndex === (index - 1)" row wrap
      :class="{reverse: loggedInUserDataRole === 'dataConsumer'}"
    >
      <v-flex xs6>
        <template>
          <v-flex xs12 sm11 >
            <v-card flat class="metadata-card">
              <v-card-text class="body-1">
                <em
                  class="grey--text"
                  v-if="!(supplierAttribute.examples)">
                    is empty
                </em>
                <div v-else>
                  <v-list class="pa-0">
                    <p
                      v-for="(example, i) in supplierAttribute.examples"
                      :key="i"
                      class="body-1"
                    >
                      • {{ example }}
                    </p>
                  </v-list>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </template>
      </v-flex>
      <v-flex xs6>
        <template>
          <v-flex xs12 sm11 >
            <v-card flat class="metadata-card">
              <v-card-text class="body-1">
                <em
                  class="grey--text"
                  v-if="!(consumerAttribute.examples)">
                    No values provided
                </em>
                <div v-else>
                  <v-list class="pa-0">
                    <p
                      v-for="(example, i) in consumerAttribute.examples"
                      :key="i"
                      class="body-1"
                    >
                      • {{ example }}
                    </p>
                  </v-list>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </template>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    consumerAttribute: Object,
    supplierAttribute: Object,
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
  }
}
</script>
<style>
 .metadata-title {
   background-color: #EEEEEE;
   color: #888888; 
 }
 .metadata-card {
   padding-left: 0.75em;
 }
</style>
