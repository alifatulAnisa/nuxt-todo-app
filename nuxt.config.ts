// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxtjs/ionic', 
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],
  ionic: {
    css: {
      utilities: true
    }
  },
  pwa: {
    manifest: {
      name: "Nuxt Todo App PWA",
      short_name: "Nuxt3 PWA",
      description: "Test Nuxt3 PWA",
    },
  },
})
