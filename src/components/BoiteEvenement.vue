<template>
  <div class="flex justify-center items-center mt-10">
    <div class="relative bg-white shadow-xl rounded-2xl overflow-hidden w-96 h-80 hover:shadow-2xl transition-shadow duration-300">
      <button
        class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 transition-colors duration-200"
        @click="prevPage"
        :disabled="currentPage === 0"
      >
        ◁
      </button>

      <div class="h-full flex items-center justify-center px-6">
        <div v-if="currentPage === 0" class="text-center cursor-pointer" @click="$router.push({name: 'singleEvent', params: {id : evenement.id}})">
          <h2 class="text-2xl font-bold text-teal-600">{{ evenement.nom }}</h2>
          <img
            v-if="evenement.photo"
            :src="evenement.photo"
            alt="Image de l'événement"
            class="mt-4 rounded-lg w-full h-48 object-cover transition-transform transform hover:scale-105"
          />
        </div>

        <div v-if="currentPage === 1" class="text-center">
          <h2 class="text-xl font-bold text-teal-600 mb-4">Artistes participants</h2>
          <div class="overflow-y-auto scrollbar-hidden h-60 max-h-80">
            <ul class="space-y-2">
              <li v-for="scene in evenement.scenes" :key="scene.id" class="space-y-1">
                <div class="text-lg font-semibold text-teal-600 mb-2">Scène n° {{ scene.id }}</div>
                <ul>
                  <li v-for="partie in scene.partieConcerts" :key="partie.id" class="text-blue-600 hover:underline">
                    <p class="no-underline">{{ partie.artiste.nom }}</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div v-if="currentPage === 2" class="text-center">
          <h2 class="text-xl font-bold text-teal-600 mb-4">Prix et Inscription</h2>
          <p class="text-gray-700 mb-4">
            <strong>Prix :</strong> {{ evenement.prix }} €
          </p>
          <button
            class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:shadow-lg transition-shadow duration-300"
            @click="inscrireUtilisateur(evenement.id)"
          >
            S'inscrire
          </button>
        </div>
      </div>

      <button
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 transition-colors duration-200"
        @click="nextPage"
        :disabled="currentPage === maxPage"
      >
        ▷
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { EvenementMusical } from "@/types";
import { apiStore, storeAuthentification} from "@/util/apiStore.ts";
import {notify} from "@kyvg/vue3-notification";

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

// Méthode pour inscrire l'utilisateur à un événement
function inscrireUtilisateur(evenementId: number) {
  console.log("event:",[evenementId])
  if (!storeAuthentification.estConnecte) {
    notify({ type: 'error', text: 'Veuillez vous connecter pour vous inscrire a un évènement.' });
    return;
  }

  const userId = storeAuthentification.utilisateurConnecte.id;

  // Mettre à jour l'utilisateur avec l'événement
  apiStore.updateUser('users', userId, {
    evenementMusicals: ["/api_rest/public/api/evenement_musicals/" + evenementId]
  })
    .then(userUpdateResponse => {
      if (!userUpdateResponse.success) {
        throw new Error(userUpdateResponse.error || "Erreur lors de la mise à jour de l'utilisateur.");
      }

      // Mettre à jour l'événement avec l'utilisateur
      return apiStore.updateEvent('evenement_musicals', evenementId, {
        participants: ["/api_rest/public/api/users/" + userId]
      });
    })
    .then(eventUpdateResponse => {
      if (!eventUpdateResponse.success) {
        throw new Error(eventUpdateResponse.error || "Erreur lors de la mise à jour de l'événement.");
      }

      notify({ type: 'success', text: 'Inscription réussie à l\'événement !' });
    })
    .catch(error => {
      console.error("Erreur :", error);
      notify({ type: 'error', text: `Une erreur est survenue : ${error.message}` });
    });
}
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-underline {
  text-decoration: none !important;
  color: black;
}
</style>
