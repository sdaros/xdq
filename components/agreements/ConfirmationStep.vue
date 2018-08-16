<template>
  <v-container v-if="loggedInUserDataRole === 'dataSupplier'" class="pa-0">
      <v-layout>
        <v-flex>
          <v-subheader class="title">General information</v-subheader>
        </v-flex>
      </v-layout>
    <v-layout
      row
      wrap
      :class="{reverse: loggedInUserDataRole !== 'dataConsumer'}">
      <v-flex xs12 sm6 class="pr-2">
        <v-list two-line subheader>
          <v-subheader inset class="mb-2">
            Data Consumer
            <v-spacer></v-spacer>
            <v-avatar class="pt-5" tile size="80">
              <img src="~/assets/handel24-logo.png" alt="Burberry logo" />
            </v-avatar>
          </v-subheader>
          <v-list-tile
            avatar
            @click=""
            >
            <v-list-tile-action>
              <v-icon color="primary">location_city</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ initiation.dataConsumer.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ initiation.dataConsumer.location }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile
            avatar
            @click=""
            >
            <v-list-tile-action>
              <v-icon color="primary">phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ initiation.dataConsumer.phoneNumber }}</v-list-tile-title>
              <v-list-tile-sub-title>Work</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile
            avatar
            @click=""
            >
            <v-list-tile-action>
              <v-icon color="primary">email</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ initiation.dataConsumer.email }}</v-list-tile-title>
              <v-list-tile-sub-title>Work</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon color="grey lighten-1">chat</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs12 sm6>
        <v-list two-line subheader>
          <v-subheader inset class="mb-2">
            Data Supplier
            
            <v-spacer></v-spacer>
            <v-avatar class="pt-5" tile size="80">
              <img src="~/assets/textilfabrik-logo.png" alt="Burberry logo" />
            </v-avatar>
          </v-subheader>
          <v-list-tile
            avatar
            @click=""
            >
            <v-list-tile-action>
              <v-icon color="primary">location_city</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ initiation.dataSupplier.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ initiation.dataSupplier.location }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile
            avatar
            @click=""
            >
            <v-list-tile-action>
              <v-icon color="primary">phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ initiation.dataSupplier.phoneNumber }}</v-list-tile-title>
              <v-list-tile-sub-title>Work</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile
            avatar
            @click=""
            >
            <v-list-tile-action>
              <v-icon color="primary">email</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ initiation.dataSupplier.email }}</v-list-tile-title>
              <v-list-tile-sub-title>Work</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon color="grey lighten-1">chat</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
        </v-layout>
    <v-layout>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-subheader class="title">Matched attributes</v-subheader>
          <matchings class="pl-3" hide-buttons disabled/>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-subheader class="title">Unmatched attributes</v-subheader>
          <matchings class="pl-3" hide-buttons disabled/>
        </v-flex>
      </v-layout>
            <v-layout row wrap class="mt-3">
              <v-flex class="pl-3" xs3>
               <v-btn
                tag="a"
                download="proposed.gif"
                outline
                :loading="loading"
                @click="generate"
              >
                data quality agreement
                <v-icon right>cloud_download</v-icon>
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
                  @click="current += 1"
                  v-else
                >
                  Confirm
                  <v-icon right dark>check_circle</v-icon>
                </v-btn>
                </v-flex>
                </v-layout>
              </v-flex>
              </v-layout>
            <v-layout>
              <code>{{ dataQualityAgreement }}</code>
            </v-layout>
  </v-container>
  <v-container v-else class="pa-0">
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
                <matchings disabled/>
              </v-flex>
            </v-layout>
            <v-layout class="mt-3" justify-space-between>
              <v-flex xs4 class="pl-4">
                  <v-btn
                depressed
                color="primary"
                @click="current = 1"
               >
                 Approve
                <v-icon right dark>check_circle</v-icon>
               </v-btn>
                <v-tooltip bottom>
                  <v-chip slot="activator" label disabled outline color="primary" class="approvals">{{ current }} of 2</v-chip>
                  <span> {{ this.$auth.user.name }} has approved the current attribute matchings</span>
                </v-tooltip>
              </v-flex>
              <v-flex xs3>
               <v-btn
                outline
                @click=""
              >
                request reviewal
                <v-icon right>chevron_right</v-icon>
              </v-btn>
              </v-flex>
              <v-flex xs3>
               <v-btn
                outline
                @click="advance(1)"
              >
                to confirmation
                <v-icon right>chevron_right</v-icon>
              </v-btn>
              </v-flex>
            </v-layout>
            <v-layout>
              <code>{{ dataQualityAgreement }}</code>
            </v-layout>
  </v-container>
</template>

<script>
import Matchings from '~/components/agreements/Matchings'
import Initiation from '~/components/initiations/Initiation'
const yaml = require('js-yaml')

export default {
  props: {
    id: String
  },
  data () {
    return {
      current: 0,
      loading: false,
      dataQualityAgreement: ''
    }
  },
  methods: {
    advance (index) {
      switch (index) {
        case 0:
          this.$store.commit('agreements/setDataSupplierProgress', 2)
          break
        case 1:
          this.$store.commit('agreements/setDataSupplierProgress', 3)
          break
        default:
          this.$store.commit('agreements/setDataSupplierProgress', 4)
      }
    },
    async generate () {
      this.loading = true
      try {
        let result = await this.$store.dispatch('agreements/generateDataQualityAgreement', this.id)
        let dqa = yaml.dump(result)
        console.log('Data Quality Agremeent:' + dqa)
        this.dataQualityAgreement = dqa
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    }
  },
  computed: {
    loggedInUserDataRole () {
      return this.$store.state.loggedInUserDataRole
    },
    initiations () {
      return this.$store.state.initiations.all
    },
    initiation () {
      return this.$store.state.initiations.all[0]
    }
  },
  components: {
    Initiation,
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
