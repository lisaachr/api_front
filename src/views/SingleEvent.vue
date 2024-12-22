<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import type { EvenementMusical } from "@/types"
import { apiStore } from "@/util/apiStore";

const route = useRoute()
const id = route.params.id

const evenement = ref<EvenementMusical>({
  id: Number(route.params.id),
  nom: "Chargement...",
  dateDeDebut: "Chargement...",
  dateDeFin: "Chargement...",
  prix: 0,
  adresse: "Chargement..."
})

apiStore.getById('evenement_musicals', Number(id))
  .then(res => {
    evenement.value = res
    // console.log(evenement.value)
  })
</script>

<template>
  <div class="contentBox">
    <div class="top">
      Événement: {{ evenement.nom }}
    </div>
    <div class="content">
      <div class="input-group">
        <label>ID :</label>
        <span>{{ evenement.id }}</span>
      </div>
      <div class="input-group">
        <label>Nom :</label>
        <span>{{ evenement.nom }}</span>
      </div>
      <div class="input-group">
        <label>Date de début :</label>
        <span>{{ evenement.dateDeDebut }}</span>
      </div>
      <div class="input-group">
        <label>Date de fin :</label>
        <span>{{ evenement.dateDeFin }}</span>
      </div>
      <div class="input-group">
        <label>Prix :</label>
        <span>{{ evenement.prix }} €</span>
      </div>
      <div class="input-group">
        <label>Adresse :</label>
        <span>{{ evenement.adresse }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
