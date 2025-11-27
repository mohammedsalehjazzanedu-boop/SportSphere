<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useMatchStore } from '~/stores/match';
import { useViewChannelStore } from '~/stores/viewChannels';
import { storeToRefs } from 'pinia';
import type { Match } from '~/stores/match';

const props = defineProps<{
  matchId: number;
}>();

const activeTab = ref("details");

const tabs = [
  { id: "details", name: "تفاصيل" },
  { id: "lineup", name: "خلاصة الأحداث" },
  { id: "media-2", name: "أخبار الفريق" },
];

const tabs2 = [
  { id: "details", name: "تفاصيل" },
  { id: "lineup1", name: "خلاصة الأحداث" },
  { id: "lineup2", name: "إحصائيات المباراة" },
  { id: "lineup3", name: "تشكيلة" },
  { id: "lineup4", name: "جداول" },
  { id: "media-2", name: "أخبار الفريق" },
];

const matchStore = useMatchStore();
const channelStore = useViewChannelStore();
const { match, loading, error } = storeToRefs(matchStore);


const isChannelLoading = ref(false);

const formatDate = (date: string | null | undefined) => {
  if (!date) return 'غير محدد';
  try {
    return new Date(date).toLocaleDateString('ar-EG', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return 'غير محدد';
  }
};

onMounted(async () => {
  if (props.matchId && !isNaN(props.matchId)) {
    await matchStore.fetchMatchById(props.matchId);
    
   
    if (match.value?.tvChannelId) {
      isChannelLoading.value = true;
      await channelStore.fetchChannelById(match.value.tvChannelId);
      isChannelLoading.value = false;
    }
  }
});
</script>

<template>
  <div dir="rtl" class="mt-2">
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-center p-4">
      {{ error }}
    </div>

    <div v-else-if="match" class="">
      <div class="container mx-auto px-9 py-6">
        <div v-if="isChannelLoading" class="aspect-video bg-black rounded-lg flex items-center justify-center">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
        
        <div v-else-if="match.tvChannelId && channelStore.getStreamUrl" 
             class="aspect-video bg-black rounded-lg overflow-hidden -mx-5 md:-mx-1">
          <video-player
            :src="channelStore.getStreamUrl"
            :drm="channelStore.channel?.sources?.[0]?.drm"
            class="md:w-full md:h-full"
          />
        </div>
        
        <div v-else class="aspect-video bg-black rounded-lg flex items-center justify-center text-white">
          لا يوجد بث متاح لهذه المباراة
        </div>
      </div>

      <div v-if="match.homeTeamLogoUrl" 
           class="hidden md:flex justify-between items-center pt-6 pb-8 rounded-xl mb-5 border border-[#FBBA2D] px-28 mx-14 bg-white">
        <div class="flex flex-col items-center gap-3">
          <img :src="match.homeTeamLogoUrl" alt="" class="h-[82px] w-[82px]" />
          <div class="mt-2">
            <span class="px-1.5 font-bold text-xl bg-[#FFC300] rounded ml-4">
              {{ match.homeScore || 0 }}
            </span>
            <span class="font-medium text-[15px]">{{ match.homeTeamName }}</span>
          </div>
        </div>
        <div class="text-center flex flex-col">
          <div>
            <span class="text-xl font-semibold text-[#49454F]">
              {{ formatDate(match?.startAt) }}
            </span>
          </div>
          <div class="text-4xl mt-2 mb-4 font-extrabold text-[#49454F]">
            {{ match.homeScore || 0 }} - {{ match.awayScore || 0 }}
          </div>
          <div class="text-[15px] text-[#49454F] font-bold">
            <span>{{ match.championshipName }}</span>
            <div class="text-xl text-[#49454F] mt-2">
              <span>{{ match.matchStatusName === 'ended' ? 'FT' : 'VS' }}</span>
            </div>
          </div>
        </div>
    
         <div class="flex flex-col items-center gap-3">
          <img :src="match.awayTeamLogoUrl" alt="" class="h-[82px] w-[82px]" />
          <div class="mt-2">
            <span class="font-medium text-[15px]">{{ match.awayTeamName }}</span>
            <span class="px-1.5 font-bold text-xl bg-[#FFC300] rounded mr-3">
              {{ match.awayScore || 0 }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="flex justify-between items-center pt-1 pb-4 rounded-xl mb-5  bg-white mx-4 md:hidden"
      >
        <div class="flex flex-col items-center gap-3 mr-2 ">
          <div class="flex">
            <img 
              :src="match.awayTeamLogoUrl" 
              alt="" 
              class="mr-3 mt-8 h-[40px] w-[40px]" 
            />
            <span class="px-1 h-7 mt-10 bg-[#FFC300] rounded mr-3">
              {{ match.awayScore || 0 }}
            </span>
          </div>
          <div class="-mt-2">
            <span class="font-medium text-[12px]">{{ match.awayTeamName }}</span>
          </div>
        </div>
        <div class="text-center flex flex-col mr-4">
          <div>
            <span class="text-sm">
              {{ formatDate(match?.startAt) }}
            </span>
          </div>
          <div class="text-2xl font-bold">
            {{ match.homeScore || 0 }} - {{ match.awayScore || 0 }}
          </div>
          <div class="text-[12px] text-[#49454F]">
            <span>{{ match.championshipName }}</span>
            <div class="text-sm text-gray-500">
              <span>{{ match.matchStatusName === 'ended' ? 'FT' : 'VS' }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center gap-3">
          <div class="flex px-5">
            <span class="px-1 h-7 mt-10 bg-[#FFC300] rounded mr-3">
              {{ match.homeScore || 0 }}
            </span>
            <img 
              :src="match.homeTeamLogoUrl" 
              alt="" 
              class="mt-7 mr-4 h-[50px] w-[30px]" 
            />
          </div>
          <div class="-mt-3">
            <span class="font-medium text-[12px]">{{ match.homeTeamName }}</span>
          </div>
        </div>
      </div>

      <div class="hidden md:block conatiner mx-auto px-14 ">
        <div
          class="flex gap-2 border-b mb-4 bg-[#5A418C] py-1 rounded-tr-2xl rounded-tl-2xl pr-5"
        >
          <button
            v-for="tab in tabs2"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-4 ',
              activeTab === tab.id
                ? 'border-b-2 border-white text-[#FFFFFF]'
                : 'text-[#E5E5E5]',
            ]"
          >
            {{ tab.name }}
          </button>
        </div>
        <div
          class="py-4 border-t-0 border-[#E5E5E5] border -mt-4 bg-[bg-[#FFFFFF]]"
        >
          <p class="text-[15px] text-[#49454F] font-bold mr-7">
            معلومات المباراة
          </p>
        </div>

        <div class="border bg-[#FFFFFF]">
          <div class="grid grid-cols-3 gap-8 text-center mt-10 px-36 mb-16">
            <div class="border-l-2 border-[#A8A8B2]">
              <div class="flex justify-center">
                <span
                  ><svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.5 4.25H19.225C19.099 3.128 18.155 2.25 17 2.25H8C6.845 2.25 5.90202 3.128 5.77502 4.25H4.5C3.535 4.25 2.75 5.035 2.75 6V7.65002C2.75 10.196 4.68899 11.471 6.31799 11.702C7.26599 13.863 9.313 15.435 11.75 15.706V17.304C9.812 17.561 8.75 18.847 8.75 21V21.75H16.25V21C16.25 18.847 15.188 17.562 13.25 17.304V15.706C15.686 15.435 17.733 13.863 18.682 11.702C20.311 11.471 22.25 10.196 22.25 7.65002V6C22.25 5.035 21.465 4.25 20.5 4.25ZM4.25 7.65002V6C4.25 5.862 4.362 5.75 4.5 5.75H5.75V9C5.75 9.347 5.78496 9.68598 5.83496 10.019C5.05296 9.69198 4.25 8.98102 4.25 7.65002ZM14.687 20.25H10.314C10.515 19.207 11.201 18.75 12.501 18.75C13.801 18.75 14.485 19.207 14.687 20.25ZM12.5031 14.25C12.5021 14.25 12.501 14.249 12.5 14.249C12.499 14.249 12.4979 14.25 12.4969 14.25C9.60395 14.248 7.25 11.894 7.25 9V4.5C7.25 4.086 7.587 3.75 8 3.75H17C17.413 3.75 17.75 4.086 17.75 4.5V9C17.75 11.894 15.3961 14.248 12.5031 14.25ZM20.75 7.65002C20.75 8.98102 19.947 9.69198 19.165 10.019C19.216 9.68598 19.25 9.347 19.25 9V5.75H20.5C20.638 5.75 20.75 5.862 20.75 6V7.65002Z"
                      fill="#8759F2"
                    />
                  </svg>
                </span>
              </div>
              <div class="text-[#49454F] mt-2 mb-1 font-bold">مسابـقة</div>
              <div v-if="match?.venue" class="font-semibold mt-3 text-[#707070]">
                {{ match.venue }}
              </div>
              <div v-else class="font-semibold mt-3 text-[#707070]">
                غير محدد
              </div>
            </div>
            <div class="border-l-2 border-[#A8A8B2]">
              <span class="flex justify-center"
                ><svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 1.25C6.572 1.25 1.75 6.072 1.75 12C1.75 17.928 6.572 22.75 12.5 22.75C18.428 22.75 23.25 17.928 23.25 12C23.25 6.072 18.428 1.25 12.5 1.25ZM12.5 21.25C7.399 21.25 3.25 17.101 3.25 12C3.25 6.899 7.399 2.75 12.5 2.75C17.601 2.75 21.75 6.899 21.75 12C21.75 17.101 17.601 21.25 12.5 21.25ZM16.03 14.47C16.323 14.763 16.323 15.238 16.03 15.531C15.884 15.677 15.692 15.751 15.5 15.751C15.308 15.751 15.116 15.678 14.97 15.531L11.97 12.531C11.829 12.39 11.75 12.199 11.75 12.001V7.00098C11.75 6.58698 12.086 6.25098 12.5 6.25098C12.914 6.25098 13.25 6.58698 13.25 7.00098V11.6899L16.03 14.47Z"
                    fill="#8759F2"
                  />
                </svg>
              </span>
              <div class="text-[#49454F] mt-2 mb-1 font-bold">انطـلاق</div>
              <div class="font-semibold mt-2 text-[#707070]">
                {{ formatDate(match?.startAt) }}
              </div>
            </div>
            <div>
              <span class="flex justify-center"
                ><svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 0.25C4.675 0.25 0.75 4.175 0.75 9C0.75 14.118 5.44699 17.2199 8.55499 19.2729L9.084 19.624C9.21 19.708 9.355 19.75 9.5 19.75C9.645 19.75 9.79 19.708 9.916 19.624L10.445 19.2729C13.553 17.2199 18.25 14.118 18.25 9C18.25 4.175 14.325 0.25 9.5 0.25ZM9.619 18.021L9.5 18.1001L9.381 18.021C6.371 16.033 2.25 13.311 2.25 9C2.25 5.002 5.502 1.75 9.5 1.75C13.498 1.75 16.75 5.002 16.75 9C16.75 13.311 12.628 16.034 9.619 18.021ZM9.5 5.75C7.708 5.75 6.25 7.208 6.25 9C6.25 10.792 7.708 12.25 9.5 12.25C11.292 12.25 12.75 10.792 12.75 9C12.75 7.208 11.292 5.75 9.5 5.75ZM9.5 10.75C8.535 10.75 7.75 9.965 7.75 9C7.75 8.035 8.535 7.25 9.5 7.25C10.465 7.25 11.25 8.035 11.25 9C11.25 9.965 10.465 10.75 9.5 10.75Z"
                    fill="#8759F2"
                  />
                </svg>
              </span>
              <div class="text-[#49454F] mt-2 mb-1 font-bold">مكان</div>
              <div class="font-semibold mt-3 text-[#707070]">
                {{ match?.formation || 'غير محدد' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="hidden md:block mt-6 text-gray-600 text-sm leading-relaxed -mb-14"
      >
        <span class="flex justify-center font-bold text-[#49454F]"
          >وولفرهامبتون ضد نوتنغهام فورست - النتائج المباشرة ومعلومات
          المباراة</span
        >
        <span class="flex justify-center mt-2 text-[#49454F]"
          >أحدث نتائج كرة القدم، التشكيلات والمزيد لمباراة وولفرهامبتون ضد
          نوتنغهام فورست</span
        >
        <span class="flex justify-center mt-1 text-[#49454F]"
          >نتيجتكم المباشرة لمباراة وولفرهامبتون ضد نوتنغهام فورست في الدوري
          الإنجليزي الممتاز من موقع Stadium.com، الذي يغطي نتائج المباريات
          المباشرة لكرة
        </span>
        <span class="flex justify-center mt-1 text-[#49454F]"
          >لقدم والكريكيت والتنس وكرة السلة والهوكي.</span
        >
      </div>
    </div>

    <div v-else class="text-center p-4">
      لا توجد معلومات متاحة عن هذه المباراة
    </div>

    <div class="md:hidden">
      <div class="flex gap-2 border-b mb-4 rounded-tr-2xl rounded-tl-2xl mx-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            ' py-4 px-2',
            activeTab === tab.id
              ? 'border-b-2 border-[#8759F2]  text-[#49454F] font-semibold'
              : 'text-[#49454F]',
          ]"
        >
          {{ tab.name }}
        </button>
      </div>
      <div class="py-4 border-t-0 -mt-4 bg-[bg-[#FFFFFF]]">
        <p class="text-sm text-[#49454F] font-medium mr-6">معلومات المباراة</p>
        <hr class="h-[2.5px] bg-[#E5E5E5] mx-6 mt-4" />
      </div>

      <div class="bg-[#F6F6F6] mx-6 border-[#E5E5E5] ">
        <div class="grid grid-row-3 gap-4 text-center mt-10 px-24 pb-10">
          <div class="">
            <div class="flex justify-center">
              <span
                ><svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5 4.25H19.225C19.099 3.128 18.155 2.25 17 2.25H8C6.845 2.25 5.90202 3.128 5.77502 4.25H4.5C3.535 4.25 2.75 5.035 2.75 6V7.65002C2.75 10.196 4.68899 11.471 6.31799 11.702C7.26599 13.863 9.313 15.435 11.75 15.706V17.304C9.812 17.561 8.75 18.847 8.75 21V21.75H16.25V21C16.25 18.847 15.188 17.562 13.25 17.304V15.706C15.686 15.435 17.733 13.863 18.682 11.702C20.311 11.471 22.25 10.196 22.25 7.65002V6C22.25 5.035 21.465 4.25 20.5 4.25ZM4.25 7.65002V6C4.25 5.862 4.362 5.75 4.5 5.75H5.75V9C5.75 9.347 5.78496 9.68598 5.83496 10.019C5.05296 9.69198 4.25 8.98102 4.25 7.65002ZM14.687 20.25H10.314C10.515 19.207 11.201 18.75 12.501 18.75C13.801 18.75 14.485 19.207 14.687 20.25ZM12.5031 14.25C12.5021 14.25 12.501 14.249 12.5 14.249C12.499 14.249 12.4979 14.25 12.4969 14.25C9.60395 14.248 7.25 11.894 7.25 9V4.5C7.25 4.086 7.587 3.75 8 3.75H17C17.413 3.75 17.75 4.086 17.75 4.5V9C17.75 11.894 15.3961 14.248 12.5031 14.25ZM20.75 7.65002C20.75 8.98102 19.947 9.69198 19.165 10.019C19.216 9.68598 19.25 9.347 19.25 9V5.75H20.5C20.638 5.75 20.75 5.862 20.75 6V7.65002Z"
                    fill="#8759F2"
                  />
                </svg>
              </span>
            </div>
            <div class="text-[#49454F] mt-2 mb-1 text-sm font-bold">
              مسابـقة
            </div>
            <div v-if="match?.venue" class="font-semibold mt-4 mb-4 text-sm text-[#707070]">
              {{ match.venue }}
            </div>
            <hr class="h-[2.5px] bg-[#D8C5FF] mx-12 mt-4" />
          </div>
          <div class="">
            <span class="flex justify-center"
              ><svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 1.25C6.572 1.25 1.75 6.072 1.75 12C1.75 17.928 6.572 22.75 12.5 22.75C18.428 22.75 23.25 17.928 23.25 12C23.25 6.072 18.428 1.25 12.5 1.25ZM12.5 21.25C7.399 21.25 3.25 17.101 3.25 12C3.25 6.899 7.399 2.75 12.5 2.75C17.601 2.75 21.75 6.899 21.75 12C21.75 17.101 17.601 21.25 12.5 21.25ZM16.03 14.47C16.323 14.763 16.323 15.238 16.03 15.531C15.884 15.677 15.692 15.751 15.5 15.751C15.308 15.751 15.116 15.678 14.97 15.531L11.97 12.531C11.829 12.39 11.75 12.199 11.75 12.001V7.00098C11.75 6.58698 12.086 6.25098 12.5 6.25098C12.914 6.25098 13.25 6.58698 13.25 7.00098V11.6899L16.03 14.47Z"
                  fill="#8759F2"
                />
              </svg>
            </span>
            <div class="text-[#49454F] mb-1 mt-2 text-sm font-bold">
              انطـلاق
            </div>
            <div class="font-semibold mt-4 mb-4 text-sm text-[#707070]">
              {{ formatDate(match?.startAt) }}
            </div>
            <hr class="h-[2.5px] bg-[#D8C5FF] mx-12 mt-4" />
          </div>
          <div>
            <span class="flex justify-center"
              ><svg
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 0.25C4.675 0.25 0.75 4.175 0.75 9C0.75 14.118 5.44699 17.2199 8.55499 19.2729L9.084 19.624C9.21 19.708 9.355 19.75 9.5 19.75C9.645 19.75 9.79 19.708 9.916 19.624L10.445 19.2729C13.553 17.2199 18.25 14.118 18.25 9C18.25 4.175 14.325 0.25 9.5 0.25ZM9.619 18.021L9.5 18.1001L9.381 18.021C6.371 16.033 2.25 13.311 2.25 9C2.25 5.002 5.502 1.75 9.5 1.75C13.498 1.75 16.75 5.002 16.75 9C16.75 13.311 12.628 16.034 9.619 18.021ZM9.5 5.75C7.708 5.75 6.25 7.208 6.25 9C6.25 10.792 7.708 12.25 9.5 12.25C11.292 12.25 12.75 10.792 12.75 9C12.75 7.208 11.292 5.75 9.5 5.75ZM9.5 10.75C8.535 10.75 7.75 9.965 7.75 9C7.75 8.035 8.535 7.25 9.5 7.25C10.465 7.25 11.25 8.035 11.25 9C11.25 9.965 10.465 10.75 9.5 10.75Z"
                  fill="#8759F2"
                />
              </svg>
            </span>
            <div class="text-[#49454F] text-sm  mt-2 font-bold">مكـان</div>
            <div class="font-semibold mt-4 text-sm text-[#707070]">
              {{ match?.formation || 'غير محدد' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  direction: rtl;
}

.gradient-border {
  position: relative;
  border: 1px solid transparent;
  background: linear-gradient(#f6f6f6, #f6f6f6) padding-box,
    linear-gradient(to right, #d8c5ff, #9747ff) border-box;
}
.matches-card-border {
  position: relative;
  border: 1px solid transparent;
  background: linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(to right, #ed1c24, #040957) border-box;
}
.matches-card-border-2 {
  position: relative;
  border: 1px solid transparent;
  background: linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(to right, #59a052, #161616) border-box;
}
</style>

