<script setup lang="ts">
import { ref } from "vue";
import BoiteUtilisateur from "@/components/BoiteUtilisateur.vue";
import { apiStore } from '@/util/apiStore.ts';

// Données des utilisateurs
const users = ref([]);

// Appel API pour récupérer les utilisateurs
apiStore.getAll('users')
  .then((res) => {
    console.log(res);
    users.value = res["member"];
  });
</script>

<template>
  <div class="container mx-auto px-6 py-12">
    <!-- Titre centré -->
    <h1 class="text-center text-3xl font-bold text-teal-600 mb-8">
      Liste des artistes
    </h1>

    <!-- Liste des utilisateurs présentés comme artistes -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="user in users" :key="user.id">
        <BoiteUtilisateur :utilisateur="user" />
      </div>
    </div>
  </div>
</template>

