<template>
    <Header />
    <div class="container p-4">

        <h1 class="text-4xl  font-bold">
            Home Page
        </h1>



        <div class="my-3">
            <button @click="activateButton = 1" :class="{ 'bg-purple-500': activateButton === 1 }"
                class="mr-3 rounded-md py-2 px-6 shadow-lg">
                Grid
            </button>
            <button @click="activateButton = 2" :class="{ 'bg-purple-500': activateButton === 2 }"
                class="mr-3 rounded-md py-2 px-6 shadow-lg">
                Not Grid
            </button>
        </div>




        <div v-show="activateButton === 1"
            class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="d in data" :key="d.id"
                class=" relative max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105">
                <img class="w-full h-48 object-cover rounded-t-md" :src="d.image" alt="Product Image" />

                <div class="p-4">
                    <h2 class="text-xl font-semibold text-gray-800">{{ d.title }}</h2>
                    <p class="text-gray-600 line-clamp-3 mb-6">{{ d.description }}</p>
                    <p class="text-purple-600 font-semibold   absolute bottom-2 left-2 ">{{ d.price }} $</p>
                    <p @click="addToCart(d)"
                        class="text-purple-600 font-semibold absolute right-2 bottom-2  hover:text-purple-800 hover:scale-105 cursor-pointer ">
                        Add To Cart </p>
                </div>

            </div>
        </div>


        <div v-show="activateButton === 2" class="mt-10 flex flex-col  justify-start gap-4">
            <div v-for="d in data" :key="d.id"
                class="relative flex gap-3 w-full  bg-white rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-[1.01]">
                <img class=" max-w-[150px] h-48 object-cover rounded-t-md" :src="d.image" alt="Product Image" />

                <div class="p-4 w-full">
                    <h2 class="text-xl font-semibold text-gray-800">{{ d.title }}</h2>
                    <p class="text-gray-600 line-clamp-3 mb-6">{{ d.description }}</p>

                    <div class="flex items-center justify-between">

                        <p class="text-purple-600 font-semibold  ">{{ d.price }} $</p>
                        <p @click="addToCart(d)"
                            class="text-purple-600 font-semibold  hover:text-purple-800 hover:scale-105 cursor-pointer ">
                            Add To Cart </p>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';

const { $toast } = useNuxtApp()
let data = ref([])
let SingleData = ref([])
let isLoading = ref(false)
let activateButton = ref(1)
let Cart = ref([])

const bodyBackgroundColor = ref('#fff');

onMounted(() => {
    // Fetch or set the body background color
    bodyBackgroundColor.value = document.body.style.backgroundColor || '#fff';
});

const fetchData = async () => {
    try {
        isLoading.value = true;
        const response = await axios.get(
            `https://fakestoreapi.com/products/category/${useRoute().params.id}`
        );

        if (response.data) {
            data.value = response.data;



        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    } finally {
        isLoading.value = false;
    }
};

const getProducts = async () => {
    await fetchData();
};

onMounted(async () => {
    await getProducts();
});







/////////////////////////////// CART ////////////////////////////////////////

onMounted(() => {
    Cart.value = JSON.parse(localStorage.getItem('Cart') || "[]");
});

watch(Cart, (newValue) => {
    localStorage.setItem('Cart', JSON.stringify(newValue));
}, { deep: true });





function addToCart(product) {
    let exist = false;

    // Check if the product already exists in the cart
    const existingProduct = Cart.value.find(item => item.id === product.id);

    if (existingProduct) {
        $toast.show({
            type: 'success',
            class: 'backToast',
            message: 'محصول در سبد خرید شما موجود است',
            timeout: 600,
        });
     exist = true;

    } else {
        // If the product doesn't exist in the cart, add it
        Cart.value.push({
            id: product.id,
            img: product.image,
            name: product.title,
            desc: product.description,
            price: product.price,
            amount: 1
        });
        $toast.show({
            type: 'success',
            class: 'backToast',
            message: 'محصول به سبد خرید شما اضافه شد '
        });

       
    }


}














</script>

<style lang="scss" scoped></style>