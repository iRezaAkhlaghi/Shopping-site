// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    shim: false
  },
  modules: [ ['@tailvue/nuxt' , {toast: true}] ,'@pinia/nuxt',"nuxt-lodash"  ],
  toast:{  defaults: { containerClasses: ['top-0']    } } ,
  plugins: [
    { src: '~/plugins/aos', mode: 'client' },
    {src :'~/plugins/font-awesome.ts'},
  ],
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome',
    ]
  }
})
