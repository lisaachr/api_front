<script setup lang="ts">
import { ref } from "vue";
import { apiStore } from "@/util/apiStore";
import { useRouter } from "vue-router";
import { notify } from "@kyvg/vue3-notification";

// Références pour les données de l'utilisateur et la validité des champs
const router = useRouter();
const newUser = ref({
  login: "",
  plainPassword: "",
  email: "",
  nom: "",
  prenom: "",
  villeHabitation: null,
  dateDeNaissance: "",
});

// États de validité pour chaque champ
const isValid = ref({
  login: true,
  plainPassword: true,
  email: true,
  nom: true,
  prenom: true,
  dateDeNaissance: true,
});

// Messages d'erreur
const errorMessages = ref({
  login: "",
  plainPassword: "",
  email: "",
  nom: "",
  prenom: "",
  dateDeNaissance: "",
});

const villes = ref([]);

// Récupération des villes
apiStore.getAll("villes").then((response) => {
  villes.value = response.member.map((ville: any) => ({
    id: ville.id,
    nom: ville.nom,
  }));
});

// Fonction de validation des champs
function validateForm() {
  let isFormValid = true;

  // Validation du login (non vide)
  if (!newUser.value.login) {
    isValid.value.login = false;
    errorMessages.value.login = "Le login est requis.";
    isFormValid = false;
  } else {
    isValid.value.login = true;
    errorMessages.value.login = "";
  }

  // Validation du mot de passe (minimum 6 caractères)
  if (newUser.value.plainPassword.length < 6) {
    isValid.value.plainPassword = false;
    errorMessages.value.plainPassword = "Le mot de passe doit comporter au moins 6 caractères.";
    isFormValid = false;
  } else {
    isValid.value.plainPassword = true;
    errorMessages.value.plainPassword = "";
  }

  // Validation de l'email (format valide)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(newUser.value.email)) {
    isValid.value.email = false;
    errorMessages.value.email = "L'email doit être valide.";
    isFormValid = false;
  } else {
    isValid.value.email = true;
    errorMessages.value.email = "";
  }

  // Validation du nom et prénom (non vide)
  if (!newUser.value.nom) {
    isValid.value.nom = false;
    errorMessages.value.nom = "Le nom est requis.";
    isFormValid = false;
  } else {
    isValid.value.nom = true;
    errorMessages.value.nom = "";
  }

  if (!newUser.value.prenom) {
    isValid.value.prenom = false;
    errorMessages.value.prenom = "Le prénom est requis.";
    isFormValid = false;
  } else {
    isValid.value.prenom = true;
    errorMessages.value.prenom = "";
  }

  // Validation de la date de naissance (non vide)
  if (!newUser.value.dateDeNaissance) {
    isValid.value.dateDeNaissance = false;
    errorMessages.value.dateDeNaissance = "La date de naissance est requise.";
    isFormValid = false;
  } else {
    isValid.value.dateDeNaissance = true;
    errorMessages.value.dateDeNaissance = "";
  }

  return isFormValid;
}

// Fonction de soumission du formulaire
function register(): void {
  if (validateForm()) {
    apiStore.createUser("users", newUser.value).then((res) => {
      if (res.success) {
        notify({
          type: "success",
          title: "Inscription réussie",
          text: "Bienvenue! Vous êtes maintenant inscrit avec le compte de " + newUser.value.prenom + " " + newUser.value.nom,
          duration: 10000
        });
        router.push({ name: 'api_front' });
      } else {

        notify({
          type: "error",
          title: "Erreur d'inscription",
          text: res.error,
          duration: 10000
        });
      }
    });
  }
}
</script>

<template>
  <div class="flex justify-center items-start min-h-screen pt-12">
    <div class="w-full max-w-sm p-6 border border-gray-300 rounded-md">
      <h3 class="text-3xl font-bold text-center text-teal-600 mb-6">Inscription</h3>
      <form @submit.prevent="register">
        <!-- Champ Login -->
        <div class="mb-4">
          <label for="login" class="block text-sm font-medium text-gray-700">Login</label>
          <input
            v-model="newUser.login"
            id="login"
            type="text"
            required
            :class="{
              'border-red-500': !isValid.login,
              'border-teal-600': isValid.login
            }"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
          <p v-if="!isValid.login" class="text-red-500 text-sm">{{ errorMessages.login }}</p>
        </div>

        <!-- Champ Mot de passe -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            v-model="newUser.plainPassword"
            id="password"
            type="password"
            required
            :class="{
              'border-red-500': !isValid.plainPassword,
              'border-teal-600': isValid.plainPassword
            }"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
          <p v-if="!isValid.plainPassword" class="text-red-500 text-sm">{{ errorMessages.plainPassword }}</p>
        </div>

        <!-- Champ Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Adresse email</label>
          <input
            v-model="newUser.email"
            id="email"
            type="email"
            required
            :class="{
              'border-red-500': !isValid.email,
              'border-teal-600': isValid.email
            }"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
          <p v-if="!isValid.email" class="text-red-500 text-sm">{{ errorMessages.email }}</p>
        </div>

        <!-- Champ Nom -->
        <div class="mb-4">
          <label for="nom" class="block text-sm font-medium text-gray-700">Nom</label>
          <input
            v-model="newUser.nom"
            id="nom"
            type="text"
            required
            :class="{
              'border-red-500': !isValid.nom,
              'border-teal-600': isValid.nom
            }"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
          <p v-if="!isValid.nom" class="text-red-500 text-sm">{{ errorMessages.nom }}</p>
        </div>

        <!-- Champ Prénom -->
        <div class="mb-4">
          <label for="prenom" class="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            v-model="newUser.prenom"
            id="prenom"
            type="text"
            required
            :class="{
              'border-red-500': !isValid.prenom,
              'border-teal-600': isValid.prenom
            }"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
          <p v-if="!isValid.prenom" class="text-red-500 text-sm">{{ errorMessages.prenom }}</p>
        </div>

        <!-- Champ Date de naissance -->
        <div class="mb-2">
          <label for="dateDeNaissance" class="block text-sm font-medium text-gray-700">Date de naissance</label>
          <input
            v-model="newUser.dateDeNaissance"
            id="dateDeNaissance"
            type="date"
            required
            :class="{
              'border-red-500': !isValid.dateDeNaissance,
              'border-teal-600': isValid.dateDeNaissance
            }"
            class="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-base"
          />
          <p v-if="!isValid.dateDeNaissance" class="text-red-500 text-sm">{{ errorMessages.dateDeNaissance }}</p>
        </div>

        <!-- Bouton d'inscription -->
        <button
          type="submit"
          class="w-full py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 text-xl mt-4"
        >
          S'inscrire
        </button>

      </form>
    </div>
  </div>
</template>
