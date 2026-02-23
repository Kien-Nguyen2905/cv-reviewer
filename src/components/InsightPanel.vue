<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
    // Structure: { summary, skillOverview, clarityIssues, improvementSuggestions }
  },
})
</script>

<template>
  <div class="space-y-6">
    <!-- A. Overall CV Snapshot -->
    <div
      v-motion
      :initial="{ y: -20, opacity: 0 }"
      :enter="{ y: 0, opacity: 1, transition: { delay: 200, duration: 500 } }"
      class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
    >
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Overall Profile</h3>
      <p class="text-gray-700 leading-relaxed mb-6">{{ data.summary.overallProfile }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Key Strengths -->
        <div class="bg-green-50 rounded-lg p-4 border border-green-200">
          <h4 class="text-sm font-semibold text-green-800 mb-3 flex items-center">
            <span class="text-lg mr-2">✅</span>
            Key Strengths
          </h4>
          <ul class="space-y-2">
            <li
              v-for="(strength, idx) in data.summary.keyStrengths.slice(0, 4)"
              :key="idx"
              class="text-sm text-green-900 leading-snug"
            >
              • {{ strength }}
            </li>
          </ul>
        </div>

        <!-- Main Weaknesses -->
        <div class="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <h4 class="text-sm font-semibold text-amber-800 mb-3 flex items-center">
            <span class="text-lg mr-2">⚠️</span>
            Main Weaknesses
          </h4>
          <ul class="space-y-2">
            <li
              v-for="(weakness, idx) in data.summary.mainWeaknesses.slice(0, 4)"
              :key="idx"
              class="text-sm text-amber-900 leading-snug"
            >
              • {{ weakness }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- B. Skill Strength Map -->
    <div
      v-motion
      :initial="{ y: -20, opacity: 0 }"
      :enter="{ y: 0, opacity: 1, transition: { delay: 400, duration: 500 } }"
      class="bg-white rounded-xl p-6 border border-gray-200"
    >
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Skill Strength Map</h3>
      <p class="text-sm text-gray-500 mb-4">Dựa trên mức độ chứng minh trong CV</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Strong Skills -->
        <div>
          <h4 class="text-xs font-semibold text-green-700 mb-3 uppercase tracking-wide">Strong</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in data.skillOverview.strong"
              :key="skill"
              class="px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-full border border-green-300"
            >
              {{ skill }}
            </span>
          </div>
          <p
            v-if="data.skillOverview.strong.length === 0"
            class="text-xs text-gray-400 italic mt-2"
          >
            Chưa có
          </p>
        </div>

        <!-- Medium Skills -->
        <div>
          <h4 class="text-xs font-semibold text-blue-700 mb-3 uppercase tracking-wide">Medium</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in data.skillOverview.medium"
              :key="skill"
              class="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-full border border-blue-300"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- Weak/Claims -->
        <div>
          <h4 class="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            Weak / Claim
          </h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in data.skillOverview.weak.slice(0, 8)"
              :key="skill"
              class="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full border border-gray-300 opacity-75"
              :title="`${skill}: self-claim / weak evidence`"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- E. Improvement Suggestions -->
    <div
      v-motion
      :initial="{ x: -20, opacity: 0 }"
      :enter="{ x: 0, opacity: 1, transition: { delay: 800, duration: 500 } }"
      class="bg-indigo-50 rounded-xl p-6 border border-indigo-200"
    >
      <h3 class="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
        <svg
          class="w-5 h-5 mr-2 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        Improvement Suggestions
      </h3>
      <p class="text-sm text-indigo-700 mb-4">Hướng dẫn cải thiện CV (không copy nguyên văn)</p>

      <ul class="space-y-3">
        <li
          v-for="(suggestion, idx) in data.improvementSuggestions.slice(0, 5)"
          :key="idx"
          class="flex items-start gap-3"
        >
          <span class="text-indigo-600 font-bold mt-0.5">{{ idx || 0 + 1 }}.</span>
          <span class="text-sm text-gray-700 leading-relaxed">{{ suggestion }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
