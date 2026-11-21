<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm" v-if="visible">
    <div
      class="animate-spin inline-block w-12 h-12 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
      role="status" aria-label="loading"></div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean
})
</script>
