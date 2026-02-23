import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  CVStructure,
  JDStructure,
  CVReviewResult,
  CVJDCompareResult,
} from "@/types/cv";
import { fileParserService } from "@/services/fileParser";
import { aiService } from "@/services/analyzingService";

export const useCVStore = defineStore("cv", () => {
  // State
  const cvFile = ref<File | null>(null);
  const jdFile = ref<File | null>(null);
  const cvText = ref<string>("");
  const jdText = ref<string>("");
  const parsedCV = ref<CVStructure | null>(null);
  const parsedJD = ref<JDStructure | null>(null);
  const reviewResult = ref<CVReviewResult | null>(null);
  const compareResult = ref<CVJDCompareResult | null>(null);
  const isAnalyzing = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Computed
  const hasCV = computed(() => cvFile.value !== null);
  const hasJD = computed(() => jdFile.value !== null);
  const canAnalyze = computed(() => hasCV.value && !isAnalyzing.value);
  const canCompare = computed(
    () => hasCV.value && hasJD.value && !isAnalyzing.value,
  );

  // Actions
  async function uploadCV(file: File) {
    try {
      error.value = null;
      cvFile.value = file;
      reviewResult.value = null;
      compareResult.value = null;

      cvText.value = await fileParserService.extractText(file);
      parsedCV.value = fileParserService.parseCV(cvText.value);
      console.log(parsedCV.value);
    } catch (err) {
      error.value = `Failed to parse CV: ${(err as Error).message}`;
      throw err;
    }
  }

  async function uploadJD(file: File) {
    try {
      error.value = null;
      jdFile.value = file;
      compareResult.value = null;

      jdText.value = await fileParserService.extractText(file);
      parsedJD.value = fileParserService.parseJD(jdText.value);
    } catch (err) {
      error.value = `Failed to parse JD: ${(err as Error).message}`;
      throw err;
    }
  }

  async function analyzeCV() {
    if (!parsedCV.value) {
      error.value = "No CV to analyze";
      return;
    }

    try {
      isAnalyzing.value = true;
      error.value = null;

      reviewResult.value = await aiService.reviewCV(parsedCV.value);
    } catch (err) {
      error.value = `Analysis failed: ${(err as Error).message}`;
      throw err;
    } finally {
      isAnalyzing.value = false;
    }
  }

  async function compareWithJD() {
    if (!parsedCV.value || !parsedJD.value) {
      error.value = "Missing CV or JD";
      return;
    }

    try {
      isAnalyzing.value = true;
      error.value = null;

      compareResult.value = await aiService.compareWithJD(
        parsedCV.value,
        parsedJD.value,
      );
    } catch (err) {
      error.value = `Comparison failed: ${(err as Error).message}`;
      throw err;
    } finally {
      isAnalyzing.value = false;
    }
  }

  function acceptSuggestion(index: number) {
    // In production, this would apply the suggestion to the CV
    console.log("Accepting suggestion:", index);
  }

  function rejectSuggestion(index: number) {
    if (reviewResult.value) {
      reviewResult.value.issues.splice(index, 1);
    }
  }

  function reset() {
    cvFile.value = null;
    jdFile.value = null;
    cvText.value = "";
    jdText.value = "";
    parsedCV.value = null;
    parsedJD.value = null;
    reviewResult.value = null;
    compareResult.value = null;
    isAnalyzing.value = false;
    error.value = null;
  }

  return {
    // State
    cvFile,
    jdFile,
    cvText,
    jdText,
    parsedCV,
    parsedJD,
    reviewResult,
    compareResult,
    isAnalyzing,
    error,

    // Computed
    hasCV,
    hasJD,
    canAnalyze,
    canCompare,

    // Actions
    uploadCV,
    uploadJD,
    analyzeCV,
    compareWithJD,
    acceptSuggestion,
    rejectSuggestion,
    reset,
  };
});
