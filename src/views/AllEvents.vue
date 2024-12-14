<script setup lang="ts">
import { ref } from "vue"
import BoiteEvenementMusical from "@/components/BoiteEvenement.vue" // Composant pour afficher les événements musicaux
import { apiStore } from '@/util/apiStore.ts'

import Button from "primevue/button";
import {InputText} from "primevue";
import DatePicker from 'primevue/datepicker';

const evenementsMusicals = ref([])

apiStore.getAll('evenement_musicals')
  .then(
    (res) => {
      console.log(res)
      evenementsMusicals.value = res["member"]
    }
  )
</script>

<template>
  <h1 class="title">Liste des événements musicaux.</h1>
  <div v-for="evenement in evenementsMusicals" :key="evenement.id">
    <BoiteEvenementMusical :evenement="evenement"/>
    <InputText v-model="text" />
    {{ text }}
    <Button label="Save" />
    <Button label="Success" severity="success" />
    <DatePicker v-model="dates" selectionMode="range" :manualInput="false" />
  </div>
</template>

<style scoped>

</style>
