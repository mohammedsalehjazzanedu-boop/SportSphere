<template>
  <div class="md:mx-24 md:pb-20">
    <VideoComponent v-if="matchId" :matchId="matchId" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const matchId = computed(() => {
  const id = parseInt(route.query.matchId as string);
  return !isNaN(id) ? id : null;
});
</script>

<style>

</style>