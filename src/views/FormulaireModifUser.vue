<script setup lang="ts">
import { apiStore } from "@/util/apiStore";
import { useRouter } from "vue-router";
import { notify } from "@kyvg/vue3-notification";
import { storeAuthentification } from "@/util/apiStore";
import { ref } from "vue";

const router = useRouter();

const userModif = ref({
  login: storeAuthentification.utilisateurConnecte.login,
  plainPassword: "",
  email: storeAuthentification.utilisateurConnecte.email,
  nom: storeAuthentification.utilisateurConnecte.nom,
  prenom: storeAuthentification.utilisateurConnecte.prenom,
  villeHabitation: storeAuthentification.utilisateurConnecte.villeHabitation,
  dateDeNaissance: storeAuthentification.utilisateurConnecte.dateDeNaissance,
  currentPlainPassword: "",
});

function updateProfile(): void {
  if (!userModif.value.currentPlainPassword) {
    notify({
      type: "error",
      title: "Mot de passe actuel requis",
      text: "Veuillez saisir votre mot de passe actuel pour valider les modifications.",
      duration: 5000,
    });
    return;
  }

  apiStore.updateUser("users/" + storeAuthentification.utilisateurConnecte.id, userModif.value).then((res) => {
    if (res.success) {
      notify({
        type: "success",
        title: "Profil mis à jour",
        text: "Votre profil a été mis à jour avec succès.",
        duration: 5000,
      });
      router.push({ name: "api_front" });
    }
    else {
      // debugger
      notify({
        type: "error",
        title: "Erreur de mise à jour",
        text: res.error,
        duration: 5000,
      });
    }
  });
}
</script>

<template>
  <div class="flex justify-center items-start min-h-screen pt-12">
    <div class="w-full max-w-4xl p-8 border border-gray-300 rounded-md">
      <h3 class="text-3xl font-bold text-center text-teal-600 mb-6">Modification du profil</h3>

      <form @submit.prevent="updateProfile" class="grid grid-cols-2 gap-6">
        <div class="group mb-4">
          <label for="login" class="block text-sm font-medium text-gray-700">Login</label>
          <input
            v-model="userModif.login"
            id="login"
            type="text"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>

        <div class="group mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Adresse email</label>
          <input
            v-model="userModif.email"
            id="email"
            type="email"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>

        <div class="group mb-4">
          <label for="nom" class="block text-sm font-medium text-gray-700">Nom</label>
          <input
            v-model="userModif.nom"
            id="nom"
            type="text"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>

        <div class="group mb-4">
          <label for="prenom" class="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            v-model="userModif.prenom"
            id="prenom"
            type="text"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>

        <div class="group mb-4">
          <label for="ville" class="block text-sm font-medium text-gray-700">Ville</label>
          <input
            v-model="userModif.villeHabitation"
            id="ville"
            type="text"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>

        <div class="group mb-4">
          <label for="dateDeNaissance" class="block text-sm font-medium text-gray-700">Date de naissance</label>
          <input
            v-model="userModif.dateDeNaissance"
            id="dateDeNaissance"
            type="date"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>

        <div class="group mb-4">
          <label for="currentPlainPassword" class="block text-sm font-medium text-red-700">Mot de passe actuel (requis)</label>
          <input
            v-model="userModif.currentPlainPassword"
            id="currentPlainPassword"
            type="password"
            required
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-base"
          />
        </div>

        <div class="group mb-4">
          <label for="plainPassword" class="block text-sm font-medium text-gray-700">Nouveau mot de passe (facultatif)</label>
          <input
            v-model="userModif.plainPassword"
            id="plainPassword"
            type="password"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>

        <div class="col-span-2">
          <button
            type="submit"
            class="w-full py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 text-xl mt-4"
          >
            Mettre à jour le profil
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
