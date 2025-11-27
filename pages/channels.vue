<script setup lang="ts">
import { useChannelsStore } from "@/stores/channels";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useChannelsStore();
const router = useRouter();

onMounted(() => {
  store.fetchChannels();
});

const navigateToChannel = (channelId: number) => {
  router.push(`/channel/${channelId}`);
};
</script>

<template>
  <div class="container mx-auto px-6  pb-5 md:pb-10">
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-3xl md:text-5xl mt-8 font-bold  text-right mb-3 md:mb-8">
        <!-- {{ $t(' Live_broadcast_channels') }} -->
        قنوات البث المباشر
      </h1>
      <p class="text-[12px] md:text-[15px] text-gray-500 text-right mb-14 ">
        <!-- {{ $t('Channels_Title') }}   -->
        .شاهد مباريات كرة القدم مباشرة و أبرز اللقطات على القنوات المتدفقة
      </p>
    </div>

    <div v-if="store.loading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>

    <p v-if="store.error" class="text-red-500">{{ store.error }}</p>

    <div dir="rtl" v-if="!store.loading && !store.error"  class=" bg-[#F6F6F6]  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 px-3 md:px-8 pt-10 md:pt-16 pb-14  mb-24 relative  p-6 rounded-lg shadow-xl shadow-violet-100 "
     >
      <div dir="rtl" v-for="channel in store.channels" 
           :key="channel.id" 
           class=""
           @click="navigateToChannel(channel.id)">

         <div
         dir=""
        class="rounded-lg shadow-md overflow-hidden transition-shadow duration-300"
        style="background: linear-gradient(to bottom, #FBFBFC, #DBDBDB)"
      >
        <div class="p-4">
          <img
            :src="channel.logo"
            :alt="channel.name"
            class="w-full h-15 object-contain mb-4"
          />
          <div class="text-center">
            <h3 class="text-base font-semibold text-gray-800 mb-6">
              {{ channel.name }}
            </h3>
            <button
              class="bg-[#B1000F] text-white px-8  md:px-10 py-1.5 rounded text-sm -mr-1 -mb-5"
            >
              <span class="px-4 md:px-4"> مباشر</span>
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>