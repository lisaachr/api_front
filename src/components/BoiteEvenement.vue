<template>
  <div class="flex justify-center items-center mt-10">
    <div class="relative bg-white shadow-lg rounded-lg overflow-hidden w-96 h-80">
      <!-- Bouton de navigation gauche -->
      <button
        class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded disabled:opacity-50"
        @click="prevPage"
        :disabled="currentPage === 0"
      >
        ◀
      </button>

      <!-- Contenu dynamique en fonction de la page -->
      <div class="h-full flex items-center justify-center px-6">
        <!-- Page principale de présentation -->
        <div v-if="currentPage === 0" class="text-center cursor-pointer" @click="$router.push({name: 'singleEvent', params: {id : evenement.id}})">
          <h2 class="text-xl font-bold">{{ evenement.nom }}</h2>
          <img
            v-if="evenement.photo"
            :src="evenement.photo"
            alt="Image de l'événement"
            class="mt-4 rounded-lg w-full h-40 object-cover"
          />
        </div>

        <!-- Page des artistes participants -->
        <div v-if="currentPage === 1" class="text-center">
          <h2 class="text-xl font-bold mb-4">Artistes participants</h2>
          <div class="overflow-y-auto scrollbar-hidden h-60 max-h-80">
            <!-- Parcours des scènes -->
            <ul class="space-y-2">
              <li v-for="scene in evenement.scenes" :key="scene.id" class="space-y-1">
                <div class="text-lg font-semibold mb-2">Scène {{ scene.id }}</div>
                <!-- Parcours des parties de concerts dans chaque scène -->
                <ul>
                  <li v-for="partie in scene.partieConcerts" :key="partie.id" class="text-blue-600 hover:underline">
                    <p>{{ partie.artiste.nom }}</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <!-- Page des prix et inscription -->
        <div v-if="currentPage === 2" class="text-center">
          <h2 class="text-xl font-bold mb-4">Prix et Inscription</h2>
          <p class="text-gray-700 mb-4">
            <strong>Prix :</strong> {{ evenement.prix }} €
          </p>
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            S'inscrire
          </button>
        </div>
      </div>

      <!-- Bouton de navigation droite -->
      <button
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded disabled:opacity-50"
        @click="nextPage"
        :disabled="currentPage === maxPage"
      >
        ▶
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { EvenementMusical } from "@/types";

defineProps<{
  evenement: EvenementMusical;
}>();

const currentPage = ref(0);
const maxPage = 2;

const nextPage = () => {
  if (currentPage.value < maxPage) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};
</script>

<style scoped>
/* Masquer la barre de défilement avec Tailwind CSS */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden {
  -ms-overflow-style: none; /* Pour Internet Explorer */
  scrollbar-width: none; /* Pour Firefox */
}
</style>
