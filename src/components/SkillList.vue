<template>
  <div v-if="items.length > 0" class="space-y-2">
    <div v-for="item in items" :key="item.skill" class="border rounded-md p-2">
      <p class="text-sm capitalize font-semibold text-gray-900">
        {{ item.skill || item }}
      </p>

      <ul
        v-if="item.evidence"
        class="mt-1 list-disc pl-5 text-sm text-gray-700"
      >
        <li v-for="(line, index) in splitEvidence(item.evidence)" :key="index">
          {{ line }}
        </li>
      </ul>
    </div>
  </div>

  <p v-else class="text-xs text-gray-400 italic">No evidence</p>
</template>

<script setup lang="ts">
type SkillEvidence = {
  skill: string;
  evidence?: string;
};

defineProps<{
  items: SkillEvidence[];
}>();

const splitEvidence = (evidence: string) =>
  evidence
    .split("•")
    .map((s) => s.trim())
    .filter(Boolean);
</script>
