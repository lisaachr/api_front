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
        <div v-if="currentPage === 0" class="text-center cursor-pointer">
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
            class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
            @click="estInscrit ? desinscrireUtilisateur(evenement.id) : inscrireUtilisateur(evenement.id)"
          >
            {{ estInscrit ? 'Se désinscrire' : 'S\'inscrire' }}
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
import {type ApiResponse, type EvenementMusical, type Utilisateur} from "@/types";
import { apiStore, storeAuthentification } from "@/util/apiStore.ts";
import { notify } from "@kyvg/vue3-notification";

const props = defineProps<{
  evenement: EvenementMusical;
}>();

const currentUser = storeAuthentification.utilisateurConnecte || {
  login: "",
  email: "",
  nom: "",
  prenom: "",
  dateDeNaissance: "",
  id: 0,
};

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

const estInscrit = ref(false);

// Vérification si l'utilisateur est inscrit lors de la récupération de ses informations
if (storeAuthentification.estConnecte) {
  const userId = currentUser.id;

  apiStore.getById("users", userId).then((response: ApiResponse<Utilisateur>) => {
    if (response.success && response.data) {
      const user = response.data;
      if (user.evenementMusicals) {
        estInscrit.value = user.evenementMusicals.some(
          (event: EvenementMusical) => event.id === props.evenement.id
        );
      } else {
        estInscrit.value = false;
      }
    } else {
      console.error("Erreur lors de la récupération de l'utilisateur :", response.error);
    }
  });
}

function inscrireUtilisateur(evenementId: number) {
  if (!storeAuthentification.estConnecte) {
    notify({ type: 'error', text: 'Veuillez vous connecter pour vous inscrire à un évènement.' });
    return;
  }

  const userId = currentUser.id;

  apiStore.getById('users', userId).then(user => {
    const events = user.evenementMusicals || [];
    const evenementMusicalsToAdd = [
      ...events.map(event => '/api_rest/public/api/evenement_musicals/' + event.id),
      '/api_rest/public/api/evenement_musicals/' + evenementId
    ];
    apiStore.updateUser('users', userId, { evenementMusicals: evenementMusicalsToAdd })
      .then(() => {
        return apiStore.getById('evenement_musicals', evenementId).then(event => {
          const participants = (event.participants || []).map(participant => participant['@id'], '/api_rest/public/api/evenement_musicals/' + userId);
          return apiStore.updateEvent('evenement_musicals', evenementId, { participants: participants });
        });
      })
      .then(() => {
        estInscrit.value = true;
        notify({ type: 'success', text: 'Inscription réussie à l\'événement !' });
      })
      .catch(error => {
        console.error("Erreur :", error);
        notify({ type: 'error', text: 'Une erreur est survenue : ' + error.message });
      });
  });
}

function desinscrireUtilisateur(evenementId: number) {
  if (!storeAuthentification.estConnecte) {
    notify({ type: 'error', text: 'Veuillez vous connecter pour vous désinscrire d\'un évènement.' });
    return;
  }

  const userId = currentUser.id;

  apiStore.getById('users', userId).then(user => {
    const events = user.evenementMusicals.filter(event => event.id !== evenementId);
    const evenementMusicalsToKeep = events.map(event => '/api_rest/public/api/evenement_musicals/' + event.id);

    apiStore.updateUser('users', Number(userId), { evenementMusicals: evenementMusicalsToKeep })
      .then(() => {
        return apiStore.getById('evenement_musicals', evenementId).then(event => {
          const participants = (event.participants || []).filter(participant => participant && participant['@id'] !== undefined && !participant['@id'].endsWith('/' + userId)
          );
          const participantsToKeep = participants.map(participant => participant['@id'] );
          return apiStore.updateEvent('evenement_musicals', evenementId, { participants: participantsToKeep });
        });
      })
      .then(() => {
        estInscrit.value = false;
        notify({ type: 'success', text: 'Désinscription réussie de l\'événement !' });
      })
      .catch(error => {
        console.error("Erreur :", error);
        notify({ type: 'error', text: 'Une erreur est survenue : ' + error.message });
      });
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
