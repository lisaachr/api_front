import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'

import PrimeVue from 'primevue/config'

import Aura from '@primevue/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});


app.use(PrimeVue);

app.use(router)
app.use(Notifications)
app.mount('#app')
