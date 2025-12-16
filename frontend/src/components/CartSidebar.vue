<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="$emit('close')" />

      <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div class="p-4 border-b flex items-center justify-between">
          <h2 class="text-xl font-semibold">Корзина</h2>
          <button @click="$emit('close')" class="p-2 hover:bg-gray-100 rounded-lg">
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="cartStore.cartDetails && cartStore.cartDetails.items.length > 0" class="space-y-4">
            <div
              v-for="item in cartStore.cartDetails.items"
              :key="item.product_id"
              class="flex gap-4 border-b pb-4"
            >
              <div class="w-20 h-20 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                <img
                  v-if="item.image_url"
                  :src="item.image_url"
                  :alt="item.name"
                  class="w-full h-full object-cover rounded"
                />
                <span v-else class="text-gray-400 text-xs">Нет фото</span>
              </div>

              <div class="flex-1">
                <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                <p class="text-gray-600">${{ item.price.toFixed(2) }}</p>

                <div class="flex items-center gap-2 mt-2">
                  <button
                    @click="cartStore.updateQuantity(item.product_id, item.quantity - 1)"
                    class="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus class="w-4 h-4" />
                  </button>
                  <span class="w-8 text-center">{{ item.quantity }}</span>
                  <button
                    @click="cartStore.updateQuantity(item.product_id, item.quantity + 1)"
                    class="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus class="w-4 h-4" />
                  </button>
                  <button
                    @click="cartStore.removeFromCart(item.product_id)"
                    class="ml-auto p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div class="text-right">
                <p class="font-semibold">${{ item.subtotal.toFixed(2) }}</p>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <ShoppingCart class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p class="text-gray-500">Корзина пуста</p>
          </div>
        </div>

        <div
          v-if="cartStore.cartDetails && cartStore.cartDetails.items.length > 0"
          class="border-t p-4 space-y-4"
        >
          <div class="space-y-2">
            <div class="flex justify-between text-gray-600">
              <span>Товаров:</span>
              <span>{{ cartStore.cartDetails.items_count }}</span>
            </div>
            <div class="flex justify-between text-xl font-bold">
              <span>Итого:</span>
              <span>${{ cartStore.cartDetails.total.toFixed(2) }}</span>
            </div>
          </div>

          <button
            class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Оформить заказ
          </button>

          <button
            @click="cartStore.clearCart"
            class="w-full py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Очистить корзину
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-vue-next';
import { useCartStore } from '@/stores/cart';

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['close']);

const cartStore = useCartStore();
</script>