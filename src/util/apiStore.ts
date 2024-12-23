import { reactive } from 'vue';
import type { Utilisateur } from "@/types.ts";

export const storeAuthentification = reactive({
  apiUrl: "https://webinfo.iutmontp.univ-montp2.fr/~trouchex/api_rest/public/api",
  utilisateurConnecte: null,
  estConnecte: false,

  login(login: string, password: string): Promise<{ success: boolean, error?: string }> {
    return fetch(this.apiUrl + 'auth', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ login: login, password: password }),
    }).then(reponsehttp => {
      if (!reponsehttp.ok) {
        return reponsehttp.json().then(reponseJSON => {
          this.estConnecte = false;
          return { success: false, error: reponseJSON.detail };
        });
      } else {
        return reponsehttp.json().then(reponseJSON => {
          this.utilisateurConnecte = reponseJSON;
          this.estConnecte = true;
          return { success: true };
        });
      }
    });
  },

  logout(): Promise<{ success: boolean, error?: string }> {
    return fetch(this.apiUrl + 'token/invalidate', {
      method: "POST",
      credentials: 'include'
    }).then(reponsehttp => {
      if (!reponsehttp.ok) {
        return reponsehttp.json().then(reponseJSON => {
          this.utilisateurConnecte = reponseJSON;
          this.estConnecte = true;
          return { success: false, error: reponseJSON.detail };
        });
      } else {
        return reponsehttp.json().then(() => {
          this.estConnecte = false;
          this.utilisateurConnecte = null;
          return { success: true };
        });
      }
    });
  },

  refresh(): Promise<{ success: boolean, error?: string }> {
    return fetch(this.apiUrl + 'token/refresh', {
      method: "POST",
      credentials: 'include',
    }).then(reponsehttp => {
      if (!reponsehttp.ok) {
        return reponsehttp.json().then(reponseJSON => {
          this.estConnecte = false;
          return { success: false, error: reponseJSON.detail };
        });
      } else {
        return reponsehttp.json().then(reponseJSON => {
          this.utilisateurConnecte = reponseJSON;
          this.estConnecte = true;
          return { success: true };
        });
      }
    });
  }
});

export const apiStore = {
  apiUrl: "https://webinfo.iutmontp.univ-montp2.fr/~trouchex/api_rest/public/api",

  // Correction : Typage de getAll pour retourner une promesse avec un tableau générique
  getAll<T>(ressource: string): Promise<T[]> {
    return fetch(this.apiUrl + ressource)
      .then(reponsehttp => reponsehttp.json());
  },

  // Correction : getById avec typage générique T
  getById<T>(ressource: string, id: number): Promise<T> {
    return fetch(this.apiUrl + ressource + '/' + id)
      .then(reponsehttp => reponsehttp.json());
  },

  createRessource<T>(
    ressource: string,
    data: T,
    refreshAllowed = true
  ): Promise<{ success: boolean, error?: string }> {
    return fetch(this.apiUrl + ressource, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: data }),
      credentials: 'include',
    }).then(reponsehttp => {
      if (reponsehttp.ok) {
        return reponsehttp.json().then(() => {
          return { success: true };
        });
      } else if (reponsehttp.status === 401 && refreshAllowed) {
        return storeAuthentification.refresh().then(
          refreshResponse => {
            if (refreshResponse.success) {
              return this.createRessource(ressource, data, false);
            } else {
              return { success: false, error: "unauthorized, failure to refresh token." };
            }
          }
        );
      } else {
        return reponsehttp.json().then(reponseJSON => {
          return { success: false, error: reponseJSON.detail };
        });
      }
    });
  },

  createUser(ressource: string, data: Utilisateur, refreshAllowed = true): Promise<{ success: boolean, error?: string }> {
    return fetch(this.apiUrl + ressource, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }).then(reponsehttp => {
      if (reponsehttp.ok) {
        return reponsehttp.json().then(() => {
          return { success: true };
        });
      } else if (reponsehttp.status === 401 && refreshAllowed) {
        return storeAuthentification.refresh().then(
          refreshResponse => {
            if (refreshResponse.success) {
              return this.createRessource(ressource, data, false);
            } else {
              return { success: false, error: "unauthorized, failure to refresh token." };
            }
          }
        );
      } else {
        return reponsehttp.json().then(reponseJSON => {
          return { success: false, error: reponseJSON.detail };
        });
      }
    });
  },

  updateUser(ressource: string, userId: number, data: Utilisateur, refreshAllowed = true): Promise<{ success: boolean, error?: string }> {
    return fetch(this.apiUrl + ressource + '/' + userId, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }).then(reponsehttp => {
      if (reponsehttp.ok) {
        return reponsehttp.json()
          .then(response => {
            // Si l'objet `Utilisateur` n'a pas `evenementMusicals`, il faut corriger
            // Suppression de la ligne qui essaie d'accéder à `evenementMusicals`
            return { success: true, data: response };
          });
      } else if (reponsehttp.status === 401 && refreshAllowed) {
        return storeAuthentification.refresh().then(
          refreshResponse => {
            if (refreshResponse.success) {
              return this.updateUser(ressource, userId, data, false);
            } else {
              return { success: false, error: "unauthorized, failure to refresh token." };
            }
          }
        );
      } else {
        return reponsehttp.json()
          .then(reponseJSON => {
            return { success: false, error: reponseJSON.detail };
          });
      }
    });
  },
  updateEvent<T>(
    ressource: string,
    eventId: number,
    data: Partial<T>,
    refreshAllowed = true
  ): Promise<{ success: boolean; error?: string }> {
    return fetch(`${this.apiUrl}${ressource}/${eventId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((updatedData) => ({
            success: true,
            data: updatedData,
          }));
        } else if (response.status === 401 && refreshAllowed) {
          return storeAuthentification.refresh().then((refreshResponse) => {
            if (refreshResponse.success) {
              return this.updateEvent(ressource, eventId, data, false);
            } else {
              return { success: false, error: "Unauthorized, token refresh failed." };
            }
          });
        } else {
          return response.json().then((errorData) => ({
            success: false,
            error: errorData.detail || "Erreur inconnue.",
          }));
        }
      })
      .catch((error) => ({
        success: false,
        error: error.message || "Erreur réseau.",
      }));
  }

};
