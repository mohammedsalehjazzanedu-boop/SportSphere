// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === 'development' 
        ? '/api'
        : 'https://api.mobarat.us/v1'
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://api.mobarat.us/v1',
        changeOrigin: true
      }
    }
  },
  ssr: true,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'IPTV',
      meta: [
        { name: 'description', content: 'IPTV Application' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://www.onlinewebfonts.com/css/1f0f5a7a45b6f5b469b5c0c406b6bd2f'
        }
       ]//,
      // htmlAttrs: {
      //   dir: 'rtl',
      //   lang: 'ar'
      // }
    }
  },
  css: [
    '@/assets/css/main.css'
  ],
  // build: {
  //   transpile: ['hls.js', 'vue-i18n']
  // },
  vite: {
    optimizeDeps: {
      include: ['hls.js']
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'IPTV',
      short_name: 'IPTV',
      description: 'IPTV Application',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'Mobarat-logo-02.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'Mobarat-logo-02.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'Mobarat-logo-02.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  }
})