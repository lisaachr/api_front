<script setup lang="ts">
import { ref } from "vue";
import BoiteEvenementMusical from "@/components/BoiteEvenement.vue";
import { apiStore } from "@/util/apiStore.ts";

const evenementsMusicals = ref([]);

apiStore.getAll("evenement_musicals").then((res) => {
  console.log(res);
  evenementsMusicals.value = res["member"].slice(0,2)
});
</script>

<template>
  <div class="homepage">
    <header class="header">
      <h1>Bienvenue sur MusicEvents</h1>
      <p>Votre plateforme officielle pour découvrir et participer aux meilleurs événements musicaux.</p>
    </header>

    <main class="main-content">
      <section class="intro">
        <h2>Découvrez nos événements</h2>
        <p>
          Parcourez notre sélection d'événements musicaux à venir et trouvez ceux qui vous correspondent. Inscrivez-vous en quelques clics et préparez-vous à vivre des expériences musicales uniques !
        </p>
      </section>

      <section class="events-list">
        <h2>Événements à venir</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <div
            v-for="evenement in evenementsMusicals"
            :key="evenement.id"
            class="dark:bg-gray-800 rounded-lg p-4"
          >
            <BoiteEvenementMusical :evenement="evenement" />
          </div>
        </div>
      </section>

      <section class="cta">
        <h2>Rejoignez-nous dès maintenant</h2>
        <p>
          Créez un compte pour accéder à plus d'événements et bénéficier d'une expérience personnalisée.
        </p>
        <button class="btn-primary">Créer un compte</button>
      </section>
    </main>

    <footer class="footer">
      <p>&copy; 2024 MusicEvents. Tous droits réservés.</p>
    </footer>
  </div>
</template>

<style scoped>
.homepage {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  text-align: center;
  padding: 0 20px;
}

.header {
  background-color: #ffffff;
  color: #333;
  padding: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.header h1 {
  margin: 0;
  font-size: 2rem;
  color: #0d9488;
}

.header p {
  margin: 10px 0 0;
  font-size: 1.2rem;
}

.main-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.intro, .events-list, .cta {
  margin-bottom: 40px;
  text-align: left;
}

.intro h2, .events-list h2, .cta h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #0d9488;
}

.events-list .event-items {
  list-style: none;
  padding: 0;
}

.events-list .event-item {
  background: #f9f9f9;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: box-shadow 0.2s;
}

.events-list .event-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.events-list .event-item h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #0d9488;
}

.events-list .event-item p {
  margin: 5px 0;
  font-size: 1rem;
  color: #666;
}

.events-list .event-item .btn-primary {
  background-color: #0d9488;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.events-list .event-item .btn-primary:hover {
  background-color: #0b786d;
}

.cta .btn-primary {
  background-color: #0d9488;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.cta .btn-primary:hover {
  background-color: #0b786d;
}

.footer {
  background-color: #ffffff;
  color: #333;
  padding: 10px 0;
  margin-top: 20px;
  border-top: 1px solid #ddd;
}

.footer p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}
</style>
