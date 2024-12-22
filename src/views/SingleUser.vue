<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import type { Utilisateur } from "@/types"
import { apiStore } from "@/util/apiStore";

const route = useRoute()
const id = route.params.id

const user = ref<Utilisateur>({
  id: Number(route.params.id),
  email: "Chargement...",
  login: "Chargement...",
  nom: "Chargement...",
  prenom: "Chargement...",
  villeHabitation: "Chargement...",
  dateDeNaissance: "Chargement..."
})

apiStore.getById('users', Number(id))
  .then(res => {
    user.value = res
    // console.log(user.value)
  })
</script>

<template>
  <div class="contentBox">
    <div class="top">
      Profil de {{ user.login }}
    </div>
    <div class="content">
      <div class="input-group">
        <label>ID :</label>
        <span>{{ user.id }}</span>
      </div>
      <div class="input-group">
        <label>Nom :</label>
        <span>{{ user.nom }}</span>
      </div>
      <div class="input-group">
        <label>Prénom :</label>
        <span>{{ user.prenom }}</span>
      </div>
      <div class="input-group">
        <label>Email :</label>
        <span>{{ user.email }}</span>
      </div>
      <div class="input-group">
        <label>Ville :</label>
        <span>{{ user.villeHabitation }}</span>
      </div>
      <div class="input-group">
        <label>Date de naissance :</label>
        <span>{{ user.dateDeNaissance }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
