let routerBase;
if (process.env.DEPLOY_ENV === 'GH_PAGES') {
  routerBase = {
    router: {
      base: '/nuxt-crud/'
    }
  }
} else if (process.env.DEPLOY_ENV === 'FRONT') {
  routerBase = {
    router: {
      base: '/front/'
    }
  }
} else {
  routerBase = {
    router: {
      base: '/'
    }
  }
}
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
      '~assets/scss/app.scss',
    { src: 'bootstrap-scss', lang: 'sass' },
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
