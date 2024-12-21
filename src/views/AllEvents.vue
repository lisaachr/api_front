<script setup lang="ts">
import { ref } from "vue";
import BoiteEvenementMusical from "@/components/BoiteEvenement.vue";
import { apiStore } from "@/util/apiStore.ts";

const evenementsMusicals = ref([]);

apiStore.getAll("evenement_musicals").then((res) => {
  console.log(res);
  evenementsMusicals.value = res["member"];
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    <div
      v-for="evenement in evenementsMusicals"
      :key="evenement.id"
      class="dark:bg-gray-800 rounded-lg p-4"
    >
      <BoiteEvenementMusical :evenement="evenement" />
    </div>
  </div>
</template>

