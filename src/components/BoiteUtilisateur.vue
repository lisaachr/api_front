<script setup lang="ts">
import type { Utilisateur } from '@/types';
defineProps<{ utilisateur: Utilisateur }>();
</script>

<template>
  <div class="content-box bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-300 w-[800px] mx-auto">
    <div class="top text-center text-2xl font-semibold text-teal-600 mb-4">
      Profil de l'artiste : {{ utilisateur.nom }}
    </div>
    <div class="content">
      <router-link
        class="block p-4 bg-teal-50 hover:bg-teal-100 rounded-lg shadow-md transition-colors duration-300"
        :to="{ name: 'singleUser', params: { id: utilisateur.id } }"
      >
        <div class="input-group mb-4">
          <label class="block text-lg font-semibold text-gray-700">Nom de l'artiste : </label>
          <span class="text-lg text-gray-900">{{ utilisateur.nom }}</span>
        </div>
        <div class="input-group mb-4">
          <label class="block text-lg font-semibold text-gray-700">Prénom : </label>
          <span class="text-lg text-gray-900">{{ utilisateur.prenom }}</span>
        </div>
        <div class="input-group mb-4">
          <label class="block text-lg font-semibold text-gray-700">Style musical : </label>
          <span class="text-lg text-gray-900">-- À définir --</span>
        </div>
        <div class="input-group mb-4">
          <label class="block text-lg font-semibold text-gray-700">Description : </label>
          <span class="text-lg text-gray-900">-- À définir --</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
