<template>
  <div id="wrapper">
    <header class="bg-white sticky top-0 z-50">
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex-1 md:flex md:items-center md:gap-12">
            <a class="block text-teal-600 cursor-pointer" @click="$router.push({name: 'api_front'})">
              <span class="sr-only">Home</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 14 14">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M3.763 13.5c-1.883-.75-2.071-2.435-1.916-3.833c.107-.97.911-1.584 1.865-1.584c.895 0 2.708.004 2.708.004c.684.053 1.18.676 1.115 1.349c-.1 1.036-1.324 1.148-2.147 1.356c.631.29 1.87 1.095 1.776 1.98"/>
                  <path
                    d="m10.263 13.5l.453-.453a4 4 0 0 0 1.172-2.829V4.021c0-.748-.607-1.354-1.354-1.354v0c-.748 0-1.355.606-1.355 1.354V7c-1.615-.726-2.014-.798-3.791-.542V1.854C5.388 1.106 4.782.5 4.034.5v0c-.748 0-1.355.606-1.355 1.354v6.478"/>
                </g>
              </svg>
            </a>
          </div>

          <div class="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" class="hidden md:block">
              <div class="flex items-center gap-6 text-sm cursor-pointer">
                <div @click="$router.push({name: 'allEvents'})">Les evenements</div>
                <div @click="$router.push({name: 'allUsers'})">Les membres</div>
                <div @click="$router.push({name: 'allScenes'})">Les scenes</div>
                <div @click="$router.push({name: 'allPartieConcert'})">Les parties de concerts</div>
              </div>
            </nav>

            <div class="flex items-center gap-4">
              <div class="sm:flex sm:gap-4">
                <a
                  class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer"
                  v-if="!storeAuthentification.estConnecte" @click="$router.push({name: 'inscription'})">S'inscrire
                </a>

                <div class="hidden sm:flex">
                  <a
                    class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 cursor-pointer"
                    v-if="!storeAuthentification.estConnecte" @click="$router.push({name: 'login'})">Se connecter
                  </a>
                </div>
                <div class="hidden sm:flex">
                  <a
                    class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 cursor-pointer"
                    v-if="storeAuthentification.estConnecte" @click="deconnexion">Se déconnecter
                  </a>
                </div>
              </div>

              <div class="block md:hidden">
                <button class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <router-view/>
      <Notifications/>
    </main>
  </div>
</template>

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
    })
  })
}

</script>
