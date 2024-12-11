<script setup lang="ts">
// import type {Utilisateur} from "@/types.ts"
import { ref} from "vue"
import BoiteUtilisateur from "@/components/BoiteUtilisateur.vue"
import { apiStore } from '@/util/apiStore.ts'

const users = ref([])

apiStore.getAll('users')
  .then(
    (res) => {
      console.log(res)
      users.value = res["member"]
    }
  )

</script>

<template>
  <h1 class="title">Liste des utilisateurs.</h1>
  <div v-for="user in users" :key="user.id">
    <BoiteUtilisateur :utilisateur="user"/>
  </div>
</template>

<style scoped>

</style>
