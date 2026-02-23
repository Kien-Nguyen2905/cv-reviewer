<script setup lang="ts">
import Accordion from "@/components/Accordion.vue";
import SkillList from "@/components/SkillList.vue";
import { EVIDENCE_CONFIG } from "@/constants/general";

const props = defineProps<{ evidenceData: any; insightData: any }>();

const mergedSkills = {
  strong: props.insightData?.skillOverview?.strong,
  medium: props.insightData?.skillOverview?.medium,
  weak: props.insightData?.skillOverview?.weak,
};
console.log("mergedSkills", mergedSkills);
</script>

<template>
  <div
    v-motion
    :initial="{ y: -20, opacity: 0 }"
    :enter="{ y: 0, opacity: 1, transition: { delay: 400, duration: 500 } }"
    class="bg-white rounded-xl p-6 border border-gray-200"
  >
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Skill Evidence</h3>
    <div v-for="(item, key) in mergedSkills" :key="key">
      <Accordion
        :title="EVIDENCE_CONFIG[key]?.title"
        :des="EVIDENCE_CONFIG[key]?.des"
        :headerClass="EVIDENCE_CONFIG[key]?.headerClass"
      >
        <SkillList :items="item" />
      </Accordion>
    </div>
  </div>
</template>
