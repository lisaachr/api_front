<script setup lang="ts">
import { ref } from 'vue';
import { storeAuthentification } from "@/util/apiStore";
import { useRouter } from "vue-router";
import { notify } from "@kyvg/vue3-notification";

const router = useRouter();

const connectingUser = ref({
  login: "",
  plainPassword: ""
});

function connect(): void {
  storeAuthentification.login(connectingUser.value.login, connectingUser.value.plainPassword).then(res => {
    if (res.success) {
      storeAuthentification.estConnecte = true;
      router.push('allEvents');
      notify({
        type: "success",
        title: "Connexion réussie",
        text: "Vous êtes désormais connecté(e) sur le profil de " + connectingUser.value.login,
        duration: 10000
      });
    } else {
      router.push('connexion');
      notify({
        type: "error",
        title: "Connexion échouée",
        text: res.message || "Login et/ou mot de passe incorrects",
        duration: 10000
      });
      router.push('login');
    }
  });
}
</script>

<template>
  <div class="flex justify-center items-start min-h-screen pt-12">
    <div class="w-full max-w-sm p-6 border border-gray-300 rounded-md">
      <h3 class="text-3xl font-bold text-center text-teal-600 mb-6">Connexion</h3>
      <form @submit.prevent="connect">
        <div class="mb-4">
          <label for="login" class="block text-sm font-medium text-gray-700">Login</label>
          <input
            v-model="connectingUser.login"
            id="login"
            type="text"
            required
            class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            v-model="connectingUser.plainPassword"
            id="password"
            type="password"
            required
            class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
        </div>
        <button
          type="submit"
          class="w-full py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 text-xl"
        >
          Connexion
        </button>
      </form>
    </div>
  </div>
</template>
