<script setup lang="ts">
import {ref} from "vue";
import {apiStore} from "@/util/apiStore";
import { useRouter } from "vue-router";
import {notify} from "@kyvg/vue3-notification";

const router = useRouter();

const newUser = ref({
  login: "",
  plainPassword: "",
  email: "",
  nom: "",
  prenom: "",
  villeHabitation: "",
  dateDeNaissance: "",
});

function register(): void {
  apiStore.createUser("users", newUser.value).then((res) => {
    if (res.success) {
      notify({
        type: "success",
        title: "Inscription réussie",
        text: "Bienvenue! Vous êtes maintenant inscrit avec le compte de " + newUser.value.prenom + " " + newUser.value.nom,
        duration: 10000
      });
      router.push({ name: 'api_front' });
    }
    else{
      notify({
        type: "error",
        title: "Erreur d'inscription",
        text: "Vérifiez que le mot de passe soit correct ou que les informations rentrées soient correctes",
        duration: 10000
      });
    }
  })
}
</script>

<template>
  <form @submit.prevent="register">
      <h3>Inscription</h3>
      <div class="group">
        <label>Login</label>
        <input v-model="newUser.login" type="text" minlength="4" maxlength="20" required />
      </div>
      <div class="group">
        <label>Password</label>
        <input v-model="newUser.plainPassword" type="password" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,30}$"/>
      </div>
      <div class="group">
        <label>Adresse email</label>
        <input v-model="newUser.email" type="email" required />
      </div>
      <div class="group">
        <label>Nom</label>
        <input v-model="newUser.nom" type="text" required />
      </div>
      <div class="group">
        <label>Prenom</label>
        <input v-model="newUser.prenom" type="text" required />
      </div>
      <div class="group">
        <label>Ville</label>
        <input v-model="newUser.villeHabitation" type="text" required />
      </div>
      <div class="group">
        <label>Date de naissance</label>
        <input v-model="newUser.dateDeNaissance" type="date" required />
      </div>
      <div>
        <button type="submit">S'inscrire</button>
      </div>
  </form>
</template>

<style scoped>
  @import "@/components/css/form-style.css";
</style>
