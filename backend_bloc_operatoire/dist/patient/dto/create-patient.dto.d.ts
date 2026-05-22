import { PatientStatut, NiveauUrgence, Sexe } from '../../entities/patient.entity';
export declare class CreatePatientDto {
    nom: string;
    prenom: string;
    dateNaissance: string;
    sexe: Sexe;
    telephone: string;
    adresse: string;
    idDossier: string;
    groupeSanguin: string;
    libelle: string;
    risqueHemorragique: string;
    typeChirurgie: string;
    consignes: string;
    dateIntervention: string;
    alertes: string;
    prescripteurId: string;
    chirurgien_nom: string;
    niveauUrgence: NiveauUrgence;
    statut?: PatientStatut;
    chambre?: string;
}
