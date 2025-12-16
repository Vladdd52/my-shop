<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      <!-- затемнение -->
      <div
        class="absolute inset-0 bg-black bg-opacity-50"
        @click="$emit('close')"
      />

      <!-- модалка -->
      <div
        class="relative bg-white rounded-xl shadow-xl max-w-sm w-auto"
        style="max-height: 85vh; overflow-y: auto;"
      >
        <!-- кнопка закрытия -->
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-lg"
        >
          <X class="w-5 h-5" />
        </button>

        <div class="p-4">
          <!-- Image -->
          <div class="flex justify-center mb-4">
            <div class="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
              <img
                v-if="product.image_url"
                :src="product.image_url"
                :alt="product.name"
                class="w-full h-full object-cover rounded-lg"
              />
              <span v-else class="text-gray-400 text-sm">Нет фото</span>
            </div>
          </div>

          <!-- Details -->
          <div class="text-center">
            <span class="text-xs text-blue-600 font-medium block mb-1">
              {{ product.category?.name }}
            </span>

            <h2 class="text-lg font-semibold text-gray-900 mb-2">
              {{ product.name }}
            </h2>

            <div class="text-xl font-bold text-gray-900 mb-3">
              ${{ Number(product.price).toFixed(2) }}
            </div>

            <p
              v-if="product.description"
              class="text-sm text-gray-600 mb-4"
            >
              {{ product.description }}
            </p>

            <div class="flex gap-2">
              <button
                @click="handleAddToCart"
                class="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                В корзину
              </button>

              <button
                @click="$emit('close')"
                class="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>



<script setup>
import { X } from 'lucide-vue-next';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close', 'add-to-cart']);

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function handleAddToCart() {
  emit('add-to-cart', props.product.id);
  emit('close');
}
</script>