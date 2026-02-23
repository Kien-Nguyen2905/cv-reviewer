<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  state: string;
  insightData: any | null;
  errorMessage: string | null;
}>();

const emit = defineEmits(["reset"]);

const isProcessing = computed(() =>
  ["uploading", "analyzing"].includes(props.state),
);
</script>

<template>
  <div class="relative h-full">
    <!-- Empty State -->
    <div
      v-if="props.state === 'idle'"
      class="bg-white rounded-2xl shadow-lg p-12 text-center h-full flex flex-col items-center justify-center"
    >
      <svg
        class="w-24 h-24 mb-4 text-gray-300"
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
      <h3 class="mb-2 text-xl font-semibold text-gray-400">
        Results will be displayed here
      </h3>
      <p class="text-gray-400">Upload CV to start analysis</p>
      <div class="max-w-md mt-6 text-left">
        <p class="mb-2 text-sm text-gray-500">You will receive:</p>
        <ul class="space-y-1 text-sm text-gray-600">
          <li>
            • <strong>Evidence</strong>: Evidence from your CV (strengths and
            weaknesses)
          </li>
          <li>
            • <strong>Insight</strong>: AI explanation and improvement
            suggestions
          </li>
        </ul>
      </div>
      <p class="text-xs text-gray-500 leading-relaxed pt-5">
        Website analyzes whether your CV contains sufficient, concrete evidence
        to persuade recruiters. It identifies exactly where content needs
        clarification, expansion, or rewriting.
      </p>
    </div>
    <!-- Error State -->
    <div
      v-if="props.state === 'error'"
      class="bg-white rounded-2xl shadow-lg p-12 text-center h-full flex flex-col items-center justify-center"
    >
      <svg
        class="w-20 h-20 mb-4 text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        />
      </svg>

      <h3 class="mb-2 text-xl font-semibold text-red-600">Analysis failed</h3>

      <p class="max-w-md mb-6 text-sm text-gray-600">
        {{ props.errorMessage || "Not enough data to confirm system error" }}
      </p>

      <button
        @click="emit('reset')"
        class="px-6 py-3 font-medium text-white transition bg-red-500 rounded-lg hover:bg-red-600"
      >
        Try again
      </button>
    </div>
    <!-- Processing placeholder -->
    <div
      v-if="isProcessing"
      class="bg-white rounded-2xl shadow-lg p-8 h-full space-y-6"
    >
      <div class="space-y-6 animate-pulse">
        <div class="w-3/4 h-8 bg-gray-200 rounded"></div>
        <div class="grid grid-cols-2 gap-4">
          <div class="h-32 bg-gray-100 rounded"></div>
          <div class="h-32 bg-gray-100 rounded"></div>
        </div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="w-5/6 h-4 bg-gray-200 rounded"></div>
          <div class="w-5/6 h-4 bg-gray-200 rounded"></div>
          <div class="w-5/6 h-4 bg-gray-200 rounded"></div>
          <div class="w-4/6 h-4 bg-gray-200 rounded"></div>
          <div class="w-4/6 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
    <!-- Result Display: Top-down layout -->
    <div
      v-if="props.state === 'success' && props.insightData"
      v-motion
      :initial="{ scale: 0.95, opacity: 0 }"
      :enter="{
        scale: 1,
        opacity: 1,
        transition: { duration: 500, ease: 'easeOut' },
      }"
      class="space-y-6"
    >
      <!-- A. Overall Snapshot (Model 2) -->
      <div
        v-motion
        :initial="{ y: -20, opacity: 0 }"
        :enter="{ y: 0, opacity: 1, transition: { delay: 200, duration: 500 } }"
        class="p-6 border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl"
      >
        <h3 class="mb-3 text-lg font-semibold text-gray-900">
          Overall Profile
        </h3>
        <p class="mb-6 leading-relaxed text-gray-700">
          {{ props.insightData.summary.overallProfile }}
        </p>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <!-- Key Strengths -->
          <div class="p-4 border border-green-200 rounded-lg bg-green-50">
            <h4
              class="flex items-center mb-3 text-sm font-semibold text-green-800"
            >
              <span class="mr-2 text-lg">✅</span>
              Strength identification
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(strength, idx) in props.insightData.summary
                  .keyStrengths"
                :key="idx"
                class="text-sm leading-snug text-green-900"
              >
                • {{ strength }}
              </li>
            </ul>
          </div>

          <!-- Main Weaknesses -->
          <div class="p-4 border rounded-lg bg-amber-50 border-amber-200">
            <h4
              class="flex items-center mb-3 text-sm font-semibold text-amber-800"
            >
              <span class="mr-2 text-lg">⚠️</span>
              Weakness identification
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(weakness, idx) in props.insightData.summary
                  .mainWeaknesses"
                :key="idx"
                class="text-sm leading-snug text-amber-900"
              >
                • {{ weakness }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- E. Clarity Issues (Model 2) -->
      <div
        v-motion
        :initial="{ x: -20, opacity: 0 }"
        :enter="{ x: 0, opacity: 1, transition: { delay: 800, duration: 500 } }"
        class="p-6 border border-indigo-200 bg-indigo-50 rounded-xl"
      >
        <h3
          class="flex items-center mb-4 text-lg font-semibold text-indigo-900"
        >
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
          Clarity Issues
        </h3>
        <ul class="space-y-3">
          <li
            v-for="(issue, idx) in props.insightData.clarityIssues"
            :key="idx"
            class="flex items-start gap-3"
          >
            <span class="text-indigo-600 font-bold mt-0.5"
              >{{ (idx as number) + 1 }}.</span
            >
            <span class="text-sm leading-relaxed text-gray-700">{{
              issue
            }}</span>
          </li>
        </ul>
      </div>

      <div class="bg-white border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="text-base font-medium text-gray-900">
            Improvement Suggestions
          </h3>
        </div>

        <div class="p-6">
          <ul class="space-y-6">
            <li
              v-for="(suggestion, idx) in props.insightData
                .improvementSuggestions"
              :key="idx"
              class="flex gap-4"
            >
              <span
                class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white"
              >
                {{ (idx as number) + 1 }}
              </span>

              <div class="flex-1 space-y-3">
                <div
                  class="flex flex-col items-baseline gap-2 px-3 py-2 bg-blue-50 border-l-2 border-blue-500"
                >
                  <span class="text-sm font-medium text-blue-900">{{
                    suggestion.targetType
                  }}</span>
                  <span class="text-sm text-blue-900"
                    >Section: {{ suggestion.target }}</span
                  >
                </div>

                <div class="px-3 py-2 bg-red-50 border-l-2 border-red-500">
                  <p class="text-xs font-medium text-red-700 uppercase mb-1">
                    Issue
                  </p>
                  <p class="text-sm text-red-900 leading-relaxed">
                    {{ suggestion.issue }}
                  </p>
                </div>

                <div class="px-3 py-2 bg-green-50 border-l-2 border-green-500">
                  <p class="text-xs font-medium text-green-700 uppercase mb-1">
                    Recommendation
                  </p>
                  <p class="text-sm text-green-900 leading-relaxed">
                    {{ suggestion.recommendation }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Reset Button -->
      <div class="pt-4">
        <button
          @click="emit('reset')"
          class="w-full px-6 py-3 font-medium text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
        >
          Analyze Another CV
        </button>
      </div>
    </div>
  </div>
</template>
