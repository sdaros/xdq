<template>
  <v-flex x12>
        <v-container v-if="!this.attributes">
          <v-layout row>
            <v-flex offset-xs1>
              <em class="grey--text">
                Master data structure file not yet uploaded!
              </em>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container v-else>
          <v-layout row align-center>
            <v-layout column align-center>
              <v-flex class="display-1">
                {{ numberOfAttributes }}
              </v-flex>
              <v-flex class="caption stat-label">
                # of attributes
              </v-flex>
            </v-layout>
            <v-layout column align-center>
              <v-flex class="display-1">
                {{ metadataPerAttribute }}
              </v-flex>
              <v-flex class="caption stat-label">
                metadata / attribute
              </v-flex>
            </v-layout>
          </v-layout>
        </v-container>
  </v-flex>
</template>

<script>
export default {
  props: {
    structure: String
  },
  computed: {
    attributes: function () {
      return JSON.parse(this.structure)
    },
    numberOfAttributes: function () {
      if (this.attributes != null && this.attributes.length > 0) {
        return this.attributes.length
      }
      return 0
    },
    metadataPerAttribute: function () {
      if (this.attributes != null && this.attributes.length > 0) {
        return Object.keys(this.attributes[0]).length
      }
      return 0
    }
  }
}
</script>
<style scoped>
  .stat-label {
    text-transform: uppercase;
 }
</style>
