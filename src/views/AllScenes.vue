<script setup lang="ts">
import { ref } from "vue"
import BoiteScene from "@/components/BoiteScene.vue" // Composant pour afficher les scènes
import { apiStore } from '@/util/apiStore.ts'

const scenes = ref([])

apiStore.getAll('scenes')
  .then(
    (res) => {
      console.log(res)
      scenes.value = res["member"]
    }
  )
</script>

<template>
  <h1 class="title">Liste des scènes.</h1>
  <div v-for="scene in scenes" :key="scene.id">
    <BoiteScene :scene="scene"/>
  </div>
</template>

<style scoped>

</style>
