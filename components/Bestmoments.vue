<script setup lang="ts">
import { ref } from "vue";

const cardMatch = [
  { id: 1, image: "98139bb59b91d3ceefb97744c8b027a0.png" },
  { id: 2, image: "98139bb59b91d3ceefb97744c8b027a0.png" },
  { id: 3, image: "98139bb59b91d3ceefb97744c8b027a0.png" },
  { id: 4, image: "98139bb59b91d3ceefb97744c8b027a0.png" },
];
const cardMatchs = [{ id: 1, image: "98139bb59b91d3ceefb97744c8b027a0.png" }];
</script>

<template>
  <div class="mt-8 md:mt-12">
    <div dir="rtl" class="hidden md:flex items-center mb-6 mr-8 mt-16">
      <BestmomentsIcon />
      <h1 class="text-2xl md:text-3xl mb-2 font-bold text-gray-800 mr-4">
        أفضل اللحظات
      </h1>
    </div>
    <div dir="rtl" class="flex mr-3 mt-8 md:hidden">
      <MobileBestmomentsIcon />
      <h1 class="text-xl font-bold mt-2 mr-1">أفضل اللحظات</h1>
    </div>
    <div dir="rtl" class="grid grid-cols-5 gap-4 mr-7 mt-2">
      <div
        v-for="card in cardMatch"
        :key="card.id"
        class="hidden md:grid grid-cols-3 mb-12 py-20 px-4 rounded-xl"
        :style="{
          backgroundImage: `url('cb8fbb211d69c9a98c7645fbeaa36029.png')`,
          backgroundSize: '120% auto',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }"
      ></div>
    </div>
    
    <div dir="rtl" class="flex justify-center mr-">
      <div
        v-for="card in cardMatchs"
        :key="card.id"
        class="w-[370px] h-[220px] rounded-3xl overflow-hidden flex items-center justify-center md:hidden"
        :style="{
          backgroundImage: `url('cb8fbb211d69c9a98c7645fbeaa36029.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }"
      ></div>
    </div>
    <hr class="border-[#F2F2F2] mb-8" />
  </div>
</template>
