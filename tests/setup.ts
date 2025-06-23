// Arquivo de setup para testes Vitest
// Pode ser usado para mocks globais futuramente 

import { vi } from 'vitest'

// Mock para componentes Ionic
vi.mock('@ionic/vue', () => ({
  IonApp: { template: '<div><slot /></div>' },
  IonRouterOutlet: { template: '<div><slot /></div>' },
  IonPage: { template: '<div><slot /></div>' },
  IonContent: { template: '<div><slot /></div>' },
  IonCard: { template: '<div><slot /></div>' },
  IonCardHeader: { template: '<div><slot /></div>' },
  IonCardTitle: { template: '<div><slot /></div>' },
  IonCardContent: { template: '<div><slot /></div>' },
  IonItem: { template: '<div><slot /></div>' },
  IonLabel: { template: '<div><slot /></div>' },
  IonInput: { template: '<input />' },
  IonText: { template: '<div><slot /></div>' },
  IonToolbar: { template: '<div><slot /></div>' },
  IonTabBar: { template: '<div><slot /></div>' },
  IonButton: { template: '<button><slot /></button>' }
})) 