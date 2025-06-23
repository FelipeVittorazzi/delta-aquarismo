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

// Importar plugins do Capacitor
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

const app = createApp(App)
  .use(IonicPlugin)
  .use(VueAutoImportsPlugin)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});

// Configurar StatusBar e NavigationBar quando a plataforma estiver pronta
document.addEventListener('deviceready', async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      // Configurar StatusBar com a cor do tema primário
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#0b314b' });
      
      // Para Android, configurar NavigationBar via CSS customizado
      if (Capacitor.getPlatform() === 'android') {
        // Adicionar classe CSS para configurar a NavigationBar
        document.body.classList.add('android-navigation-bar');
      }
    } catch (error) {
      console.log('Erro ao configurar StatusBar:', error);
    }
  }
});
