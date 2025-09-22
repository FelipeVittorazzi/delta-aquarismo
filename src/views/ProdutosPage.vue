<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonThumbnail, 
  IonImg, 
  IonSpinner, 
  IonText, 
  IonSearchbar,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent
} from '@ionic/vue';
import { add, heart, heartOutline } from 'ionicons/icons';
import { useProducts } from '@/composables';

const { 
  products, 
  loading, 
  error, 
  carregarProdutos, 
  activeProducts 
} = useProducts();

const searchText = ref('');

onMounted(() => {
  carregarProdutos({ active: 'true' });
});

function handleSearch() {
  carregarProdutos({ 
    search: searchText.value,
    active: 'true'
  });
}

function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(priceCents / 100);
}

function getProductImage(product: any): string {
  return product.cover_photo?.url || product.photos?.[0]?.url || 'https://placehold.co/300x300';
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Produtos</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <!-- Barra de pesquisa -->
      <div class="p-4">
        <ion-searchbar
          v-model="searchText"
          placeholder="Buscar produtos..."
          @ionInput="handleSearch"
          show-clear-button="focus"
        ></ion-searchbar>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <!-- Erro -->
      <div v-else-if="error" class="flex justify-center items-center py-8 px-4">
        <ion-text color="danger">
          <p class="text-center">{{ error }}</p>
        </ion-text>
      </div>

      <!-- Lista de produtos -->
      <div v-else-if="products.length > 0" class="p-4">
        <ion-grid>
          <ion-row>
            <ion-col size="6" v-for="product in activeProducts" :key="product.id">
              <ion-card class="product-card">
                <div class="product-image-container">
                  <ion-img 
                    :src="getProductImage(product)" 
                    :alt="product.name"
                    class="product-image"
                  />
                  <div class="product-stock" :class="{ 'low-stock': product.stock < 5 }">
                    {{ product.stock }} em estoque
                  </div>
                </div>
                
                <ion-card-content class="p-3">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <p class="product-price">{{ formatPrice(product.sale_price_cents) }}</p>
                  
                  <div class="product-type">
                    Tipo: {{ product.type }}
                  </div>
                  
                  <div class="product-meta">
                    <span class="sku">SKU: {{ product.sku }}</span>
                  </div>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- Mensagem quando não há produtos -->
      <div v-else class="flex justify-center items-center py-8 px-4">
        <ion-text color="medium">
          <p class="text-center">Nenhum produto encontrado.</p>
        </ion-text>
      </div>

      <!-- FAB para adicionar produto -->
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.product-card {
  margin: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-stock {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.product-stock.low-stock {
  background: rgba(220, 38, 38, 0.9);
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a4480;
  margin: 0 0 8px 0;
}

.product-type {
  font-size: 0.85rem;
  color: #666;
  margin: 0 0 8px 0;
  line-height: 1.4;
  text-transform: capitalize;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #888;
}

.brand {
  font-weight: 500;
}

.sku {
  font-family: monospace;
}

ion-card-content {
  padding: 12px !important;
}
</style>
