<template>
  <div class="bg-white rounded-lg shadow-sm p-4 sticky top-24">
    <div class="flex items-center gap-2 mb-4">
      <Filter class="w-5 h-5 text-gray-600" />
      <h2 class="font-semibold text-gray-900">Категории</h2>
    </div>

    <button
      @click="$emit('update:selectedCategory', null)"
      :class="[
        'w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors',
        selectedCategory === null
          ? 'bg-blue-50 text-blue-600 font-medium'
          : 'text-gray-700 hover:bg-gray-50',
      ]"
    >
      Все товары
    </button>

    <button
      v-for="category in categories"
      :key="category.id"
      @click="$emit('update:selectedCategory', category.id)"
      :class="[
        'w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors',
        selectedCategory === category.id
          ? 'bg-blue-50 text-blue-600 font-medium'
          : 'text-gray-700 hover:bg-gray-50',
      ]"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<script setup>
import { Filter } from 'lucide-vue-next';

defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  selectedCategory: {
    type: Number,
    default: null,
  },
});

defineEmits(['update:selectedCategory']);
</script>