module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  serverMiddleware: [
    '~/api/index'
  ],
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/apollo'
  ],
  axios: {
    baseURL: `http://${process.env.HOST}:${process.env.PORT}/`
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://api.graph.cool/simple/v1/cjj8kjteb6cj40134jhy7vra6'
      }
    }
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    redirect: {
      callback: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { propertyName: 'token.accessToken' }
        }
      }
    }
  }
}
