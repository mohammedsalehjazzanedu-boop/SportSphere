<script setup lang="ts">
import Logo from './Logo.vue';



</script>

<template>
    <div class="-mb-10" dir="rtl">
        <footer class="hidden md:block bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-14">
        <div class="max-w-7xl mx-auto flex flex-row md:flex-row justify-between items-ceer">
  
  
  <div>
    <div class="flex -mr-10">
  
      <Instgram/>
      <span class="mr-6"> <facebook/></span>
      <span class="mr-6 mt-1"> <x-icon/></span>
  
  
  
  
    </div>
    <ul class="flex space-x-6 mt-4 md:mt-3 -mr-10">
      <li><a href="#" class="text-[12px] ml-6 ">شروط الاستخدام</a></li>
      <li><a href="#" class="text-[12px]">خريطة الموقع</a></li>
      <li><a href="#" class="text-[12px]">سياسة الخصوصية</a></li>
      <li><a href="#" class="text-[12px]">اتصال</a></li>
      <li><a href="#" class="text-[12px]">عننا</a></li>
    </ul>
    <div class="flex space-x-4 mt-4 md:mt-0">
      <a href="#"><i class="fab fa-twitter text-lg"></i></a>
      <a href="#"><i class="fab fa-facebook text-lg"></i></a>
      <a href="#"><i class="fab fa-instagram text-lg"></i></a>
    </div>
  
  </div>
          <div class="text-center -ml-6">
          <FooterLogo/>
          </div>
  
      </div>
    </footer>
    </div>
  
  </template>