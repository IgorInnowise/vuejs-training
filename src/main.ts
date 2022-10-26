import { createApp } from 'vue';
import './style.css';
import './css/nav-bar.css';
import './css/list.css';

import App from './App.vue';
import Navbar from './components/NavBar.vue';
import ListCard from './components/ListCard.vue';

import { router } from './router';

const app = createApp(App);

app.use(router);

app.component('NavbarComponent', Navbar);
app.component('ListCardComponent', ListCard);

router.isReady().finally(() => {
  app.mount('#app');
});
