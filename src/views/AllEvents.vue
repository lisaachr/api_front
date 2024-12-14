<script setup lang="ts">
import { ref } from "vue"
import BoiteEvenementMusical from "@/components/BoiteEvenement.vue" // Composant pour afficher les événements musicaux
import { apiStore } from '@/util/apiStore.ts'

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
  </div>
</template>

<style scoped>

</style>
