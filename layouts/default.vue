<template>
<v-app>
  <header>
    <site-header />
  </header>
  <v-content>
    <v-container>
      <v-layout
        justify-center
        align-center
      >
        <nuxt />
      </v-layout>
    </v-container>
  </v-content>
  <v-container>
    <v-layout>
      <v-flex xs12 style="height: 30px;">
      </v-flex>
    </v-layout>
  </v-container>
  <footer>
    <site-footer name="xDQ - Data Quality" year="2018" />
  </footer>
  </v-app>
</template>

<script>
import SiteFooter from '~/components/Footer.vue'
import SiteHeader from '~/components/Header.vue'

export default {
  data () {
    return {
      active: null
    }
  },
  components: {
    SiteFooter,
    SiteHeader
  }
}
</script>
<style scoped>
  .test {
    max-height: 50px;
  }
</style>
