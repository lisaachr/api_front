import { reactive } from 'vue'

export const storeAuthentification = reactive({
  apiUrl: "http://localhost/api_rest/public/api/",
  utilisateurConnecte: null,
  estConnecte: false,
  login (login:string, password:string):Promise<{ success: boolean, error?: string }>{
    return fetch(this.apiUrl+'auth',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({login:login, password:password}),
      }
    ).then(reponsehttp => {
      if (!reponsehttp.ok) {
        return reponsehttp.json()
          .then(reponseJSON => {
            this.estConnecte = false
            return {success: false, error: reponseJSON.detail}
          })
      } else {
        return reponsehttp.json()
          .then(reponseJSON => {
            this.utilisateurConnecte = reponseJSON
            this.estConnecte = true
            return {success: true}
          })
      }
    })
  },
  // les autres méthodes
  logout(): Promise<{ success: boolean, error?: string }>{
    return fetch(this.apiUrl+'token/invalidate',{
      method: "POST",
      credentials:'include'
    }).then(reponsehttp => {
      if (!reponsehttp.ok) {
        return reponsehttp.json()
          .then(reponseJSON => {
            this.utilisateurConnecte = reponseJSON
            this.estConnecte = true
            return {success: false, error: reponseJSON.detail}
          })
      } else {
        return reponsehttp.json()
          .then(() => {
            this.estConnecte = false
            this.utilisateurConnecte = null
            return {success: true}
          })
      }
    })
  },
  refresh (): Promise<{ success: boolean, error?: string }> {
    return fetch(this.apiUrl+'token/refresh',
      {
        method: "POST",
        credentials: 'include',
      }
    ).then(reponsehttp => {
      if (!reponsehttp.ok) {
        return reponsehttp.json()
          .then(reponseJSON => {
            this.estConnecte = false
            return {success: false, error: reponseJSON.detail}
          })
      } else {
        return reponsehttp.json()
          .then(reponseJSON => {
            console.log(reponseJSON)
            this.utilisateurConnecte = reponseJSON
            this.estConnecte = true
            return {success: true}
          })
      }
    })
  }

})

export const apiStore = {
  apiUrl: "http://localhost/api_rest/public/api/",

  getAll(ressource:string):Promise<any>{
    return fetch(this.apiUrl+ressource)
      .then(reponsehttp => reponsehttp.json())
  },
  //à compléter plus tard avec les autres appels à l'API
  getById(ressource:string, id:number):Promise<any>{
    return fetch(this.apiUrl+ressource+'/'+id)
      .then(reponsehttp => reponsehttp.json())
  },
  createRessource<T>(
    ressource: string,
    data: T, // Utilisation du type générique T pour data
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
  createUser(ressource: string,data: any,refreshAllowed = true): Promise<{ success: boolean, error?: string }>{
    return fetch(this.apiUrl + ressource, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }).then(reponsehttp => {
      if (reponsehttp.ok) {
        return reponsehttp.json()
          .then(() => {
            return { success: true }
          })
      } else if (reponsehttp.status === 401 && refreshAllowed) {
        return storeAuthentification.refresh().then(
          refreshResponse => {
            if (refreshResponse.success) {
              return this.createRessource(ressource, data, false)
            } else {
              return { success: false, error: "unauthorized, failure to refresh token." }
            }
          }
        )
      } else {
        return reponsehttp.json()
          .then(reponseJSON => {
            return { success: false, error: reponseJSON.detail }
          })
      }
    })
  },
  updateUser(ressource: string, data: any): Promise<{success:boolean, error?: string}> {
    return fetch(this.apiUrl + ressource , {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }).then(reponsehttp => {
      if (reponsehttp.ok) {
        return reponsehttp.json()
          .then(() => {
            storeAuthentification.utilisateurConnecte = data
            return { success: true };
          });
      } else if (reponsehttp.status === 401) {
        return storeAuthentification.refresh().then(
          refreshResponse => {
            if (refreshResponse.success) {
              return this.updateUser(ressource, data);
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
  updateEvent(ressource: string, eventId: number, data: never, refreshAllowed = true): Promise<{ success: boolean, error?: string }> {
    return fetch(this.apiUrl + ressource + '/' + eventId, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }).then(reponsehttp => {
      if (reponsehttp.ok) {
        return reponsehttp.json()
          .then(() => {
            return { success: true }
          })
      } else if (reponsehttp.status === 401 && refreshAllowed) {
        return storeAuthentification.refresh().then(
          refreshResponse => {
            if (refreshResponse.success) {
              return this.updateEvent(eventId, data, false)
            } else {
              return { success: false, error: "unauthorized, failure to refresh token." }
            }
          }
        )
      } else {
        return reponsehttp.json()
          .then(reponseJSON => {
            return { success: false, error: reponseJSON.message }
          })
      }
    })
  }


}
