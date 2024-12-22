<script setup lang="ts">
import type { Scene } from '@/types'
defineProps<{ scene: Scene }>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-300 w-[1200px] mx-auto">
    <div class="text-center text-2xl font-semibold text-teal-600 mb-4">{{ scene.nom }} </div>
    <router-link
      class="block p-4 bg-teal-50 hover:bg-teal-100 rounded-lg shadow-md transition-colors duration-300"
      :to="{ name: 'singleScene', params: { id: scene.id } }"
    >
      <div class="mb-4">
        <label class="block text-lg font-semibold text-gray-700">Nom de la scène :
          <span class="text-lg text-gray-900">{{ scene.nom }}</span>
        </label>
      </div>
      <div>
        <label class="block text-lg font-semibold text-gray-700">Nombre maximum de participants :
          <span class="text-lg text-gray-900">{{ scene.nombreMaxParticipants }}</span>
        </label>

      </div>
    </router-link>
  </div>
</template>
