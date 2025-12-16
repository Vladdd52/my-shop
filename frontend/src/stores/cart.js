import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { shopApi } from '@/api/shopApi';

export const useCartStore = defineStore('cart', () => {
  const cart = ref({});
  const cartDetails = ref(null);
  const isLoading = ref(false);

  const itemCount = computed(() => {
    return Object.values(cart.value).reduce((sum, qty) => sum + qty, 0);
  });

  const totalPrice = computed(() => {
    return cartDetails.value?.total || 0;
  });

  async function fetchCartDetails() {
    if (Object.keys(cart.value).length === 0) {
      cartDetails.value = null;
      return;
    }

    isLoading.value = true;
    try {
      const data = await shopApi.getCart(cart.value);
      cartDetails.value = data;
    } catch (error) {
      console.error('Error fetching cart details:', error);
    } finally {
      isLoading.value = false;
    }
  }

  // Используем API endpoint для добавления в корзину
  async function addToCart(productId, quantity = 1) {
    try {
      await shopApi.addToCart({
        product_id: productId,
        quantity: quantity,
        cart: cart.value
      });
      
      cart.value[productId] = (cart.value[productId] || 0) + quantity;
      await fetchCartDetails();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  // Используем API endpoint для обновления количества
  async function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      await removeFromCart(productId);
    } else {
      try {
        await shopApi.updateCart({
          product_id: productId,
          quantity: quantity,
          cart: cart.value
        });
        
        cart.value[productId] = quantity;
        await fetchCartDetails();
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }
  }

  // Используем API endpoint для удаления из корзины
  async function removeFromCart(productId) {
    try {
      await shopApi.removeFromCart(productId, { cart: cart.value });
      
      delete cart.value[productId];
      await fetchCartDetails();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }

  function clearCart() {
    cart.value = {};
    cartDetails.value = null;
  }

  return {
    cart,
    cartDetails,
    isLoading,
    itemCount,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCartDetails,
  };
});