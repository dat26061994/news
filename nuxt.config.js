export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'news',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/bootstrap.min.css',
    '~/assets/css/font-awesome.min.css',
    '~/assets/css/animate.css',
    '~/assets/css/font.css',
    '~/assets/css/li-scroller.css',
    '~/assets/css/slick.css',
    '~/assets/css/jquery.fancybox.css',
    '~/assets/css/theme.css',
    '~/assets/css/style.css',
  ],

  js: [
    '~/assets/js/jquery.min.js',
    '~/assets/js/wow.min.js',
    '~/assets/js/bootstrap.min.js',
    '~/assets/js/slick.min.js',
    '~/assets/js/jquery.li-scroller.1.0.js',
    '~/assets/js/jquery.newsTicker.min.js',
    '~/assets/js/jquery.fancybox.pack.js',
    '~/assets/js/custom.js',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/api'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    // proxy: true,
    baseURL: process.env.BASE_URL,
    headers: {
      'X-Auth-Token': process.env.BASE_API_KEY,
      'Access-Control-Allow-Origin': '*',
    }
  },

  // proxy: {
  //   '/api': {
  //     target: 'https://www.scorebat.com/',
  //     pathRewrite: { '^/': '/' }
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  server: {
    host: '0.0.0.0', // default: localhost,
    timing: false
  }
}
