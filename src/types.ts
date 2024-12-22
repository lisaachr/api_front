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
  photo?: string;
  scenes?: Scene[];
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
