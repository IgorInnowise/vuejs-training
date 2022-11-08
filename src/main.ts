import App from './App.vue';
import { createApp } from 'vue';
import { router } from './router';

import './style.css';
import './css/nav-bar.css';
import './css/list.css';

const app = createApp(App);

app.use(router);

router.isReady().finally(() => {
  app.mount('#app');
});
