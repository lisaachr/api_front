# LiveGroove - Gestion des Événements Musicaux

**LiveGroove** est une application web front-end pour la gestion des événements musicaux. Elle permet aux utilisateurs de découvrir des événements, de gérer des scènes et des concerts, ainsi que de s'inscrire ou se désinscrire à des événements. L'application offre également une gestion complète des utilisateurs, y compris l'inscription, la connexion, et la modification des profils.

## 🚀 Fonctionnalités principales

### 1. **Gestion des Événements Musicaux**
- Affichage de **tous les événements musicaux** disponibles.
- **Création et gestion de scènes** pour chaque événement.
- **Organisation des concerts** : chaque événement est divisé en **parties de concert** permettant une meilleure répartition des artistes et des performances.
- Chaque scène peut accueillir un **nombre maximum de participants**.

### 2. **Gestion des Utilisateurs**
- **Inscription des utilisateurs** pour créer un compte sur la plateforme.
- **Connexion et déconnexion** des utilisateurs pour accéder à leurs informations et participer à des événements.
- **Modification du profil** utilisateur : mise à jour des informations personnelles.
- **Inscription et désinscription** des utilisateurs à des événements musicaux.

### 3. **Sécurisation et Gestion de la Session**
- **Rafraîchissement automatique du token d'authentification** si celui-ci expire pendant la navigation.
- **Messages flash** : retour utilisateur sous forme de messages pour les actions réussies ou les erreurs (ex : "Utilisateur inscrit avec succès", "Erreur lors de l'inscription", etc.).


## 🎯 Répartition des tâches

### Lisa :
- **Style général** de l'application.
- **Gestion des scènes** et des concerts.
- **Maintenabilité de la connexion** : gestion du rafraîchissement du token d'authentification.
- **Gestion des messages flash** (retour utilisateur sous forme de messages d'alertes).

### Maxime :
- **Connexion et déconnexion** des utilisateurs.
- **Inscription et désinscription** aux événements.
- **Inscription des utilisateurs**

### Xavier :
- **Affichage des événements** : l'affichage des données de la page des événements.
- **Base de données** : création des entités.

## 💻 Commandes disponibles

### Lancer l'application en mode développement

```sh
npm run dev


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
