<template>
  <div>
    <header class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex items-center justify-between">
      <div>
        <NuxtLink to="/" class="text-2xl font-bold">Your Shopping Site</NuxtLink>
      </div>

      <div class="lg:hidden">
        <button @click="isMenuOpen = !isMenuOpen" class="text-white focus:outline-none">
          <font-awesome-icon :icon="['fas', 'bars']" class="w-6" />
        </button>
      </div>

      <div class="hidden lg:flex items-center justify-center space-x-4">
        <div v-for="d in data" :key="d">
          <NuxtLink :to="`/category/${d}`">{{ d }}</NuxtLink>
        </div>

        <NuxtLink to="/cart">
          <font-awesome-icon :icon="['fas', 'cart-plus']" class="text-white w-6 hover:scale-95" />
        </NuxtLink>
      
      </div>

      <div v-show="isMenuOpen" class="absolute top-4 left-0 w-full bg-gray-800  z-50 flex flex-col items-center justify-center lg:hidden">
        <button @click="isMenuOpen = false" class="text-white absolute -top-2 right-2 focus:outline-none">
          <font-awesome-icon :icon="['fas', 'times']" class="w-6" />
        </button>
        <div class="flex flex-col items-center space-y-4">
          <div v-for="d in data" :key="d">
            <NuxtLink :to="`/category/${d}`" class="text-white">{{ d }}</NuxtLink>
          </div>

          <NuxtLink to="/cart" class="text-white">
            <font-awesome-icon :icon="['fas', 'cart-plus']" class="w-6 hover:scale-95" />
          </NuxtLink>
        
        </div>
      </div>
    </div>
  </header>
  </div>
</template>

<script setup>
import axios from 'axios';
let data = ref([])
let isLoading = ref(false)
const isMenuOpen = ref(false);

const { $toast } = useNuxtApp()



const fetchData = async () => {
    try {
        isLoading.value = true;
        const response = await axios.get(
            `https://fakestoreapi.com/products/categories
            `
        );

        if (response.data) {
            data.value = response.data;
            console.log(response.data);



        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    } finally {
        isLoading.value = false;
    }
};

const getCategory = async () => {
    await fetchData();
};

onMounted(async () => {
    await getCategory();
});


</script>

<style lang="scss" scoped></style>