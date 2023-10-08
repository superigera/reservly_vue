import { createApp } from 'vue'
import App from './views/App.vue'
import router from './router/index'
import store from './store/index'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)
app.use(store)
app.use(router)
app.use(vuetify)
app.mount('#app')
