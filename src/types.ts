export interface Utilisateur{
  id: number;
  email: string;
  login: string;
  nom: string;
  prenom: string;
  villeHabitation: string
  dateDeNaissance: string
}

export interface EvenementMusical {
  id: number;
  nom: string;
  dateDeDebut: string;
  dateDeFin: string;
  prix: number;
  adresse: string;
}

export interface PartieConcert {
  id: number;
  artistePrincipal: boolean;
  dateDeDebut: string;
  dateDeFin: string;
}

export interface Scene {
  id: number;
  nom: string;
  nombreMaxParticipants: number;
}
