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
            return {success: false, error: reponseJSON.message}
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
            return {success: false, error: reponseJSON.message}
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
            return {success: false, error: reponseJSON.message}
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
  createRessource(
    ressource: string,
    data: never,
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
            return { success: false, error: reponseJSON.message }
          })
      }
    })
  },
  createUser(ressource: string,data: never,refreshAllowed = true): Promise<{ success: boolean, error?: string }>{
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
            return { success: false, error: reponseJSON.message }
          })
      }
    })
  },
  updateUser(ressource: string, userId: number, data: never, refreshAllowed = true): Promise<{ success: boolean, error?: string }> {
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
            if (response) {
              response.evenementMusicals = response.evenementMusicals.filter((event: never) =>
                !data.evenementMusicals.includes(event.id.toString())
              );
            }
            return { success: true, data: response }
          });
      } else if (reponsehttp.status === 401 && refreshAllowed) {
        return storeAuthentification.refresh().then(
          refreshResponse => {
            if (refreshResponse.success) {
              return this.updateUser(userId, data, false)
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
      console.log('Headers envoyés:', reponsehttp.headers);
      if (reponsehttp.ok) {
        return reponsehttp.json()
          .then(response => {
            if (response) {
              response.participants = response.participants.filter((user: never) =>
                !data.participants.includes(user.id)
              );
            }
            return { success: true, data: response }
          });
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
