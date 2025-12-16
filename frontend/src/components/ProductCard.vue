<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div 
      class="aspect-square bg-gray-200 flex items-center justify-center cursor-pointer"
      @click="$emit('view-product', product.id)"
    >
      <img
        v-if="product.image_url"
        :src="product.image_url"
        :alt="product.name"
        class="w-full h-full object-cover"
      />
      <span v-else class="text-gray-400">Нет фото</span>
    </div>

    <div class="p-4">
      <span class="text-xs text-blue-600 font-medium">
        {{ product.category.name }}
      </span>
      <h3 
        class="font-semibold text-gray-900 mt-1 mb-2 cursor-pointer hover:text-blue-600"
        @click="$emit('view-product', product.id)"
      >
        {{ product.name }}
      </h3>
      <p v-if="product.description" class="text-sm text-gray-600 mb-3 line-clamp-2">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between mt-4">
        <span class="text-xl font-bold text-gray-900">
          ${{ product.price.toFixed(2) }}
        </span>
        <button
          @click="$emit('add-to-cart', product.id)"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});

defineEmits(['add-to-cart', 'view-product']);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>