<script setup lang="ts">
import {useRoute} from 'vue-router';
import {ref, computed} from 'vue';
import type {EvenementMusical} from "@/types";
import {apiStore} from "@/util/apiStore";

const route = useRoute();
const id = route.params.id;

// Initialisation de l'événement
const evenement = ref<EvenementMusical>({
  id: Number(route.params.id),
  nom: "Chargement...",
  dateDeDebut: "Chargement...",
  dateDeFin: "Chargement...",
  prix: 0,
  adresse: "Chargement...",
  genreMusical: []
});

// Récupération des données de l'événement
apiStore.getById('evenement_musicals', id)
  .then(res => {
    evenement.value = res;
  })
  .catch(err => {
    console.error('Erreur lors de la récupération de l\'événement', err);
  });

// Définition des props
defineProps({
  genres: {
    type: String,
  },
});

// Mapping entre les genres et leurs images associées
const genreImageMap: Record<string, string> = {
  rock: "https://webinfo.iutmontp.univ-montp2.fr/~trouchex/img/nathanpowell%20rock.jpg",
  jazz: "https://webinfo.iutmontp.univ-montp2.fr/~trouchex/img/Jazz%20Band.jpg",
  classique: "https://example.com/classique-image.jpg",
  electro: "https://webinfo.iutmontp.univ-montp2.fr/~trouchex/img/electro.jpg",
  rap: "https://webinfo.iutmontp.univ-montp2.fr/~trouchex/img/%f0%9f%8e%a4.jpg",
  reggae: "https://webinfo.iutmontp.univ-montp2.fr/~trouchex/img/reggae-songs-graphic-art-silhouette.webp",
  blues: "https://webinfo.iutmontp.univ-montp2.fr/~trouchex/img/The-Blues-1024x865.jpg",
  metal: "https://webinfo.iutmontp.univ-montp2.fr/~trouchex/img/Metal.jpg",
  hipHop: "https://webinfo.iutmontp.univ-montp2.fr/~trouchex/img/HIP-HOP-1.jpg",
};

// Fonction pour convertir le genre musical de la base de données
const convertirGenre = (genre: any) => {
  if (typeof genre !== 'string') {
    console.error('Le genre musical n\'est pas une chaîne de caractères', genre);
    return '';  // Retourne une chaîne vide en cas de problème
  }

  const genreNormalise = genre.toLowerCase().replace(/\s+/g, '').replace('poprock', 'pop rock');
  const correspondances = {
    rock: 'rock',
    metal: 'metal',
    rap: 'rap',
    'pop rock': 'pop rock',
    jazz: 'jazz',
    blues: 'blues',
    classique: 'classique',
    electro: 'electro',
    reggae: 'reggae',
    'hip hop': 'hiphop',  // Correction de l'espace
  };

  return correspondances[genreNormalise];
};

// Récupération du genre musical de l'événement (le premier genre si plusieurs)
const genreMusicalPremier = computed(() => {
  if (evenement.value.genreMusical && evenement.value.genreMusical.length > 0) {
    return convertirGenre(evenement.value.genreMusical[0].nom);
  }
  return '';
});

// Source d'image pour l'événement
const imageSrc = computed(() => genreImageMap[genreMusicalPremier.value] != '' ?  genreImageMap[genreMusicalPremier.value] : 'https://webinfo.iutmontp.univ-montp2.fr/~trouchex/img/Metal.jpg');
</script>

<template>
  <div class="flex lg:flex-row flex-col gap-4 bg-surface-0 dark:bg-surface-900">
    <div class="card flex-1 flex items-center justify-center">
      <div class="card-img">
        <div class="img"></div>
      </div>
      <div class="card-title">
        <h1
          class="text-3xl lg:text-5xl font-bold text-surface-900 dark:text-surface-0 mb-4 lg:leading-normal text-center lg:text-left">
         <span class="text-primary">{{ evenement.nom }}</span>
        </h1>
      </div>
      <div class="card-subtitle">
        <p class="text-surface-700 dark:text-surface-200 leading-normal mb-8 text-center lg:text-left">
          {{ evenement.adresse }}
        </p>
      </div>
      <div class="card-subtitle">
        <p class="text-surface-700 dark:text-surface-200 leading-normal text-center lg:text-left">
          Du {{ evenement.dateDeDebut }} au {{ evenement.dateDeFin }}
        </p>
      </div>
      <hr class="card-divider">
      <div class="card-footer flex flex-[auto_1_1] space-x-2">
        <div class="card-price"><span>€</span>{{ evenement.prix }}</div>
        <button class="card-btn">
          S'inscire
        </button>
      </div>
    </div>
    <div class="flex-1 overflow-hidden p-2">
      <img
        v-if="imageSrc && imageSrc !== ''"
        :src="imageSrc"
        alt="Image de l'événement"
        class="h-full w-full object-cover lg:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)] max-h-[100vh] max-w-full"
      />
      <!-- Si imageSrc est null ou vide, afficher l'image par défaut -->
      <img
        v-else
        src="https://webinfo.iutmontp.univ-montp2.fr/~trouchex/img/Metal.jpg"
        alt="Image par défaut de l'événement"
        class="h-full w-full object-cover lg:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)] max-h-[100vh] max-w-full"
      />

    </div>
  </div>
</template>

<style scoped>
/* Card container */
.card {
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --main-color: #323232;
  --main-focus: #2d8cf0;
  width: 95vw;
  height: 50vh;
  background: var(--bg-color);
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem;
  margin: 1rem;
  gap: 10px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  box-sizing: border-box;
}

.card-img {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.card-img .img {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #228b22;
  background-image: linear-gradient(to top, transparent 10px, rgba(0,0,0,0.3) 10px, rgba(0,0,0,0.3) 13px, transparent 13px);
  border: 2px solid black;
}

.card-title {
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: var(--font-color);
}

.card-subtitle {
  font-size: 14px;
  font-weight: 400;
  color: var(--font-color-sub);
}

.card-price {
  font-size: 20px;
  font-weight: 500;
  color: var(--font-color);
}

.card-price span {
  font-size: 20px;
  font-weight: 500;
  color: var(--font-color-sub);
}

.card-btn {
  height: 35px;
  background: var(--bg-color);
  border: 2px solid var(--main-color);
  border-radius: 5px;
  padding: 0 15px;
  transition: all 0.3s;
}

.card-btn svg {
  width: 100%;
  height: 100%;
  fill: var(--main-color);
  transition: all 0.3s;
}

.card-btn:hover {
  border: 2px solid var(--main-focus);
}

.card-btn:hover svg {
  fill: var(--main-focus);
}

.card-btn:active {
  transform: translateY(3px);
}

/* Responsive layout adjustments */
@media (min-width: 1024px) {
  .card {
    width: 100%;
  }

  .card-img .img {
    width: 120px;
    height: 120px;
  }
}
</style>
