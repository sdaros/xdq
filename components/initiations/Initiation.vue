<template>
<v-card id="card">
  <v-container wrap reverse :class="{reverse: true}">
    <data-quality-project-header :name="name" />
    <consumer-supplier-overview
      :reverse="loggedInUserDataRole === 'dataSupplier'"
      :dataConsumer="this.dataConsumer"
      :dataSupplier="this.dataSupplier"
      ></consumer-supplier-overview>
    <v-layout row :reverse="loggedInUserDataRole === 'dataSupplier'">
      <v-flex xs12 sm6>
        <v-subheader class="subtitle mt-3" inset>
          Master Data
        </v-subheader>
        <v-layout>
          <v-container>
            <stats :structure="this.dataConsumer.masterDataStructure" /> 
          </v-container>
        </v-layout>
        <v-subheader class="subtitle mt-3" inset>
          Preview
        </v-subheader>
        <v-layout>
          <v-container>
            <preview :structure="this.dataConsumer.masterDataStructure" /> 
          </v-container>
        </v-layout>
        <upload
          :visible="loggedInUserDataRole === 'dataConsumer'"
          :initiationId="id"
        >
        </upload>
      </v-flex>
      <v-flex xs12 sm6>
        <v-subheader class="subtitle mt-3" inset>
          Master Data
        </v-subheader>
        <v-layout>
          <v-container>
            <stats :structure="this.dataSupplier.masterDataStructure" /> 
          </v-container>
        </v-layout>
        <v-subheader class="subtitle mt-3" inset>
          Preview
        </v-subheader>
        <v-layout>
          <v-container>
            <preview :structure="this.dataSupplier.masterDataStructure" /> 
          </v-container>
        </v-layout>
        <upload
          :visible="loggedInUserDataRole === 'dataSupplier'"
          :initiationId="id"
        ></upload>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-spacer></v-spacer>
      <v-btn
        :class="{ 'btn--disabled': !bothMasterDataStructureFilesSubmitted }"
        :loading="loading"
        color="primary"
        @click="update">
        to agreement
        <v-icon right>chevron_right</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</v-card>
</template>

<script>
import DataQualityProjectHeader from '~/components/dataQualityProject/Header'
import ConsumerSupplierOverview from '~/components/dataQualityProject/ConsumerSupplierOverview'
import Stats from '~/components/initiations/masterDataStructure/Stats'
import Preview from '~/components/initiations/masterDataStructure/Preview'
import Upload from '~/components/initiations/masterDataStructure/Upload'
import _ from 'lodash'

export default {
  props: {
    id: String,
    name: String,
    loading: false,
    dataQualityProjectId: {
      type: String,
      required: true
    },
    dataConsumer: Object,
    dataSupplier: Object
  },
  mounted () {
    if (this.$auth.user.organization === this.dataConsumer.id) {
      this.$store.commit('setLoggedInUserDataRole', 'dataConsumer')
    } else {
      this.$store.commit('setLoggedInUserDataRole', 'dataSupplier')
    }
  },
  computed: {
    bothMasterDataStructureFilesSubmitted () {
      return !_.isEmpty(this.dataSupplier.masterDataStructure) &&
        !_.isEmpty(this.dataConsumer.masterDataStructure)
    },
    loggedInUserDataRole () {
      return this.$store.state.loggedInUserDataRole
    }
  },
  methods: {
    async update () {
      this.loading = true
      await this.$store.dispatch(
        'agreements/update',
        {
          dataQualityProjectId: this.dataQualityProjectId,
          dataRole: this.loggedInUserDataRole
        }
      )
      this.loading = false
      this.$router.push('agreements')
    }
  },
  components: {
    DataQualityProjectHeader,
    ConsumerSupplierOverview,
    Stats,
    Preview,
    Upload
  }
}
</script>
