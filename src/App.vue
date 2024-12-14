

<template>
  <div id="wrapper">
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
</style>

<script setup lang="ts">
import {storeAuthentification} from "@/util/apiStore.ts";
import {Notifications, notify} from "@kyvg/vue3-notification";

function deconnexion(): void {
  storeAuthentification.logout().then(() => {
    notify({
      title: 'Déconnexion réussie',
      text: 'Vous êtes désormais déconnecté.',
      duration: 10000,
      type: 'success'
    })})
}

</script>
