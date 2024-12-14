<script setup lang="ts">
import {ref} from 'vue';
import {storeAuthentification} from "@/util/apiStore";
import { useRouter } from "vue-router";
import {notify} from "@kyvg/vue3-notification";

const router = useRouter();

const connectingUser = ref({
  login: "",
  plainPassword:""
});
function connect():void{
  storeAuthentification.login(connectingUser.value.login, connectingUser.value.plainPassword).then(res =>{
    if (res.success) {
      storeAuthentification.estConnecte = true
      router.push('api_front')
      notify({
        type: "success",
        title: "Connexion réussie",
        text: "Vous êtes désormais conncté(e) sur le profil de  " + connectingUser.value.login,
        duration: 10000
      })
    } else {
      router.push('connexion')
      notify({
        type: "error",
        title: "Connexion échouée",
        text: res.message || "Login et/ou mot de passe incorrects",
        duration: 10000
      })
      router.push('login')
    }
  })
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
        <input v-model="connectingUser.login" minlength="4" maxlength="20" required>
      </div>
      <div class="group">
        <label>Mot de passe</label>
        <input type="password" v-model="connectingUser.plainPassword" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,30}$">
      </div>
      <button type="submit">
        Connexion
      </button>
    </form>
  </div>
</template>

<style scoped>
  @import "@/components/css/form-style.css";
</style>
