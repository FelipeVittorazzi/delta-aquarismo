import { App } from 'vue';
import {
  IonApp,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonLabel,
  IonItem,
  IonList,
  IonListHeader,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonInput,
  IonTextarea,
  IonToggle,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonThumbnail,
  IonImg,
  IonAvatar,
  IonNote,
  IonSegment,
  IonSegmentButton,
  IonicVue,
} from '@ionic/vue';

// Lista de componentes Ionic para registro global
const components = {
  IonApp,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonLabel,
  IonItem,
  IonList,
  IonListHeader,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonInput,
  IonTextarea,
  IonToggle,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonThumbnail,
  IonImg,
  IonAvatar,
  IonNote,
  IonSegment,
  IonSegmentButton,
};

export const IonicPlugin = {
  install(app: App) {
    // Registra o IonicVue
    app.use(IonicVue);

    // Registra todos os componentes globalmente
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  }
}; 