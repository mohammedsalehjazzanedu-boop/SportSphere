<template>
  <div class="video-player">
    <video
      ref="videoRef"
      controls
      class="w-full h-full"
    >
      <source :src="props.src" type="application/x-mpegURL">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Hls from 'hls.js'

const props = defineProps<{
  src: string
  drm?: {
    servers: {
      url: string
      type: string
    }
    clearKeys: Record<string, string>
  }
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
let hls: Hls | null = null

onMounted(() => {
  if (videoRef.value && Hls.isSupported()) {
    hls = new Hls({
      xhrSetup: (xhr, url) => {
        // Add any necessary headers or authentication here
      }
    })
    
    hls.loadSource(props.src)
    hls.attachMedia(videoRef.value)
    
    if (props.drm) {
      // Configure DRM here based on your requirements
      // This will depend on your specific DRM implementation
    }
  }
})

onUnmounted(() => {
  if (hls) {
    hls.destroy()
  }
})
</script> 