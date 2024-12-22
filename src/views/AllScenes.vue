<script setup lang="ts">
import { ref } from "vue"
import BoiteScene from "@/components/BoiteScene.vue"
import { apiStore } from '@/util/apiStore.ts'
import type {Scene} from "@/types.ts";

const scenes = ref<Scene[]>([])

apiStore.getAll('scenes')
  .then(
    (res) => {
      console.log(res)
      scenes.value = res["member"]
    }
  )
</script>

<template>
  <h1 class="text-center text-3xl font-bold text-teal-600 mb-6">
    Liste des scènes disponibles
  </h1>

  <div v-for="scene in scenes" :key="scene.id">
    <BoiteScene :scene="scene"/>
  </div>
</template>
