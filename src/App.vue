<script setup>
import { ref, onUnmounted } from "vue";
import PageHeader from "./components/PageHeader.vue";
import UploadZone from "./components/UploadZone.vue";
import ResultArea from "./components/ResultArea.vue";
import { parseCVFile, revokePreviewUrl } from "./utils/cvParser";
import AnalyzingService from "@/services/analyzingService";
import InsightService from "@/services/insightServices";

const state = ref("idle");
const uploadedFile = ref(null);
const analysisProgress = ref(0);
const insightData = ref(null);
const errorMessage = ref(null);

const cvText = ref(""); // ← Text extracted from CV for API
const cvPreviewUrl = ref(null);
const cvFileType = ref(null);

const processFile = async (file) => {
  uploadedFile.value = file;
  state.value = "uploading";
  analysisProgress.value = 0;

  let progressTimer = null;

  try {
    // Parse CV
    const { text, previewUrl, fileType } = await parseCVFile(file);

    cvText.value = text;
    cvPreviewUrl.value = previewUrl;
    cvFileType.value = fileType;

    state.value = "analyzing";

    // Progress giả lập
    progressTimer = setInterval(() => {
      if (analysisProgress.value < 85) {
        analysisProgress.value += Math.random() * 2;
        if (analysisProgress.value > 85) {
          analysisProgress.value = 85;
        }
      }
    }, 800);

    const analysisResult = await AnalyzingService.analyzeCV(cvText.value);
    const insightResult = await InsightService.insightCV(analysisResult);

    // API xong → clear timer →  100
    clearInterval(progressTimer);
    analysisProgress.value = 100;

    insightData.value = insightResult;
    state.value = "success";
  } catch (error) {
    state.value = "error";
    analysisProgress.value = 0;

    errorMessage.value =
      error?.response?.data?.message ||
      error?.message ||
      "Không đủ dữ liệu để xác minh lỗi từ API";
  } finally {
    if (progressTimer) clearInterval(progressTimer);
  }
};

const reset = () => {
  // Cleanup blob URL
  if (cvPreviewUrl.value) {
    revokePreviewUrl(cvPreviewUrl.value);
  }
  state.value = "idle";
  uploadedFile.value = null;
  analysisProgress.value = 0;
  insightData.value = null;
  cvText.value = "";
  cvPreviewUrl.value = null;
  cvFileType.value = null;
};

onUnmounted(() => {
  if (cvPreviewUrl.value) {
    revokePreviewUrl(cvPreviewUrl.value);
  }
});
</script>

<template>
  <div class="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="mx-auto max-w-7xl">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div class="h-[calc(100vh-250px)] min-h-[700px]">
          <UploadZone
            :state="state"
            :file-name="uploadedFile?.name"
            :file-type="cvFileType"
            :progress="analysisProgress"
            :preview-url="cvPreviewUrl"
            @file-selected="processFile"
            @reset="reset"
          />
        </div>
        <div class="h-[calc(100vh-250px)] min-h-[700px] overflow-y-auto">
          <ResultArea
            :state="state"
            :insight-data="insightData"
            @reset="reset"
          />
        </div>
      </div>
    </div>
  </div>
</template>
