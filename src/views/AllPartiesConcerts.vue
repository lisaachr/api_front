<script setup lang="ts">
import { ref } from "vue"
import BoitePartieConcert from "@/components/BoitePartieConcert.vue"
import { apiStore } from '@/util/apiStore.ts'

const partieConcert = ref([])

apiStore.getAll('partie_concerts')
  .then(
    (res) => {
      console.log(res)
      partieConcert.value = res["member"]
    }
  )
</script>

<template>
  <h1 class="title">Liste des parties de concert.</h1>
  <div v-for="partie in partieConcert" :key="partie.id">
    <BoitePartieConcert :partie="partie"/>
  </div>
</template>

<style scoped>

</style>
