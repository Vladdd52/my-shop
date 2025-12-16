<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900">Магазин</h1>

          <button @click="isCartOpen = true" class="relative p-2 text-gray-600 hover:text-gray-900">
            <ShoppingCart class="w-6 h-6" />
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartStore.itemCount }}
            </span>
          </button>
        </div>

        <div class="mt-4">
          <SearchBar v-model="searchQuery" />
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex gap-8">
        <aside class="w-64 flex-shrink-0">
          <CategoryFilter
            :categories="categories"
            v-model:selected-category="selectedCategory"
          />
        </aside>

        <main class="flex-1">
          <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>

          <template v-else>
            <div class="mb-6">
              <h2 class="text-xl font-semibold text-gray-900">
                {{ currentCategoryName }}
              </h2>
              <p class="text-gray-600 mt-1">Найдено товаров: {{ filteredProducts.length }}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
                @add-to-cart="handleAddToCart"
                @view-product="handleViewProduct"
              />
            </div>

            <div v-if="filteredProducts.length === 0" class="text-center py-12">
              <p class="text-gray-500">Товары не найдены</p>
            </div>
          </template>
        </main>
      </div>
    </div>

    <CartSidebar :is-open="isCartOpen" @close="isCartOpen = false" />

    <!-- Modal для просмотра товара -->
    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="selectedProduct = null"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { ShoppingCart } from 'lucide-vue-next';
import { shopApi } from '@/api/shopApi';
import { useCartStore } from '@/stores/cart';
import SearchBar from '@/components/SearchBar.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import ProductCard from '@/components/ProductCard.vue';
import CartSidebar from '@/components/CartSidebar.vue';
import ProductModal from '@/components/ProductModal.vue';

const cartStore = useCartStore();

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref(null);
const selectedProduct = ref(null);
const searchQuery = ref('');
const loading = ref(true);
const isCartOpen = ref(false);

const currentCategoryName = computed(() => {
  if (!selectedCategory.value) return 'Все товары';
  const category = categories.value.find(c => c.id === selectedCategory.value);
  return category?.name || 'Все товары';
});

const filteredProducts = computed(() => {
  return products.value.filter(
    product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});

async function fetchCategories() {
  try {
    const data = await shopApi.getCategories();
    categories.value = data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

async function fetchProducts() {
  loading.value = true;
  try {
    const data = selectedCategory.value
      ? await shopApi.getProductsByCategory(selectedCategory.value)
      : await shopApi.getProducts();
    products.value = data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
}

async function handleViewProduct(productId) {
  try {
    const product = await shopApi.getProduct(productId);
    selectedProduct.value = product;
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}

function handleAddToCart(productId) {
  cartStore.addToCart(productId);
}

watch(selectedCategory, () => {
  fetchProducts();
});

onMounted(() => {
  fetchCategories();
  fetchProducts();
});
</script>