import { createApp } from 'vue';
import './assets/main.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { initializeRemoteConfig } from './service/firebase';

const app = createApp(App);

app.use(createPinia());
app.use(router);
initializeRemoteConfig();
app.mount('#app');
