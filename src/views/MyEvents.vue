<script setup lang="ts">
import { ref } from "vue";
import BoiteEvenementMusical from "@/components/BoiteEvenement.vue";
import { storeAuthentification } from "@/util/apiStore.ts";
import { apiStore } from "@/util/apiStore.ts";
import type {EvenementMusical} from "@/types.ts";

const evenementsMusicals = ref<EvenementMusical[]>([]);

let currentUser = storeAuthentification.utilisateurConnecte || {
  login: "",
  email: "",
  nom: "",
  prenom: "",
  dateDeNaissance: "",
  id: 0
}

apiStore
  .getById("users/" + currentUser.id, "evenements")
  .then((res) => {
    // console.log(res);
    evenementsMusicals.value = res["member"];
  });
</script>

<template>
  <div>
    <h1 class="text-teal-600 font-bold text-2xl mb-4 text-center">Mes Événements</h1>
    <div v-if="evenementsMusicals.length === 0" class="text-teal-600 text-lg text-center mt-12">
      Vous n'êtes inscrit(e) à aucun événement.
    </div>
    <div v-else>
      <div v-for="evenement in evenementsMusicals" :key="evenement.id">
        <BoiteEvenementMusical :evenement="evenement" />
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 1rem;
}

.text-center {
  margin-top: 3rem;
}
</style>
