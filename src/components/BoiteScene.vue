<script setup lang="ts">
import type { Scene } from '@/types'
defineProps<{ scene: Scene }>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-300 w-[1200px] mx-auto">
    <div class="text-center text-2xl font-semibold text-teal-600 mb-4">
      {{ scene.nom }}
    </div>
    <div class="p-4 bg-teal-50 rounded-lg shadow-sm transition-colors duration-300">
      <div class="mb-4">
        <span class="block text-lg font-semibold text-gray-700">Nom de la scène :</span>
        <span class="text-lg text-gray-900">{{ scene.nom }}</span>
      </div>
      <div class="mb-4">
        <span class="block text-lg font-semibold text-gray-700">Nombre maximum de participants :</span>
        <span class="text-lg text-gray-900">{{ scene.nombreMaxParticipants }}</span>
      </div>

      <div class="mt-6">
        <h3 class="text-xl font-semibold text-teal-600 mb-4">Parties de concert :</h3>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="partie in scene.partieConcerts"
            :key="partie.id"
            class="border border-gray-300 p-4 rounded-lg bg-white shadow hover:shadow-md transition-shadow"
          >
            <div class="mb-2">
              <span class="font-semibold">Nom :</span>
              <span>{{ partie.nom }}</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Artiste principal :</span>
              <span>{{ partie.artistePrincipal ? 'Oui' : 'Non' }}</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Date de début :</span>
              <span>{{ new Date(partie.dateDeDebut).toLocaleString() }}</span>
            </div>
            <div>
              <span class="font-semibold">Date de fin :</span>
              <span>{{ new Date(partie.dateDeFin).toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
