<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import FeaturedContantIcon from "./FeaturedContantIcon.vue";

const cards = ref([
  {
    id: 1,
    teamName1: "RAN",
    image1: "/98139bb59b91d3ceefb97744c8b027a0.png",
    teamName2: "CEL",
    image2: "/393648c3570ce6ba6e5846bd5a559155.png",
  },
  {
    id: 2,
    teamName1: "BAR",
    image1: "/98139bb59b91d3ceefb97744c8b027a0.png",
    teamName2: "MAD",
    image2: "/393648c3570ce6ba6e5846bd5a559155.png",
  },
  {
    id: 3,
    teamName1: "CEL",
    image1: "/98139bb59b91d3ceefb97744c8b027a0.png",
    teamName2: "RAN",
    image2: "/393648c3570ce6ba6e5846bd5a559155.png",
  },
  {
    id: 4,
    teamName1: "MAD",
    image1: "/98139bb59b91d3ceefb97744c8b027a0.png",
    teamName2: "BAR",
    image2: "/393648c3570ce6ba6e5846bd5a559155.png",
  },
  {
    id: 5,
    teamName1: "PSG",
    image1: "/98139bb59b91d3ceefb97744c8b027a0.png",
    teamName2: "LYO",
    image2: "/393648c3570ce6ba6e5846bd5a559155.png",
  },
  {
    id: 6,
    teamName1: "MCI",
    image1: "/98139bb59b91d3ceefb97744c8b027a0.png",
    teamName2: "LIV",
    image2: "/393648c3570ce6ba6e5846bd5a559155.png",
  },
  {
    id: 7,
    teamName1: "ARS",
    image1: "/98139bb59b91d3ceefb97744c8b027a0.png",
    teamName2: "CHE",
    image2: "/393648c3570ce6ba6e5846bd5a559155.png",
  },
  {
    id: 8,
    teamName1: "RMA",
    image1: "/98139bb59b91d3ceefb97744c8b027a0.png",
    teamName2: "FCB",
    image2: "/393648c3570ce6ba6e5846bd5a559155.png",
  },
  {
    id: 9,
    teamName1: "JUV",
    image1: "/98139bb59b91d3ceefb97744c8b027a0.png",
    teamName2: "INT",
    image2: "/393648c3570ce6ba6e5846bd5a559155.png",
  },
  {
    id: 10,
    teamName1: "BAY",
    image1: "/98139bb59b91d3ceefb97744c8b027a0.png",
    teamName2: "BVB",
    image2: "/393648c3570ce6ba6e5846bd5a559155.png",
  },
]);

const currentIndex = ref(0);
let autoSlideInterval: NodeJS.Timeout | null = null;
const visibleCards = 3; // عدد البطاقات المرئية في نفس الوقت

// الانتقال للبطاقة التالية (بطاقة واحدة)
const nextCard = () => {
  if (currentIndex.value < cards.value.length - visibleCards) {
    currentIndex.value += 1;
  } else {
    currentIndex.value = 0; // العودة للبداية
  }
  resetAutoSlide();
};

// الانتقال للبطاقة السابقة (بطاقة واحدة)
const previousCard = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  } else {
    currentIndex.value = cards.value.length - visibleCards; // الانتقال للنهاية
  }
  resetAutoSlide();
};

// الحصول على البطاقات المرئية
const getVisibleCards = () => {
  return cards.value.slice(currentIndex.value, currentIndex.value + visibleCards);
};

// بدء التمرير التلقائي
const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextCard();
  }, 4000); // كل 4 ثوان
};

// إيقاف التمرير التلقائي
const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

// إعادة تعيين التمرير التلقائي
const resetAutoSlide = () => {
  stopAutoSlide();
  startAutoSlide();
};

// بدء التمرير التلقائي عند تحميل المكون
onMounted(() => {
  startAutoSlide();
});

// تنظيف عند إلغاء التحميل
onUnmounted(() => {
  stopAutoSlide();
});
</script>

