<script setup lang="ts">
import type { Utilisateur } from '@/types'
defineProps<{ utilisateur: Utilisateur }>()
</script>

<template>
  <div class="content-box">
    <div class="top">
      Profil de {{ utilisateur.login }}
    </div>
    <div class="content">
      <router-link class="router-link" :to="{ name: 'singleUser', params: { id: utilisateur.id } }">
        <div class="input-group">
          <label>Login</label>
          <span> {{ utilisateur.login }} </span>
        </div>
        <div class="input-group">
          <label>Adresse e-mail</label>
          <span> {{ utilisateur.email }} </span>
        </div>
        <div class="input-group">
          <label>Nom</label>
          <span> {{ utilisateur.nom }} </span>
        </div>
        <div class="input-group">
          <label>Prénom</label>
          <span> {{ utilisateur.prenom }} </span>
        </div>
        <div class="input-group">
          <label>Ville d'habitation</label>
          <span> {{ utilisateur.villeHabitation }} </span>
        </div>
        <div class="input-group">
          <label>Date de naissance</label>
          <span> {{ utilisateur.dateDeNaissance }} </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

