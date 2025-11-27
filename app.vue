<script setup>
import { useHead } from '@unhead/vue'

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/Icon-Mobarat-02.png' } 
  ]
})
</script>

<template>
  <div class="bg-[#F2F2F2] min-h-screen relative">
    <!-- Header -->
    <div>
      <DesktopNavbar class="hidden md:block" />
      <MobileNavbar class="md:hidden" />
    </div>

    <!-- Main Content -->
    <div class="pb-[200px]">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

    <!-- Footer -->
    <div class="bg-[#F6F6F6] w-full absolute bottom-0">
      <Footer class="hidden md:block"/>
      <MobileFooter class="block md:hidden"/>
    </div>

    
    <!-- <InstallButton /> -->
  </div>
</template>
