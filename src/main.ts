import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicPlugin } from './plugins/ionic';
import { VueAutoImportsPlugin } from './plugins/vue-auto-imports';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicPlugin)
  .use(VueAutoImportsPlugin)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
