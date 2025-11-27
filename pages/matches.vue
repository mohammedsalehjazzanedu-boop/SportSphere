<script setup lang="ts">
import { useMatchesStore } from '~/stores/matches';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const matchesStore = useMatchesStore();
const { groupedMatches, loading, error } = storeToRefs(matchesStore);


const activeDay = ref(0); 


const getDate = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
};


const fetchMatchesForDay = (day: number) => {
  activeDay.value = day;
  matchesStore.fetchMatches(getDate(day));
};


onMounted(async () => {
  await matchesStore.fetchMatches(getDate(0));
});


const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit'
  });
};


const getMatchStatus = (status: string) => {
  switch (status) {
    case 'ended':
      return 'انتهت';
    case 'live':
      return 'جارية الآن';
    default:
      return 'لم تبدأ';
  }
};


const router = useRouter();
const navigateToVideo = (match: Match) => {
  router.push({
    path: '/video',
    query: { matchId: match.id.toString() }
  });
};
</script>

<template>
  <div class="container mx-auto p-4">

    <div class="flex mb-6 justify-center mt-3">
     
      <div class="rounded-full p-[0.75px] bg-gradient-to-l from-[#D8C5FF] to-[#9747FF]">
      
        <div class="md:pl-3 md:pr-5   flex gap-2 rounded-full px-3 md:px-4 bg-[#F6F6F6] py-1">
          <button 
            @click="fetchMatchesForDay(-1)"
            :class="[
              'text-[13px]  my-1   md:text-[15px] md:mx-2 md:px-4 md:py-2 rounded-full transition-colors',
              activeDay === -1 ? 'bg-[#FFFFFF] text-[#631DEE] ' : ''
            ]">
            <span class="px-1" > مباريات الأمس</span>
           
          </button>
          <button 
            @click="fetchMatchesForDay(0)"
            :class="[
              'text-[13px]  my-1  md:text-[15px] md:mx-2 md:px-4 md:py-2 rounded-full transition-colors',
             activeDay === 0 ? 'bg-[#FFFFFF] text-[#631DEE] ' : ''
            ]">
            <span class="px-1" >
              مباريات اليوم
            </span>
            
          </button>
          <button 
            @click="fetchMatchesForDay(1)"
            :class="[
              'text-[13px]  my-1  md:text-[15px] md:mx-2 md:px-4 md:py-2 rounded-full transition-colors',
               activeDay === 1 ? 'bg-[#FFFFFF] text-[#631DEE] ' : ''
            ]">
            <span class="px-1" >
              مباريات الغد
            </span>
          </button>
          <span class="-mr-2 md:mr-0"><date-icon /></span>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
    
    <div v-else-if="error" class="text-red-500 text-center p-4">
      {{ error }}
    </div>
    
    <template v-else>
      
      <div dir="rtl" v-for="(matches, championship) in groupedMatches" 
           :key="championship" 
           class="mb-8">
        <div class="flex items-center gap-2 mr-5">
          <img :src="matches[0]?.championsLogo" 
               :alt="championship"
               class="w-180 h-180 object-contain">
          <h2 class="text-sm md:text-xl font-bold">{{ championship }}</h2>
          <hr class="w-[150px] md:w-3/4 mr-2 mt-4 bg-[#E4E4E2]">
        </div>

        <div class="grid grid-cols-2 gap-4 md:gap-6 md:mx-12 mt-7 mb-12">
          <div v-for="match in matches" 
               :key="match.id"
               class="bg-white rounded-2xl py-6 md:py-8 matches-card-border cursor-pointer"
               @click="navigateToVideo(match)">
            <div class="flex items-center justify-between">
           
              <div class="flex flex-col items-center gap-2 w-1/3">
                <img :src="match.homeTeamLogoUrl" 
                     :alt="match.homeTeamName"
                     class="w-[1500px] h-[120px] object-contain">
                <span class="text-center">{{ match.homeTeamName }}</span>
              </div>

         
              <div class="text-center flex-1">
                <div v-if="match.matchStatusName === 'ended'"
                     class="text-xl font-bold">
                  {{ match.homeScore }} - {{ match.awayScore }}
                </div>
                <div v-else class="text-sm">
                  {{ formatTime(match.startAt) }}
                </div>
                <div class="text-xs mt-1" 
                     :class="{
                       'text-red-500': match.matchStatusName === 'live',
                       'text-gray-500': match.matchStatusName !== 'live'
                     }">
                  {{ getMatchStatus(match.matchStatusName) }}
                </div>
              </div>

           
              <div class="flex flex-col items-center gap-2 w-1/3">
                <img :src="match.awayTeamLogoUrl" 
                     :alt="match.awayTeamName"
                     class="w-[1500px] h-[120px] object-contain">
                <span class="text-center">{{ match.awayTeamName }}</span>
              </div>
            </div>

          
            <!-- <div class="mt-4 text-sm text-gray-600 text-center">
              {{ match.tvChannelName }}
            </div> -->
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<style>
.matches-card-border {
  position: relative;
  border: 1px solid transparent;
  background:
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(to right, #ed1c24, #040957) border-box;
}</style>