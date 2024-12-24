export interface Utilisateur{
  id: number;
  email: string;
  login: string;
  nom: string;
  prenom: string;
  plainPassword: string;
  dateDeNaissance: string,
  evenementMusicals?: EvenementMusical[];
}

export interface EvenementMusical {
  id: number;
  nom: string;
  dateDeDebut: string;
  dateDeFin: string;
  prix: number;
  adresse: string;
  photo?: string;
  scenes?: Scene[];
  participants: { "@id": string }[]
}

export interface PartieConcert {
  id: number;
  artistePrincipal: boolean;
  dateDeDebut: string;
  dateDeFin: string;
  artiste: Utilisateur;
  nom: string;
}

export interface Scene {
  id: number;
  nom: string;
  nombreMaxParticipants: number;
  partieConcerts?: PartieConcert[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

