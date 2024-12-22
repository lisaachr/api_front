<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import type { PartieConcert } from "@/types"
import { apiStore } from "@/util/apiStore";

const route = useRoute()
const id = route.params.id

const partieConcert = ref<PartieConcert>({
  id: Number(route.params.id),
  artistePrincipal: false,
  dateDeDebut: "Chargement...",
  dateDeFin: "Chargement...",
  artiste: {
    id: 0,
    email: "",
    login: "",
    nom: "Chargement...",
    prenom: "",
    villeHabitation: "",
    dateDeNaissance: ""
  },
  nom: "Chargement...",
});

apiStore.getById('partie_concerts', Number(id))
  .then(res => {
    partieConcert.value = res
    console.log(partieConcert.value)
  })
</script>

<template>
  <div class="contentBox">
    <div class="top">
      Partie de concert
    </div>
    <div class="content">
      <div class="input-group">
        <label>ID :</label>
        <span>{{ partieConcert.id }}</span>
      </div>
      <div class="input-group">
        <label>Artiste principal :</label>
        <span>{{ partieConcert.artistePrincipal ? "Oui" : "Non" }}</span>
      </div>
      <div class="input-group">
        <label>Date de début :</label>
        <span>{{ partieConcert.dateDeDebut }}</span>
      </div>
      <div class="input-group">
        <label>Date de fin :</label>
        <span>{{ partieConcert.dateDeFin }}</span>
      </div>
    </div>
  </div>
</template>
