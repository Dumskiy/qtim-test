export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  typescript: {
    strict: true,
  },

  app: {
    head: {
      title: 'QTIM',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    }
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  css: ['~/assets/css/main.css'],
})