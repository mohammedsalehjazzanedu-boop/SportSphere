<template>
  <div class="container mx-auto px-4 py-8 bg-[#F6F6F6]">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center h-64 hover: ">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8759F2]"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-600 p-4">
      <p>حدث خطأ في تحميل الأخبار. يرجى المحاولة مرة أخرى لاحقاً.</p>
    </div>

    <!-- News Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div 
        v-for="item in news" 
        :key="item.id" 
        class="bg-white rounded-lg overflow-hidden transition-all duration-300 cursor-pointer transform hover:scale-105 group"
        @click="openNewsModal(item)"
      >
        <!-- Card Container -->
        <div class="flex flex-row sm:flex-col h-full">
          <!-- Image Container -->
          <div class="relative w-1/3 sm:w-full sm:h-52 h-28">
            <img 
              v-if="item.poster" 
              :src="item.poster" 
              :alt="item.title" 
              class="w-full h-full object-cover"
            >
          </div>
          
          <!-- Content -->
          <div class="flex-1 p-3 sm:p-6 text-right" dir="rtl">
            <h2 class="text-base sm:text-xl font-bold mb-2 sm:mb-3 text-[#5A418C] line-clamp-2">{{ item.title }}</h2>
            <p class="text-gray-600 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3 text-sm leading-relaxed mt-3">{{ item.teaser }}</p>
            <div class="flex justify-end items-center border-t border-[#F6F6F6] pt-2 sm:pt-4 mt-1 sm:mt-2">
             
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- News Modal -->
    <Transition name="modal">
      <div v-if="selectedNews" class="fixed inset-0 z-50 overflow-hidden" @click="closeModal">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        
        <div class="fixed inset-0 flex items-center justify-center p-4">
          <div 
            class="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar -2xl transform transition-all"
            @click.stop
          >
            <!-- Sticky Header with Close Button -->
            <div class="sticky top-0 z-50 pointer-events-none">
              <button 
                @click="closeModal" 
                class="absolute top-4 left-4 bg-white/60 backdrop-blur rounded-full p-2.5 hover:bg-[#8759F2]/10 transition-colors pointer-events-auto "
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- All Content Container -->
            <div class="relative">
              <!-- Hero Image with Overlay Title -->
              <div class="relative w-full h-[50vh]">
                <img 
                  v-if="selectedNews.poster" 
                  :src="selectedNews.poster" 
                  :alt="selectedNews.title" 
                  class="w-full h-full object-cover"
                >
                <!-- Title Overlay -->
                
                <div class="absolute bottom-0 right-0 left-0 p-6 text-right" dir="rtl">
                  <h1 class="text-3xl font-bold text-gray-200 mb-2 leading-tight">{{ selectedNews.title }}</h1>
                  <p class="text-[#F6F6F6]/90">{{ formatDate(selectedNews.publication_date) }}</p>
                </div>
              </div>

              <!-- News Content -->
              <div class="p-8 text-right bg-white" dir="rtl">
                <!-- Subtitle -->
                <h2 v-if="selectedNews.subtitle" class="text-xl font-semibold text-[#5A418C] mb-8 leading-relaxed">
                  {{ selectedNews.subtitle }}
                </h2>

                <!-- Teaser -->
                <p class="text-lg text-[#5A418C]/80 mb-8 leading-relaxed font-semibold">
                  {{ selectedNews.teaser }}
                </p>

                <!-- Body -->
                <div class="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6 whitespace-pre-line">
                  {{ selectedNews.body }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const loading = ref(true)
const error = ref(null)
const news = ref([])
const selectedNews = ref(null)

onMounted(async () => {
  try {
    const { data: newsData } = await useFetch('/news.json')
    if (newsData.value) {
      news.value = newsData.value
    }
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
})

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString('ar-SA', options)
}

const openNewsModal = (newsItem) => {
  selectedNews.value = newsItem
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedNews.value = null
  document.body.style.overflow = 'auto'
}

onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && selectedNews.value) {
      closeModal()
    }
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #F7FAFC;
  scroll-behavior: smooth;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #F6F6F6;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #8759F2;
  opacity: 0.3;
  border-radius: 4px;
  border: 2px solid #F6F6F6;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #5A418C;
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* تحسين التأثيرات الحركية */
.transform {
  transition: all 0.3s ease;
}

/* تخصيص ألوان النص */
.prose {
  color: #5A418C;
}

.prose p {
  color: #5A418C;
  opacity: 0.8;
}

/* تحسين المظهر في الموبايل */
@media (max-width: 640px) {
  .line-clamp-2 {
    -webkit-line-clamp: 2;
    max-height: 2.5em;
  }
  
  .line-clamp-3 {
    -webkit-line-clamp: 2;
    max-height: 2.5em;
  }
}
</style> 