

<template>
  <div id="wrapper" v-if="loaded == true">
    <header>
      <h1 @click="$router.push({name: 'api_front'})" >Api front</h1>

      <nav>
        <div @click="$router.push({name: 'allEvents'})">Les evenements</div>
        <div @click="$router.push({name: 'allUsers'})" >Les membres</div>
        <div @click="$router.push({name: 'allScenes'})" >Les scenes</div>
        <div @click="$router.push({name: 'allPartieConcert'})" >Les parties de concerts</div>
        <div v-if="!storeAuthentification.estConnecte" @click="$router.push({name: 'inscription'})" >S'inscrire</div>
        <div v-if="!storeAuthentification.estConnecte" @click="$router.push({name: 'login'})" >Se connecter</div>
        <div v-if="storeAuthentification.estConnecte" @click="deconnexion" >Se déconnecter</div>
      </nav>
    </header>
    <main>
      <router-view />
      <Notifications />
    </main>
  </div>
  <div v-else class="loading-container">
    <i class="fa fa-spinner fa-spin"></i> Chargement en cours...
  </div>
</template>


<style scoped>
#wrapper{
  display:flex;
  flex-direction: column;
  align-items:center;
  min-height: 100vh;
  background-color: rgb(225, 235, 250);
}
header{
  width: 100%;
  position:sticky;
  top:0px;
  background-color: rgb(100, 210, 250);
  padding: 20px;
}
header h1{
  text-align: center;
  font-family: helvetica, serif;
  font-weight: 700;
}
nav{
  box-shadow: 0 0 0.5rem #999;
  display:flex;
  justify-content:space-evenly;
  width:80%;
  margin: 0 auto;
}

nav >div{
  padding:10px;
  background-color: rgb(105, 190, 250);
  flex-grow:1;
  text-align: center;
  border: solid #22A 1px;
}
nav >div:hover{
  box-shadow: 0 0 0.3rem #000;
  cursor: pointer;
}
main{
  max-width: 1280px;
  width:780px;
  padding: 10px;
  background-color: rgb(225, 240, 255);
  flex-grow:1;
}

@media (max-width: 800px) {
  main {
    width:80%;
  }
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #333;
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
}

.loading-container i {
  margin-right: 10px;
  font-size: 2rem;
  color: #007bff;
}
</style>

<script setup lang="ts">
import {storeAuthentification} from "@/util/apiStore.ts";
import {Notifications, notify} from "@kyvg/vue3-notification";
import {useRouter} from 'vue-router'
import {ref} from "vue"

const router = useRouter()
const loaded = ref(false)
function deconnexion(): void {
  storeAuthentification.logout().then(() => {
    notify({
      title: 'Déconnexion réussie',
      text: 'Vous êtes désormais déconnecté.',
      duration: 10000,
      type: 'success'
    })})
}

storeAuthentification.refresh()
  .then(() => {
    loaded.value = true
  })
</script>
