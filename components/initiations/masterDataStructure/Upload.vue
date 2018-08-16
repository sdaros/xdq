<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-container>
        <v-layout row align-end>
          <v-flex>
            <form
              v-if="true"
              id="uploadMasterData"
              enctype="multipart/form-data"
              @change="uploadFile"
            >
              <input
                name="mdData"
                type="file"
                id="mdData"
                class="inputfile"
                value=""
              ></input>
              <v-btn
                fab
                right
                bottom
                :loading="loading"
                tag="label"
                class="upload-button success theme--dark cursor"
                for="mdData"
                v-show="visible"
              >
                <v-tooltip top>
                  <v-icon slot="activator">cloud_upload</v-icon>
                  <span>Upload master data structure file</span>
                </v-tooltip>
              </v-btn>
            </form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    initiationId: String
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async uploadFile (event) {
      this.loading = true
      await this.$store.dispatch(
        'initiations/uploadMasterDataStructureFile',
        {
          initiationId: this.initiationId,
          event: event
        }
      )
      this.loading = false
    }
  }
}
</script>
<style scoped>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.inputfile  + label {
  cursor: pointer;
}
.upload-button {
  position: absolute;
}
</style>
