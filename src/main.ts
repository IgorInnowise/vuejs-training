import { createApp } from 'vue';
import './style.css';
import './css/nav-bar.css';
import './css/list.css';

import App from './App.vue';
import Navbar from './components/NavBar.vue';
import ListCard from './components/ListCard.vue';
import DeletePopUp from './components/DeletePopUp.vue';
import ConfirmPopUp from './components/ConfirmPopUp.vue';

import { router } from './router';

const app = createApp(App);

app.use(router);

app.component('NavbarComponent', Navbar);
app.component('ListCardComponent', ListCard);
app.component('DeletePopUpComponent', DeletePopUp);
app.component('ConfirmPopUpComponent', ConfirmPopUp);

router.isReady().finally(() => {
  app.mount('#app');
});
