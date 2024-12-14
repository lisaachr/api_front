<script setup lang="ts">
import type { PartieConcert } from '@/types'
defineProps<{ partie: PartieConcert }>()
</script>

<template>
  <div class="content-box">
    <div class="top">
      Partie musicale
    </div>
    <div class="content">
      <router-link class="router-link" :to="{ name: 'singlePartieConcert', params: { id: partie.id } }">
        <div class="input-group">
          <label>Artiste principal</label>
          <span> {{ partie.artistePrincipal ? 'Oui' : 'Non' }} </span>
        </div>
        <div class="input-group">
          <label>Date de début</label>
          <span> {{ partie.dateDeDebut }} </span>
        </div>
        <div class="input-group">
          <label>Date de fin</label>
          <span> {{ partie.dateDeFin }} </span>
        </div>
      </router-link>
    </div>
  </div>
</template>
