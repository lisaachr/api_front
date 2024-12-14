<script setup lang="ts">
import type { EvenementMusical } from '@/types'
defineProps<{ evenement: EvenementMusical }>()
</script>

<template>
  <div class="content-box">
    <div class="top">
      Événement musical: {{ evenement.nom }}
    </div>
    <div class="content">
      <router-link class="router-link" :to="{ name: 'singleEvent', params: { id: evenement.id } }">
        <div class="input-group">
          <label>Nom de l'événement</label>
          <span> {{ evenement.nom }} </span>
        </div>
        <div class="input-group">
          <label>Date de début</label>
          <span> {{ evenement.dateDeDebut }} </span>
        </div>
        <div class="input-group">
          <label>Date de fin</label>
          <span> {{ evenement.dateDeFin }} </span>
        </div>
        <div class="input-group">
          <label>Prix</label>
          <span> {{ evenement.prix }} €</span>
        </div>
        <div class="input-group">
          <label>Adresse</label>
          <span> {{ evenement.adresse }} </span>
        </div>
      </router-link>
    </div>
  </div>
</template>
