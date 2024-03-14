<template>

    <Header />
    <div>

        <h1 class="text-3xl font-bold mb-10">Cart Page</h1>



        <div v-for="d in Cart" :key="d.id"
                class="relative mb-2 flex gap-3 w-full  bg-white rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-[1.01]">
                <img class=" max-w-[150px] h-48 object-cover rounded-t-md" :src="d.img" alt="Product Image" />

                <div class="p-4 w-full shadow-sm">
                    <h2 class="text-xl font-semibold text-gray-800">{{ d.name }}</h2>
                    <p class="text-gray-600 line-clamp-3 mb-6">{{ d.desc }}</p>

                    <div class="flex items-center justify-between">

                        <p class="text-purple-600 font-semibold  ">{{ d.price }} $</p>

                        <div class="flex items-center justify-center gap-5 text-2xl border-black border-2 rounded-sm">
                            <div>
                                <div class="flex items-center justify-center gap-5 border-1 px-1 border-black max-w-max">
                                    <font-awesome-icon :icon="['fas', 'plus']" @click="() => plus(d)"
                                        class="cursor-pointer w-4 hover:text-green2" />
                                    <p class="font-bold select-none">{{ d.amount }}</p>
                                    <font-awesome-icon :icon="['fas', 'trash']" @click="() => minus(d)"
                                        class="cursor-pointer w-4 hover:text-red" />
                                </div>


                            </div>

                        </div>
                       
                    </div>

                </div>
            </div>




            
<div class="flex flex-col w-full  md:basis-[355px] ">

<div class="  font-yekan bg-purple-100 rounded-[10px]  overflow-hidden pt-2 ">
    <h3 class="text-lg font-semibold text-center" >
     Factor
    </h3>



      <div class="  px-6 pt-6  " >
        <div class="border-t-2 border-black"></div>
      <div class="flex items-center justify-between py-3">
          <p>Amount</p>
          <p class="" >{{ totalAmount }} </p>
      </div>
      <div class="flex items-center justify-between py-3">
          <p>Full Price</p>
          <p class=""> {{totalPriceWithAmounts}} $</p>
      </div>
     
     
     </div>

    

    

   

  
  </div>


  


  <NuxtLink  @click="submit()" class="bg-soorati cursor-pointer text-white rounded-[10px] flex justify-center mt-3 py-2 font-yekan  hover:scale-95 transition-transition-3 ">ادامه فرایند خرید</NuxtLink>

 


</div>
   
    </div>


    <div v-if="Cart.length == 0">

        <h1 class="text-3xl text-center font-bold">YOUR CART IS EMPTY ! ! !</h1>

    </div>
</template>

<script setup>

function plus(d) {
    d.amount++;
    localStorage.setItem('Cart', JSON.stringify(Cart.value));

  
}

function minus(d) {
    if (d.amount > 0) {
        d.amount--;
    
        localStorage.setItem('Cart', JSON.stringify(Cart.value));
        if (d.amount === 0) {

            Cart.value = Cart.value.filter((cartItem) => cartItem.id !== d.id);

            localStorage.setItem('Cart', JSON.stringify(Cart.value));
        }
    } 
}






onMounted(() => {

Cart.value = JSON.parse(localStorage.getItem('Cart'));


});

let Cart = ref([])


const totalAmount = computed(() => {
  return Cart.value.reduce((sum, d) => sum + d.amount, 0);
});


const totalPriceWithAmounts = computed(() => {
  const totalPrice = Cart.value.reduce((sum, d) => sum + (d.price * d.amount), 0);
  return totalPrice.toFixed(2); // Round to 2 decimal places
});



</script>

<style lang="scss" scoped>

</style>