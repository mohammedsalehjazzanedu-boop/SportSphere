<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="viewChannelStore.loading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="viewChannelStore.error" class="text-center text-red-600 p-4">
      {{ viewChannelStore.error }}
    </div>

    <!-- Channel Content -->
    <div v-else-if="viewChannelStore.channel" class="space-y-8">
      <!-- Channel Header -->
      <div class="flex justify-center items-center space-x-4 rtl:space-x-reverse">
        <!-- <img :src="viewChannelStore.channel.logo" :alt="viewChannelStore.channel.name" 
             class="w-24 h-24 object-contain"> -->
            
        <h1 class="text-xl md:text-3xl md:mt-3 font-bold text-center -mb-3 md:mb-0">{{ viewChannelStore.channel.name }}مشاهدة البث المباشر قناة</h1>
      
      </div>
 
  <!-- Server Selection -->
  <div v-if="viewChannelStore.channel?.sources?.length > 1" class="flex flex-wrap justify-center gap-2 mb-4">
        <button
          v-for="(source, index) in viewChannelStore.channel.sources"
          :key="index"
          @click="viewChannelStore.setCurrentSource(index)"
          :class="[
            'px-4 py-2 rounded-lg transition-colors',
            viewChannelStore.currentSourceIndex === index
              ? 'bg-[#631DEE] text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          ]"
        >
          {{ source.title }}
        </button>
      </div>

      <!-- Stream Player -->
      <div v-if="viewChannelStore.getStreamUrl" class="aspect-video bg-black rounded-xl overflow-hidden md:mx-6 ">
        <video-player
        :key="viewChannelStore.currentSourceIndex"
          :src="viewChannelStore.getStreamUrl"

          :drm="getDrmConfig(viewChannelStore.getCurrentDrm)"
          class="w-full h-full"
        />
      </div>

      <!-- Channel Description -->
      <div dir="rtl" class="hidden md:flex px-6 rounded-lg mb-4">
        <img :src="viewChannelStore.channel.logo" :alt="viewChannelStore.channel.name" 
             class="bg-[#FFFFFF] py-10 px-4 rounded-lg">
        <p class="text-[#1D1C20] mr-4 mt-8 leading-loose">{{ viewChannelStore.channel.description }}</p>
      </div>
      <div dir="rtl" class="md:hidden pt-5 px-1 rounded-lg mb-4">
        <div class="flow-root">
          <img :src="viewChannelStore.channel.logo" 
               :alt="viewChannelStore.channel.name" 
               class="float-right bg-[#FFFFFF] py-4 px-3 rounded-lg h-[80px]  ml-4 mb-1.5">
          <p class="text-[#1D1C20] leading-[1.8] text-justify text-base whitespace-pre-line">
            {{ viewChannelStore.channel.description }}
          </p>
        </div>
      </div>

      <!-- Frequency Table -->
  

      <div class="grid md:flex justify-between md:px-6">
        <div class="grid grid-cols-1  ">
        <img :src="viewChannelStore.channel.image1_url" 
             :alt="viewChannelStore.channel.name" 
             class=" h-96 w-[35rem] md:w-[30rem] md:h-80 md:mt-4 object-cover rounded-xl md:rounded-lg">
    
      </div>

      <!-- Tournaments -->
      <div dir="rtl" class="  bg-[white] py-4 md:w-[44rem] mt-4  px-4 rounded-xl shadow-lg md:shadow-lg -mb-4 md:mb-0">
        <h2 class="text-xl font-semibold mb-4">البطولات التي تبث على القناة</h2>
        <ul class="list-disc list-inside space-y-2 mr-2">
          <li v-for="tournament in viewChannelStore.getTournaments" 
              :key="tournament" 
              class="text-gray-700">
            {{ tournament }}
          </li>
        </ul>
      </div>
      
      
      </div>
      <div  class="max-w-md mx-auto   md:hidden">
        <h2 dir="rtl" class="text-lg font-bold text mb-5 py-4">
          تردد قناة beIN Sports HD
        </h2>

        <div class="bg-white rounded-2xl overflow-hidden shadow-lg -mb-8">
          <div class="border-t-4 border-b-0 border-[#9747FF] rounded-t-2xl text-center py-3 text-gray-400">
            beIN Sports HD channel frequency
          </div>

          <table class="w-full text-right border-collapse">
            <thead>
              <tr>
                <th class="border border-gray-300 bg-[#F5F5F5] p-3">القمر الصناعي</th>
                <th class="border border-gray-300 bg-gray-50 p-3">نايل سات</th>
                <th class="border border-gray-300 bg-gray-50 p-3">سهيل سات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 bg-[#F5F5F5] p-3 font-semibold">التردد</td>
                <td class="border border-gray-300 p-3 text-center">11054</td>
                <td class="border border-gray-300 p-3 text-center">11547</td>
              </tr>
              <tr>
                <td class="border border-gray-300 bg-[#F5F5F5] p-3 font-semibold">الاستقطاب</td>
                <td class="border border-gray-300 p-3 text-center">أفقي</td>
                <td class="border border-gray-300 p-3 text-center">عمودي</td>
              </tr>
              <tr>
                <td class="border border-gray-300 bg-[#F5F5F5] p-3 font-semibold">معدل التصحيح</td>
                <td class="border border-gray-300 p-3 text-center">2/3</td>
                <td class="border border-gray-300 p-3 text-center">2/3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div  class="hidden md:block    ">
        <h2 dir="rtl" class="text-xl mr-6 font-bold text mb-5 py-4">
          تردد قناة beIN Sports HD
        </h2>

        <div class="bg-white rounded-2xl overflow-hidden -mb-8 mx-6">
          <div class="border-t-4 border-b-0 border-[#9747FF] rounded-t-2xl text-center py-3 text-gray-400">
            beIN Sports HD channel frequency
          </div>

          <table class="w-full text-right border-collapse">
            <thead>
              <tr>
                <th class="border border-gray-300 bg-[#F5F5F5] text-center p-3">القمر الصناعي</th>
                <th class="border border-gray-300 bg-[#F5F5F5] text-center p-3">التردد </th>
                <th class="border border-gray-300 bg-[#F5F5F5] text-center p-3"> الاستقطاب</th>
                <th class="border border-gray-300 bg-[#F5F5F5] text-center p-3"> معدل التصحیح</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 bg-[#FFFFFF] p-3 text-center font-semibold">نايل سات</td>
                <td class="border border-gray-300 bg-[#FFFFFF] p-3 text-center">11054</td>
                <td class="border border-gray-300 bg-[#FFFFFF] p-3 text-center">أفقي</td>
                <td class="border border-gray-300 bg-[#FFFFFF] p-3 text-center">2/3</td>
              </tr>
              <tr>
                <td class="border border-gray-300 bg-[#FFFFFF] p-3 text-center font-semibold">سهیل سات</td>
                <td class="border border-gray-300 bg-[#FFFFFF] p-3 text-center">11547</td>
                <td class="border border-gray-300 bg-[#FFFFFF] p-3 text-center">عمودي</td>
                <td class="border border-gray-300 bg-[#FFFFFF] p-3 text-center">2/3</td>
              </tr>
          
            </tbody>
          </table>
        </div>
      </div>
     <div dir="rtl" class="   pt-16 md:px-6 ">
       <p class="text-gray-600 leading-relaxed space-y-4">
         <span class="block -mb-4 text-justify">
           تتميز قناة beIN Sports HD بتقديم خدمة مشاهدة عبر الإنترنت من خلال منصة beIN CONNECT، والتي تتيح للمشتركين مشاهدة المباريات والبث المباشر بجودة عالية على الأجهزة المحمولة وأجهزة الكمبيوتر.
         </span>
         
         <span class="block -mb-4 text-justify">
           كما تقدم القناة استوديوهات تحليلية قبل وبعد المباريات، مع تغطية شاملة وتحليلات معمقة من قبل محللين رياضيين محترفين.
         </span>
         
         <span class="block text-justify -mt-4 ">
           وبهذا، تظل beIN Sports HD الخيار الأمثل لمتابعي الرياضة الذين يبحثون عن تجربة مشاهدة مميزة وتغطية رياضية متكاملة.
         </span>
       </p>
     </div>
  
    </div>
  </div>
</template>


<script setup lang="ts">
import { useViewChannelStore } from '~/stores/viewChannels'

const route = useRoute()
const viewChannelStore = useViewChannelStore()

// Fetch channel data when component mounts
onMounted(async () => {
  const channelId = parseInt(route.params.id as string)
  if (!isNaN(channelId)) {
    await viewChannelStore.fetchChannelById(channelId)
  }
})

// Clean up when component unmounts
onUnmounted(() => {
  viewChannelStore.clearChannel()
})

// Helper function to format DRM config
const getDrmConfig = (drm: any) => {
  if (!drm) return undefined;
  return {
    servers: drm.servers || { url: '', type: '' },
    clearKeys: drm.clearKeys || {}
  };
};
</script>
