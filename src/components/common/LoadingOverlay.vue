<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <!-- Spinner -->
      <svg
        aria-hidden="true"
        class="w-10 h-10 text-gray-200 animate-spin fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051..."
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393..."
          fill="currentFill"
        />
      </svg>
      <p class="mt-4 text-white font-medium">Memproses data...</p>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  visible: Boolean
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
