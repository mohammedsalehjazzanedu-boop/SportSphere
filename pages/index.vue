<template>
  <div class="shadow-2xl overflow-hidden">
    <!-- Hero Image — نفس الصورة مع تأثير نبض جميل -->
    <div class="hidden md:flex px-8 mt-8">
      <Transition name="fade-scale" mode="out-in">
        <img
          :key="heroKey"
          class="rounded-3xl"
          src="/Home_image.jpg"
          height="1000"
          width="2500"
          alt="Home Banner"
        />
      </Transition>
    </div>

    <div class="container mx-auto px-3 mt-5 md:hidden">
      <Transition name="fade-scale" mode="out-in">
        <img
          :key="heroKey"
          class="rounded-3xl w-full h-[210px] object-cover"
          src="/Home_image.jpg"
          alt="Home Banner Mobile"
        />
      </Transition>
    </div>

    <!-- ✅ Featured Content — مضمون الظهور + تأثير دخول -->
    <div class="container mx-auto px-3 mt-6">
      <Transition
        name="slide-fade-up"
        appear
        @before-enter="onBeforeEnter"
        @enter="onEnter"
      >
        <div v-if="showFeatured" class="hidden md:block">
          <FeaturedContant />
        </div>
      </Transition>

      <Transition
        name="slide-fade-up"
        appear
        @before-enter="onBeforeEnter"
        @enter="onEnter"
      >
        <div v-if="showFeatured" class="block md:hidden">
          <FeaturedContantMobile />
        </div>
      </Transition>
    </div>

    <!-- Live Matches -->
    <div class="container mx-auto px-3 mt-6">
      <Live class="hidden md:block" />
      <LiveMobileSize class="block md:hidden" />
    </div>

    <!-- Best Moments -->
    <div class="container mx-auto px-3 mt-6 border-b-2 border-gray-200 pb-8">
      <Bestmoments />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import FeaturedContant from '@/components/FeaturedContant.vue'
import FeaturedContantMobile from '@/components/FeaturedContantMobile.vue'
import Live from '@/components/Live.vue'
import LiveMobileSize from '@/components/LiveMobileSize.vue'
import Bestmoments from '@/components/Bestmoments.vue'

const heroKey = ref(0)
let heroInterval: ReturnType<typeof setInterval> | null = null
const showFeatured = ref(false)

// تأثير الصورة
const pulseHero = () => heroKey.value += 1

// تأثير Featured
const onBeforeEnter = (el: Element) => {
  const target = el as HTMLElement
  target.style.opacity = '0'
  target.style.transform = 'translateY(24px)'
}

const onEnter = (el: Element, done: () => void) => {
  const target = el as HTMLElement
  const duration = 650
  const ease = (t: number) => t * t * (3 - 2 * t)
  let start: number | null = null
  const animate = (timestamp: number) => {
    if (!start) start = timestamp
    const p = Math.min((timestamp - start) / duration, 1)
    const e = ease(p)
    target.style.opacity = String(e)
    target.style.transform = `translateY(${24 * (1 - e)}px)`
    p < 1 ? requestAnimationFrame(animate) : done()
  }
  requestAnimationFrame(animate)
}

onMounted(() => {
  // 1. بدء تأثير الصورة
  heroInterval = setInterval(pulseHero, 3500)

  // 2. عرض Featured بعد تأخير قصير
  setTimeout(() => {
    showFeatured.value = true
  }, 200)
})

onUnmounted(() => {
  if (heroInterval !== null) {
    clearInterval(heroInterval)
    heroInterval = null
  }
})
</script>

<style scoped>
/* Hero Image Pulse */
.fade-scale-enter-active {
  transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.fade-scale-leave-active {
  transition: opacity 0.5s ease-in, transform 0.5s ease-in;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(1.025);
}
.fade-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.975);
}

/* Featured Fallback Styles (للدعم) */
.slide-fade-up-enter-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>