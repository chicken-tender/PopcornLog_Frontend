// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    layoutTransition: true
  },

  pages: true,
  devtools: { enabled: true },

  css: [
    '@/assets/styles/global.css',
    'element-plus/dist/index.css'
  ],

  plugins: [],

  runtimeConfig: {
    apiKey: process.env.TMDB_API_KEY,
    apiBaseUrl: process.env.API_BASE_URL,
    public: {
      apiKey: process.env.TMDB_API_KEY,
      apiBaseUrl: process.env.API_BASE_URL,
    }
  },

  compatibilityDate: '2024-11-26'
})