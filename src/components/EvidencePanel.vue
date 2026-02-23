<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
    // Structure: { strongSkills, mediumSkills, weakClaims, experienceHighlights, missingSignals }
  },
});
</script>

<template>
  <div class="space-y-6">
    <!-- C. Experience Signals -->
    <!-- <div
      v-motion
      :initial="{ x: -20, opacity: 0 }"
      :enter="{ x: 0, opacity: 1, transition: { delay: 600, duration: 500 } }"
      class="p-6 bg-white border border-gray-200 rounded-xl"
    >
      <h3 class="flex items-center mb-4 text-lg font-semibold text-gray-900">
        <svg
          class="w-5 h-5 mr-2 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Experience Signals
      </h3>
      <p class="mb-4 text-sm text-gray-500">Câu nguyên văn từ CV của bạn</p>

      <div v-if="data.experienceHighlights.length > 0" class="space-y-3">
        <div
          v-for="(highlight, idx) in data.experienceHighlights.slice(0, 5)"
          :key="idx"
          class="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
        >
          <svg
            class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          <p class="text-sm leading-relaxed text-gray-700">{{ highlight }}</p>
        </div>
      </div>
      <p v-else class="text-sm italic text-gray-400">
        Không tìm thấy highlight kinh nghiệm
      </p>
    </div> -->

    <!-- D. Gaps & Missing Signals -->
    <!-- <div
      v-motion
      :initial="{ x: -20, opacity: 0 }"
      :enter="{ x: 0, opacity: 1, transition: { delay: 700, duration: 500 } }"
      class="p-6 border bg-amber-50 rounded-xl border-amber-200"
    >
      <h3 class="flex items-center mb-4 text-lg font-semibold text-amber-900">
        <svg
          class="w-5 h-5 mr-2 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        Missing Evidence
      </h3>
      <p class="mb-4 text-sm text-amber-700">CV thiếu các chỉ số quan trọng</p>

      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <span
            class="text-lg"
            :class="
              data.missingSignals.impact ? 'text-red-500' : 'text-green-500'
            "
          >
            {{ data.missingSignals.impact ? "❌" : "✅" }}
          </span>
          <span class="text-sm font-medium text-gray-700"
            >Impact signals (kết quả, ảnh hưởng)</span
          >
        </div>
        <div class="flex items-center gap-2">
          <span
            class="text-lg"
            :class="
              data.missingSignals.metrics ? 'text-red-500' : 'text-green-500'
            "
          >
            {{ data.missingSignals.metrics ? "❌" : "✅" }}
          </span>
          <span class="text-sm font-medium text-gray-700"
            >Metrics (con số, số liệu)</span
          >
        </div>
      </div>
    </div> -->
  </div>
</template>