<template>
  <div dir="rtl" class="hidden md:flex items-center mb-6 mr-8 pr-6 mt-10">
   <FeaturedContantIcon />
 

    <h1 class="text-lg md:text-3xl mb-2 mr-4 font-bold text-gray-800 ml-4">
      المحتوى المميز
    </h1>

    <hr class="w-3/4 mt-3" />
  </div>
  <div dir="rtl" class="hidden md:block mr-8 mt-4 relative group">
    <!-- Navigation Buttons -->
    <button
      @click="previousCard"
      :disabled="currentIndex === 0"
      class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#4E24B0] hover:bg-[#5a2fc4] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-3 shadow-lg transition-all opacity-100"
      aria-label="Previous card"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="nextCard"
      :disabled="currentIndex >= cards.length - visibleCards"
      class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#4E24B0] hover:bg-[#5a2fc4] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-3 shadow-lg transition-all opacity-100"
      aria-label="Next card"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
    
    <!-- Cards Container -->
    <div class="flex gap-8 overflow-hidden">
      <div 
        v-for="(card, index) in getVisibleCards()"
        :key="card.id"
        class="grid grid-cols-4 w-[330px] border py-4 px-4 rounded-2xl bg-[#FFFFFF] rounded-l-none flex-shrink-0 transition-all duration-300"
        :class="index === 0 ? 'transform scale-105 shadow-lg' : 'opacity-90'"
      >
        <div class="flex justify-start">
          <h2 class="mt-3 ml-1.5">{{ card.teamName1 }}</h2>
          <img
            :src="card.image1"
            :alt="card.teamName1"
            class="h-[47px] w-[47px]"
          />
        </div>

        <div class="flex justify-center mt-4">
          <span>
            <svg
              width="19"
              height="13"
              viewBox="0 0 19 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.530938 1.12H2.85094L4.73894 10.08H5.45894L7.34694 1.12H9.66694L7.13894 12H3.05894L0.530938 1.12ZM14.3122 12.192C13.7575 12.192 13.1762 12.1387 12.5682 12.032C11.9602 11.9253 11.3575 11.8133 10.7602 11.696L10.9842 9.984C12.4242 10.176 13.5229 10.272 14.2802 10.272C15.3895 10.272 15.9442 9.80267 15.9442 8.864C15.9442 8.55467 15.7895 8.29333 15.4802 8.08C15.1709 7.856 14.6322 7.632 13.8642 7.408C13.2775 7.23733 12.7762 7.056 12.3602 6.864C11.9549 6.672 11.6242 6.448 11.3682 6.192C11.1122 5.936 10.9255 5.64267 10.8082 5.312C10.6909 4.98133 10.6322 4.60267 10.6322 4.176C10.6322 3.09867 10.9629 2.288 11.6242 1.744C12.2855 1.2 13.2349 0.927999 14.4722 0.927999C14.6535 0.927999 14.8455 0.938666 15.0482 0.959999C15.2615 0.970666 15.5015 0.992 15.7682 1.024C16.0349 1.056 16.3442 1.09867 16.6962 1.152C17.0482 1.20533 17.4589 1.27467 17.9282 1.36L17.7522 3.104C17.2402 3.05067 16.7069 2.99733 16.1522 2.944C15.5975 2.88 15.0642 2.848 14.5522 2.848C13.9762 2.848 13.5442 2.93867 13.2562 3.12C12.9789 3.29067 12.8402 3.53067 12.8402 3.84C12.8402 4.11733 12.9415 4.35733 13.1442 4.56C13.3575 4.752 13.6029 4.91733 13.8802 5.056C14.1575 5.19467 14.4402 5.30667 14.7282 5.392C15.0269 5.47733 15.2615 5.552 15.4322 5.616C15.7629 5.73333 16.0882 5.87733 16.4082 6.048C16.7389 6.208 17.0322 6.416 17.2882 6.672C17.5442 6.91733 17.7522 7.22133 17.9122 7.584C18.0722 7.94667 18.1522 8.37867 18.1522 8.88C18.1522 9.40267 18.0615 9.872 17.8802 10.288C17.7095 10.6933 17.4535 11.04 17.1122 11.328C16.7815 11.6053 16.3815 11.8187 15.9122 11.968C15.4429 12.1173 14.9095 12.192 14.3122 12.192Z"
                fill="#877F81"
              />
            </svg>
          </span>
        </div>

        <div class="flex justify-end">
          <img
            :src="card.image2"
            :alt="card.teamName2"
            class="h-[47px] w-[47px]"
          />
          <h2 class="mt-3 mr-1.5">{{ card.teamName2 }}</h2>
        </div>

        <div
          class="flex justify-center bg-[#4E24B0] -my-4 -ml-7 mr-6 rounded-l-2xl"
        >
          <p class="mb-1 flex flex-col justify-center text-[#FFFFFF]">
            <span>اليوم</span>
            <span>16:30</span>
          </p>
        </div>
      </div>
    </div>
    
    <!-- Progress Indicator -->
    <div class="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex items-center gap-2">
      <span class="text-sm text-gray-600">{{ currentIndex + 1 }} / {{ cards.length - visibleCards + 1 }}</span>
      <div class="flex gap-1">
        <div 
          v-for="(card, index) in cards"
          :key="card.id"
          class="h-1 rounded-full transition-all"
          :class="index >= currentIndex && index < currentIndex + visibleCards ? 'bg-[#4E24B0] w-6' : 'bg-gray-300 w-1'"
        />
      </div>
    </div>
  </div>



 

</template>
