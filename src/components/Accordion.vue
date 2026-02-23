<template>
  <div class="overflow-hidden border rounded-lg">
    <button
      class="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-left transition-colors hover:bg-gray-50"
      :class="headerClass"
      @click="open = !open"
    >
      <div class="flex flex-col space-y-1 text-left">
        <span>{{ title }}</span>
        <span class="text-xs font-normal opacity-70">{{ des }}</span>
      </div>
      <span
        class="text-lg transition-transform duration-300 ease-out"
        :class="{ 'rotate-180': open }"
      >
        ⌄
      </span>
    </button>

    <div
      ref="contentWrapper"
      class="overflow-hidden transition-all duration-300 ease-out"
      :style="{ height: contentHeight }"
    >
      <div ref="content" class="px-4 py-3 bg-white">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from "vue";

defineProps<{
  title: string;
  des: string;
  headerClass?: string;
}>();

const open = ref(false);
const content = ref<HTMLElement | null>(null);
const contentWrapper = ref<HTMLElement | null>(null);

const contentHeight = computed(() => {
  return open.value ? `${content.value?.scrollHeight || 0}px` : "0px";
});

// Cập nhật height khi content thay đổi
watch(open, async () => {
  await nextTick();
  // Force reflow để animation hoạt động mượt
  if (contentWrapper.value) {
    contentWrapper.value.offsetHeight;
  }
});

// Handle resize observer để cập nhật height khi nội dung thay đổi
onMounted(() => {
  if (!content.value) return;

  const resizeObserver = new ResizeObserver(() => {
    if (open.value && contentWrapper.value && content.value) {
      contentWrapper.value.style.height = `${content.value.scrollHeight}px`;
    }
  });

  resizeObserver.observe(content.value);

  return () => resizeObserver.disconnect();
});
</script>

<style scoped>
/* Smooth transition cho tất cả thuộc tính */
.transition-all {
  transition-property: height, opacity;
}

/* Custom easing cho chuyển động tự nhiên hơn */
.ease-out {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
