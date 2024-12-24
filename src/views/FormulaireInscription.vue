<script setup lang="ts">
import { ref } from "vue";
import { apiStore } from "@/util/apiStore";
import { useRouter } from "vue-router";
import { notify } from "@kyvg/vue3-notification";
import type {Utilisateur} from "@/types.ts";

const router = useRouter();

const newUser = ref<Utilisateur>({
  login: "",
  plainPassword: "",
  email: "",
  nom: "",
  prenom: "",
  dateDeNaissance: "",
  id: 0,
  // evenementMusicals: []
});

function register(): void {
  apiStore.createUser("users", newUser.value).then((res) => {
    if (res.success) {
      notify({
        type: "success",
        title: "Inscription réussie",
        text: `Bienvenue! Vous êtes maintenant inscrit avec le compte de ${newUser.value.prenom} ${newUser.value.nom}`,
        duration: 10000,
      });
      router.push({ name: 'api_front' });
    } else {
      notify({
        type: "error",
        title: "Erreur d'inscription",
        text: res.error,
        duration: 10000,
      });
    }
  });
}
</script>

<template>
  <div class="flex justify-center items-start min-h-screen pt-12">
    <div class="w-full max-w-sm p-6 border border-gray-300 rounded-md">
      <h3 class="text-3xl font-bold text-center text-teal-600 mb-6">Inscription</h3>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="login" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
          <input
            v-model="newUser.login"
            id="login"
            type="text"
            required
            placeholder="jul135"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            v-model="newUser.plainPassword"
            id="password"
            type="password"
            required
            placeholder="Entrez votre mot de passe"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Adresse email</label>
          <input
            v-model="newUser.email"
            id="email"
            type="email"
            required
            placeholder="exemple@gmail.com"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>

        <div class="mb-4">
          <label for="nom" class="block text-sm font-medium text-gray-700">Nom</label>
          <input
            v-model="newUser.nom"
            id="nom"
            type="text"
            required
            placeholder="MARI"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>

        <div class="mb-4">
          <label for="prenom" class="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            v-model="newUser.prenom"
            id="prenom"
            type="text"
            required
            placeholder="Julien"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>

        <div class="mb-2">
          <label for="dateDeNaissance" class="block text-sm font-medium text-gray-700">Date de naissance</label>
          <input
            v-model="newUser.dateDeNaissance"
            id="dateDeNaissance"
            type="date"
            required
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 text-xl mt-4"
        >
          S'inscrire
        </button>
      </form>
    </div>
  </div>
</template>
