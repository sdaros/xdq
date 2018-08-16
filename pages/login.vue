<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text> <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="username"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" v-model="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      drawer: null,
      username: '',
      password: '',
      error: null
    }
  },
  computed: {
    redirect () {
      return (
        this.$route.query.redirect &&
          decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback () {
      return Boolean(this.$route.query.callback)
    }
  },
  layout: 'auth',
  methods: {
    async login () {
      this.error = null
      return this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .then((username) => {
          this.$store.commit('setLoggedInUserDataRole', username)
        })
        .catch(e => {
          this.error = e + ''
          console.log(this.error)
        })
    }
  }
}
</script>
