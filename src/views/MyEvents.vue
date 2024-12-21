<script setup lang="ts">
import {ref} from "vue"
import BoiteEvenementMusical from "@/components/BoiteEvenement.vue"
import {storeAuthentification} from "@/util/apiStore.ts";
import {apiStore} from '@/util/apiStore.ts'

const evenementsMusicals = ref([])

apiStore.getById('users/' + storeAuthentification.utilisateurConnecte.id, 'evenements', )
  .then(
    (res) => {
      console.log(res)
      evenementsMusicals.value = res["member"]
    }
  )
</script>

<template>
  <div>
    <h1>MyEvents</h1>
  </div>
  <div v-for="evenement in evenementsMusicals" :key="evenement.id">
  <BoiteEvenementMusical :evenement="evenement"/>
</div>

</template>

<style scoped>

</style>
