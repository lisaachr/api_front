<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import type { Scene } from "@/types"
import { apiStore } from "@/util/apiStore";

const route = useRoute()
const id = route.params.id

const scene = ref<Scene>({
  id: Number(route.params.id),
  nom: "Chargement...",
  nombreMaxParticipants: 0
})

apiStore.getById('scenes', id)
  .then(res => {
    scene.value = res
    console.log(scene.value)
  })
</script>

<template>
  <div class="contentBox">
    <div class="top">
      Scène: {{ scene.nom }}
    </div>
    <div class="content">
      <div class="input-group">
        <label>ID :</label>
        <span>{{ scene.id }}</span>
      </div>
      <div class="input-group">
        <label>Nom :</label>
        <span>{{ scene.nom }}</span>
      </div>
      <div class="input-group">
        <label>Nombre maximum de participants :</label>
        <span>{{ scene.nombreMaxParticipants }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
