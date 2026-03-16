export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',
  future: {
    compatibilityVersion: 4
  },

  app: {
    baseURL: '/web-colors/',
    head: {
      title: 'Web Colors — A Guide to CSS Color Formats',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'An interactive guide to every CSS color format — from hex to OKLCH — with theming strategies and real-world comparisons.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/web-colors/favicon.svg' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'github-pages'
  }
})
