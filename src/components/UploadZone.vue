<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  state: string;
  fileName: string | null;
  fileType: string | null;
  progress: number;
  previewUrl: string;
}>();

const emit = defineEmits(["file-selected", "reset"]);

const isProcessing = computed(() =>
  ["uploading", "analyzing"].includes(props.state),
);
const showPreview = computed(
  () => props.state === "success" && props.previewUrl,
);

const handleFileSelect = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) emit("file-selected", file);
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const file = event.dataTransfer?.files?.[0];
  if (file) emit("file-selected", file);
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};
</script>

<template>
  <div class="h-full">
    <!-- Preview Mode (Success State) -->
    <div
      v-if="showPreview"
      v-motion
      :initial="{ opacity: 0, scale: 0.95 }"
      :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }"
      class="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
    >
      <!-- Preview Header -->
      <div
        class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <svg
            class="w-6 h-6 text-white"
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
          <div>
            <h3 class="text-white font-semibold text-sm">CV Preview</h3>
            <p class="text-blue-100 text-xs truncate max-w-[200px]">
              {{ fileName }}
            </p>
          </div>
        </div>
      </div>

      <!-- Preview Content -->
      <div class="flex-1 overflow-hidden bg-gray-100">
        <!-- PDF Preview -->
        <iframe
          v-if="fileType === 'pdf'"
          :src="previewUrl"
          class="w-full h-full border-0"
          title="CV Preview"
        />

        <!-- DOCX Preview (fallback message) -->
        <div
          v-else-if="fileType === 'docx' || fileType === 'doc'"
          class="w-full h-full flex items-center justify-center p-8 text-center"
        >
          <div>
            <svg
              class="w-20 h-20 text-blue-500 mx-auto mb-4"
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
            <h4 class="text-lg font-semibold text-gray-700 mb-2">
              DOCX File Uploaded
            </h4>
            <p class="text-sm text-gray-500 mb-4">{{ fileName }}</p>
            <p class="text-xs text-gray-400 max-w-xs mx-auto">
              Preview not available for DOCX files.
            </p>
            <a
              :href="previewUrl"
              :download="fileName"
              class="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Download file
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload/Processing States -->
    <div
      v-else
      @drop="handleDrop"
      @dragover="handleDragOver"
      class="relative bg-white rounded-2xl shadow-lg p-8 border-2 border-dashed transition-all duration-300 h-full"
      :class="
        isProcessing
          ? 'border-blue-300 bg-blue-50'
          : 'border-gray-300 hover:border-blue-400'
      "
    >
      <!-- Idle State -->
      <div
        v-if="state === 'idle'"
        class="text-center h-full flex flex-col items-center justify-center"
      >
        <svg
          class="h-16 w-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Drop CV here</h3>
        <p class="text-gray-500 mb-6">or</p>
        <label class="inline-block">
          <span
            class="px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Choose file
          </span>
          <input
            type="file"
            class="hidden"
            accept=".pdf,.doc,.docx"
            @change="handleFileSelect"
          />
        </label>
        <p class="text-sm text-gray-400 mt-4">
          Support: PDF, DOC, DOCX (max 5MB)
        </p>
      </div>

      <!-- Uploading State -->
      <div
        v-if="state === 'uploading'"
        class="text-center py-12 h-full flex flex-col items-center justify-center"
      >
        <div
          class="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"
        ></div>
        <p class="text-gray-700 font-medium">Uploading and reading file...</p>
        <p class="text-sm text-gray-500 mt-2">{{ fileName }}</p>
      </div>

      <!-- Analyzing State -->
      <div
        v-if="state === 'analyzing'"
        class="text-center py-8 h-full flex flex-col items-center justify-center"
      >
        <div
          v-motion
          :initial="{ scale: 0.8, opacity: 0 }"
          :enter="{ scale: 1, opacity: 1, transition: { duration: 500 } }"
          class="mb-6"
        >
          <div class="relative w-24 h-24">
            <svg
              class="animate-spin h-24 w-24 text-blue-600"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                fill="none"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-2xl font-bold text-blue-600"
                >{{ Math.round(progress) }}%</span
              >
            </div>
          </div>
        </div>

        <h3 class="text-xl font-semibold text-gray-900 mb-3">
          Analyzing CV...
        </h3>
        <p class="text-gray-600 mb-6">AI is reading and evaluating your CV</p>

        <!-- Progress bar -->
        <div
          class="w-full max-w-md bg-gray-200 rounded-full h-3 overflow-hidden"
        >
          <div
            class="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>

        <p class="text-sm text-gray-500 mt-4">{{ fileName }}</p>
      </div>
    </div>
  </div>
</template>
