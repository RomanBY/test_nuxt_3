// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-07-06",
  ssr: true,

  // typescripts
  typescript: {
    strict: true,
    typeCheck: true
  },

  css: ['~/assets/sass/app.scss', '~/assets/sass/grid.scss'],

  plugins: [
    '~/plugins/axios',
    '~/plugins/setDefaultClient.ts',
  ],

  runtimeConfig: {
    apiUrl: '',
    public: {
      apiUrl: process.env.BASE_API_URL,
    }
  },


  // modules
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/device',
    '@nuxt/image'
  ],

  device: {
    refreshOnResize: true
  },

  // experimental features
  experimental: {
  },

  // auto import components
  components: true,

  // app config
  app: {
    // global transition
    // pageTransition: { name: 'page', mode: 'out-in' },
    // layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  googleFonts: {
    display: 'swap',
    preload: true,
    families: {
      Roboto: [300, 400, 500, 700]
    }
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }
})