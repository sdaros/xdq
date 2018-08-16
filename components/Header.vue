<template>
<div>
  <v-layout class="primary test">
    <v-flex xs1 class="pt-2 pl-3" >
      <nuxt-link to="/">
        <img src="~/assets/xdq-logo-white.png" alt="xDQ Logo" height="30">
      </nuxt-link>
    </v-flex>
    <v-flex xs10>
      <v-tabs
        v-model="active"
        color="transparent"
        centered
        dark
        slider-color="orange"
        >
        <nuxt-link  tag="v-tab" v-for="p in pages" :key="p.name" :to="p.route">
          {{ p.name }}
        </nuxt-link>
    </v-tabs>
      </v-flex xs1>
    <v-flex>
   <v-menu v-if="$auth.loggedIn" offset-y>
        <v-btn slot="activator" dark flat>
          {{ $auth.user.name }}
          <v-icon dark>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="">
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-title>
              Logout
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
     <v-btn v-else class="primary" dark flat>
        <nuxt-link  tag="v-btn" to="/login">
          Login
        </nuxt-link>
      </v-btn>
    </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  methods: {
    async logout () {
      try {
        await this.$auth.logout()
      } catch (e) {
        console.log({ message: 'Could not log out user', statusCode: 500 })
      }
    }
  },
  computed: {
    active () {
      return this.$router.currentRoute.name
    }
  },
  data () {
    return {
      drawer: false,
      pages: [
        {
          name: 'Initiations',
          route: '/initiations'
        },
        {
          name: 'Agreements',
          route: '/agreements'
        },
        {
          name: 'Verifications',
          route: '/verifications'
        },
        {
          name: 'Evaluations',
          route: '/evaluations'
        }
      ]
    }
  }
}
</script>

<style scoped>
 .toolbar-link {
   text-decoration: none;
   color: #111111;
 }
 .test {
   max-height: 48px;
 }
</style>
