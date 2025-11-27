<template>
  <!-- <button
    v-if="showInstallButton"
    @click="installPWA"
    class="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 z-50"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
    </svg>
    تثبيت التطبيق
  </button> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showInstallButton = ref(true)
let deferredPrompt: any = null

const checkIfAppIsInstalled = () => {
  // Check if the app is running in standalone mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    showInstallButton.value = false
    return
  }

  // Check if the app is installed on Android
  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    showInstallButton.value = false
    return
  }
}

onMounted(() => {
  // Check installation status immediately
  checkIfAppIsInstalled()

  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    showInstallButton.value = true
  })

  // Listen for the appinstalled event
  window.addEventListener('appinstalled', () => {
    showInstallButton.value = false
    deferredPrompt = null
  })

  // Check installation status periodically
  setInterval(checkIfAppIsInstalled, 2000)
})

const installPWA = async () => {
  try {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt()
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
        showInstallButton.value = false
      } else {
        console.log('User dismissed the install prompt')
      }
      
      // Clear the deferredPrompt variable
      deferredPrompt = null
    } else {
      // Handle different platforms
      const userAgent = window.navigator.userAgent.toLowerCase()
      
      if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        alert('لتثبيت التطبيق على iOS:\n1. اضغط على زر المشاركة (Share) في أسفل المتصفح\n2. اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen)\n3. اضغط على "إضافة" (Add)')
      } else if (userAgent.includes('android')) {
        alert('لتثبيت التطبيق على Android:\n1. اضغط على النقاط الثلاث (⋮) في أعلى المتصفح\n2. اختر "تثبيت التطبيق" (Install App)\n3. اضغط على "تثبيت" (Install)')
      } else if (userAgent.includes('chrome')) {
        alert('لتثبيت التطبيق على Chrome:\n1. اضغط على النقاط الثلاث (⋮) في أعلى المتصفح\n2. اختر "تثبيت التطبيق" (Install App)\n3. اضغط على "تثبيت" (Install)')
      } else if (userAgent.includes('firefox')) {
        alert('لتثبيت التطبيق على Firefox:\n1. اضغط على النقاط الثلاث (⋮) في أعلى المتصفح\n2. اختر "تثبيت" (Install)\n3. اضغط على "تثبيت" (Install)')
      } else if (userAgent.includes('safari')) {
        alert('لتثبيت التطبيق على Safari:\n1. اضغط على زر المشاركة (Share) في أعلى المتصفح\n2. اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen)\n3. اضغط على "إضافة" (Add)')
      } else {
        alert('لتثبيت التطبيق:\n1. ابحث عن خيار "تثبيت التطبيق" في قائمة المتصفح\n2. اتبع التعليمات التي تظهر على الشاشة')
      }
    }
  } catch (error) {
    console.error('Error during installation:', error)
    alert('حدث خطأ أثناء محاولة تثبيت التطبيق. يرجى المحاولة مرة أخرى.')
  }
}
</script> 