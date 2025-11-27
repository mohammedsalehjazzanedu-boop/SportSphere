<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <header class="pt-4 pb-1 relative z-10">
    <div class=" flex items-center justify-between bg-[#FFFFFF]   border border-[#F6F6F6] py-2  mx-8 rounded-full   ">
      <div class="ml-20">
        <Logo />
      </div>
      
      <nav dir="">
        <ul class="flex space-x-7 text-[15px] font-semibold mr-5 mt-5">
    
          <!-- <li class="relative">
            <NuxtLink
              to="/video"
              :class="{
                'text-[#631DEE] border-b-2 border-[#631DEE] pb-4': route.path === '/video',
                'text-[#0F161E]': route.path !== '/video'
              }"
            >
              فيديو
            </NuxtLink>
          </li> -->
          <li class="relative">
            <NuxtLink
              to="/news"
              :class="{
                'text-[#631DEE] border-b-2 border-[#631DEE] pb-4': route.path === '/news',
                'text-[#0F161E]': route.path !== '/news'
              }"
            >
            آخر الأخبار
            </NuxtLink>
          </li>
          <li class="relative">
            <NuxtLink
              to="/channels"
              :class="{
                'text-[#631DEE] border-b-2 border-[#631DEE] pb-4': route.path === '/channels',
                'text-[#0F161E]': route.path !== '/channels'
              }"
            >
              البث المباشر
            </NuxtLink>
          </li>
          <li class="relative">
            <NuxtLink
              to="/matches"
              :class="{
                'text-[#631DEE] border-b-2 border-[#631DEE] pb-4': route.path === '/matches',
                'text-[#0F161E]': route.path !== '/matches'
              }"
            >
              مباريات
            </NuxtLink>
          </li>
          <li class="relative">
            <NuxtLink
              to="/"
              :class="{
                'text-[#631DEE] border-b-2 border-[#631DEE] pb-4': route.path === '/' || route.path === '',
                'text-[#0F161E]': route.path !== '/' && route.path !== ''
              }"
            >
              الرئيسية
            </NuxtLink>
          </li>
          <!-- <li class="relative">
            <NuxtLink
              to="/"
              :class="{
                'text-[#631DEE] border-b-2 border-[#631DEE] pb-4': route.path === '/',
                'text-[#0F161E]': route.path !== '/'
              }"
            >
              جدول البث
            </NuxtLink>
          </li> -->
        </ul>
      </nav>
      <div class="mr-10">
        <DesktopNavIcons />
      </div>
   
    </div>
  </header>
</template>
