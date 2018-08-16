<template>
  <v-container fluid>
    <v-layout
      v-for="(message, i) in messages"
      :key="message.id"
      row
      wrap
    >
      <v-flex xs12>
        <v-card flat>
          <v-layout>
            <v-flex xs2>
              <v-list-tile-avatar tile :color="avatarColor(message.dataRole)">
                <span class="white--text headline">
                  {{ message.author.slice(0,2).toUpperCase() }}
                </span>
              </v-list-tile-avatar>
            </v-flex>
            <v-flex xs10 class="pl-2">
              <v-card-title class="pa-0 caption">
                <strong>{{ message.author }}</strong>
                <span>&nbsp;·&nbsp</span>
                <span class="grey--text">{{ prettify(message.postDate) }}</span>
              </v-card-title>
              <div class="body-1">
                {{ message.body }}
              </div>
              <v-card-actions>
                <v-icon size="small">thumb_up</v-icon>
                <span class="caption grey--text pl-2">Reply</span>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex v-if="messages.length - 1 > i" xs12 class="pt-2 pb-2 divider">
        <v-divider inset />
      </v-flex>
    </v-layout>
     <v-layout class="pt-3 pb-3 divider">
      <v-divider inset />
    </v-layout>
    <v-layout>
      <v-flex>
        <v-card flat>
          <v-layout>
            <v-flex xs1></v-flex>
            <v-flex xs2 class="pl-2">
              <v-list-tile-avatar tile :color="avatarColor(loggedInUserDataRole)">
                <span class="white--text headline">
                  {{ this.$auth.user.name.slice(0,2).toUpperCase() }}
                </span>
              </v-list-tile-avatar>
            </v-flex>
            <v-flex class="pl-2" xs9>
              <div>
                <v-textarea
                  v-model="message"
                  outline
                  name="input-7-4"
                  auto-grow
                  label="Enter a message here"
                  value=""
                ></v-textarea>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat>clear</v-btn>
                <v-btn @click="appendMessage" depressed>post</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    messages: Array
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {
    loggedInUserDataRole () {
      return this.$store.state.loggedInUserDataRole
    }
  },
  methods: {
    avatarColor (dataRole) {
      return dataRole === 'dataSupplier' ? 'blue' : 'purple'
    },
    prettify (date) {
      return moment(date).fromNow()
    },
    appendMessage () {
      console.log(this.message)
      this.$store.commit('agreements/appendMessage',
        {
          id: Date.now(),
          body: this.message,
          postDate: Date.now()
        }
      )
    }
  }
}
</script>

<style scope>
 .divider {
   margin-left: -1rem;
 }
</style>
