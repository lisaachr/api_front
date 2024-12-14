<script setup lang="ts">
import type { Scene } from '@/types'
defineProps<{ scene: Scene }>()
</script>

<template>
  <div class="content-box">
    <div class="top">
      Scene
    </div>
    <div class="content">
      <router-link class="router-link" :to="{ name: 'singleScene', params: { id: scene.id } }">
        <div class="input-group">
          <label>Nom de la scène</label>
          <span> {{ scene.nom }} </span>
        </div>
        <div class="input-group">
          <label>Nombre maximum de participants</label>
          <span> {{ scene.nombreMaxParticipants }} </span>
        </div>
      </router-link>
    </div>
  </div>
</template>
