<script setup lang="ts">
import {ref} from 'vue';
import {storeAuthentification} from "@/util/apiStore";
const connectingUser = ref({
  login: "",
  plainPassword:""
});
function connect():void{
  storeAuthentification.login(connectingUser.value.login, connectingUser.value.plainPassword);
}
</script>

<template>
  <div class="wrapper">
    <div class="top">
      <h3>Connexion</h3>
    </div>
    <form @submit.prevent="connect" class="content">
      <div class="group">
        <label>Login</label>
        <input v-model="connectingUser.login" >
      </div>
      <div class="group">
        <label>Mot de passe</label>
        <input type="password" v-model="connectingUser.plainPassword" >
      </div>
      <button type="submit">
        Connexion
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>
