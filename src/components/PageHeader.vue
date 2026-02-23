<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'AI CV Reviewer',
  },
  description: {
    type: String,
    default: 'Upload CV của bạn để nhận phân tích chi tiết',
  },
})
</script>

<template>
  <div class="text-center mb-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ title }}</h1>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>
