<template>
  <form @submit.prevent="updateProfile">
    <h3>Modification du profil</h3>

    <div class="group">
      <label>Login</label>
      <input v-model="currentUser.login" type="text" minlength="4" maxlength="20" required />
    </div>

    <div class="group">
      <label>Password</label>
      <input v-model="currentUser.plainPassword" type="password" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,30}$"/>
    </div>

    <div class="group">
      <label>Adresse email</label>
      <input v-model="currentUser.email" type="email" required />
    </div>

    <div class="group">
      <label>Nom</label>
      <input v-model="currentUser.nom" type="text" required />
    </div>

    <div class="group">
      <label>Prenom</label>
      <input v-model="currentUser.prenom" type="text" required />
    </div>

    <div class="group">
      <label>Ville</label>
      <select v-model="currentUser.villeHabitation" @change="updateVilleDetails" required>
        <option v-for="ville in villes" :key="ville.id" :value="ville.id">
          {{ ville.nom }}
        </option>
      </select>
    </div>

    <!-- Affichage des détails de la ville dans un sous-carré -->
    <div v-if="currentUser.villeHabitation" class="city-details">
      <p><strong>Nom:</strong> {{ villeDetails.nom }}</p>
      <p><strong>Code Postal:</strong> {{ villeDetails.codePostal }}</p>
      <p><strong>Département:</strong> {{ villeDetails.departement }}</p>
      <p><strong>Pays:</strong> {{ villeDetails.pays }}</p>
    </div>

    <div class="group">
      <label>Date de naissance</label>
      <input v-model="currentUser.dateDeNaissance" type="date" required />
    </div>

    <div>
      <button type="submit">Mettre à jour le profil</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { apiStore } from "@/util/apiStore";
import { useRouter } from "vue-router";
import { notify } from "@kyvg/vue3-notification";

const router = useRouter();

const currentUser = ref({
  login: "",
  plainPassword: "",
  email: "",
  nom: "",
  prenom: "",
  villeHabitation: null,
  dateDeNaissance: "",
});

const villes = ref([]);
const villeDetails = ref({
  nom: "",
  codePostal: "",
  departement: "",
  pays: "",
});

apiStore.getAll("villes").then((response) => {
  villes.value = response.member.map((ville: any) => ({
    id: ville.id,
    nom: ville.nom,
    codePostal: ville.codePostal,
    departement: ville.departement,
    pays: ville.pays,
  }));
});

onMounted(() => {
  apiStore.getById("users", 1).then((response) => {
    currentUser.value = {
      login: response.login,
      plainPassword: "",
      email: response.email,
      nom: response.nom,
      prenom: response.prenom,
      villeHabitation: response.villeHabitation.id,
      dateDeNaissance: response.dateDeNaissance,
    };

    const selectedVille = villes.value.find(ville => ville.id === currentUser.value.villeHabitation);
    if (selectedVille) {
      villeDetails.value = {
        nom: selectedVille.nom,
        codePostal: selectedVille.codePostal,
        departement: selectedVille.departement,
        pays: selectedVille.pays,
      };
    }
  });
});

function updateProfile(): void {
  apiStore.updateUser("users", currentUser.value).then((res) => {
    if (res.success) {
      notify({
        type: "success",
        title: "Profil mis à jour",
        text: "Votre profil a été mis à jour avec succès.",
        duration: 10000,
      });
      router.push({ name: 'api_front' });
    } else {
      notify({
        type: "error",
        title: "Erreur de mise à jour",
        text: "Une erreur est survenue lors de la mise à jour de votre profil.",
        duration: 10000,
      });
    }
  });
}

function updateVilleDetails(): void {
  const selectedVille = villes.value.find(ville => ville.id === currentUser.value.villeHabitation);
  if (selectedVille) {
    villeDetails.value = {
      nom: selectedVille.nom,
      codePostal: selectedVille.codePostal,
      departement: selectedVille.departement,
      pays: selectedVille.pays,
    };
  }
}
</script>

<style scoped>
.group {
  margin-bottom: 10px;
}

.city-details {
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.city-details p {
  margin: 5px 0;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>
