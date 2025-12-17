<template>
  <div class="categories-container">
    <div class="categories-header">
      <Filter class="icon" />
      <h2>Категории</h2>
    </div>

    <!-- Кнопка "Все товары" -->
    <button
      class="category-btn"
      :class="{ active: selectedCategory === null }"
      @click="$emit('update:selectedCategory', null)"
    >
      Все товары
    </button>

    <!-- Список категорий -->
    <button
      v-for="category in categories"
      :key="category.id"
      class="category-btn"
      :class="{ active: selectedCategory === category.id }"
      @click="$emit('update:selectedCategory', category.id)"
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

<style scoped>
.categories-container {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  position: sticky;
  top: 6rem;
}

.categories-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #4B5563; /* gray-600 */
}

.category-btn {
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  color: #374151; /* gray-700 */
  font-weight: 500; /* всегда один вес */
  cursor: pointer;
  transition: all 0.25s ease; /* плавная анимация всех изменений */
  transform: scale(1);
}

.category-btn:hover {
  background: #F9FAFB; /* gray-50 */
}

.category-btn.active {
  background: #EFF6FF; /* blue-50 */
  color: #2563EB; /* blue-600 */
  /* font-weight убрали, чтобы текст не прыгал */
  transform: scale(1.05); /* плавное увеличение */
  box-shadow: 0 2px 8px rgba(37,99,235,0.2); /* лёгкий эффект «поднятия» */
}

/* Плавное возвращение после снятия выбора */
.category-btn:not(.active) {
  transform: scale(1);
}
</style>

