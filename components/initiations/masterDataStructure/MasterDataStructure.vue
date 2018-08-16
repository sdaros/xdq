<template>
  <v-layout>
    <v-flex x12 sm6>
      <stats :structure="structure"> 
      <v-subheader inset class="subtitle mt-3">Preview</v-subheader>
      <template v-if="this.attributes">
        <v-list-tile>
          <v-list-tile-content>
            <v-container>
              <v-layout row align-center>
                <v-flex>
                  <em class="no-data">
                    Master data structure file not yet uploaded!
                  </em>
                </v-flex>
              </v-layout>
            </v-container>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-container>
              <v-layout row align-end>
                <v-flex>
                  <form
                    v-if="showUploadButton"
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
                      bottom
                      tag="label"
                      class="upload-button success theme--dark cursor"
                      for="mdData"
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
    <template v-else>
      <v-layout row>
        <v-spacer></v-spacer>
        <v-flex xs11>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="attributes"
            :pagination.sync="pagination"
            select-all
            item-key="id"
            class="elevation-1 data-table"
          >
            <template slot="headers" slot-scope="props">
              <tr>
                <th>
                  <v-checkbox
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                    primary
                    hide-details
                    @click.native="toggleAll"
                    ></v-checkbox>
                </th>
                <th
                  v-for="header in props.headers"
                  :key="header.text"
                  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                  @click="changeSort(header.value)"
                  >
                  <v-icon small>arrow_upward</v-icon>
                  {{ header.text }}
                </th>
              </tr>
            </template>
            <template slot="items" slot-scope="props">
              <tr :active="props.selected" @click="props.selected = !props.selected">
                <td>
                  <v-checkbox
                    :input-value="props.selected"
                    primary
                    hide-details
                    ></v-checkbox>
                </td>
                <td class="text-xs-center">{{ props.item.label }}</td>
                <td class="text-xs-center">{{ props.item.type }}</td>
                <td class="text-xs-center">{{ props.item.maximumLength }}</td>
                <td class="text-xs-center">{{ props.item.examples }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    <v-list-tile>
      <v-list-tile-action>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-container>
          <v-layout row align-end>
            <v-flex>
              <form v-if="showUploadButton" id="uploadMasterData" enctype="multipart/form-data" @change="uploadFile">
                <input name="mdData" type="file" id="mdData" class="inputfile" value=""/>
                <v-btn
                  fab
                  bottom
                  tag="label"
                  class="upload-button success theme--dark cursor"
                  for="mdData"
                >
                    <template v-if="loading">
                      <v-progress-circular
                        indeterminate
                        color="white"
                      ></v-progress-circular>
                    </template>
                    <template v-else>
                      <v-tooltip top>
                        <v-icon slot="activator">cloud_upload</v-icon>
                        <span>Upload master data structure file</span>
                      </v-tooltip>
                    </template>
    </v-btn>
  </form>

        </v-flex>
      </v-layout>
    </v-container>
      </v-list-tile-content>
      </v-list-tile>
        </template>
</div>
</template>
<script>
import axios from 'axios'
import FormData from 'form-data'
import Stats from '~/components/initiations/masterDataStructure/Stats'

export default {
  props: ['structure', 'initiationId', 'showUploadButton'],
  data: () => ({
    pagination: {
      sortBy: 'label'
    },
    selected: [],
    loading: false
  }),
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
    },
    headers: function () {
      if (this.attributes != null && this.attributes.length > 0) {
        let result = []
        let attributes = Object.keys(this.attributes[0])
        for (let i = 0; i < attributes.length; i++) {
          result.push(
            { text: attributes[i].charAt(0).toUpperCase() + attributes[i].substr(1),
              value: i
            }
          )
        }
        return result
      }
      return []
    }
  },
  methods: {
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.attributes.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    async uploadFile (event) {
      const form = new FormData()
      const cookie = /auth\._token\.local=Bearer%20[^ ]+/.exec(document.cookie)
      const token = cookie[0].split('=').slice(1).join('').substr(9)
      const file = event.target.files[0]
      form.append('mdData', file, file.name)
      this.loading = true
      await axios.post(
        `http://localhost:3000/api/initiations/${this.initiationId}/` +
          `organizations/${this.$auth.user.organization}/masterDataStructure`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      this.loading = false
      window.location.reload(true)
    }
  },
  components: {
    Stats
  }
}
</script>
<style scoped>
 .stat-number {
 }
 .no-data {
   color: grey;
 }
 .stat-label {
   text-transform: uppercase;
 }
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
 #uploadMasterData {
   height: 3rem;
   float: right;
 }
.toolbar {
  height: 80px;
}
.inputfile  + label {
  cursor: pointer;
}
.upload-button {
  position: absolute;
}

</style>
