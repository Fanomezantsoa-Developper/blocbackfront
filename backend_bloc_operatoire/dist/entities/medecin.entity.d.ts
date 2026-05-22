export declare enum RoleMedecin {
    CHIRURGIEN = "CHIRURGIEN",
    ANESTHESISTE = "ANESTHESISTE",
    MEDECIN_RESPONSABLE = "MEDECIN_RESPONSABLE",
    INFIRMIER = "INFIRMIER",
    TECHNICIEN = "TECHNICIEN",
    DIRECTEUR_MEDICAL = "DIRECTEUR_MEDICAL"
}
export declare enum OrdreProfessionnel {
    ONM = "ONM",
    ONIM = "ONIM",
    ONSFM = "ONSFM",
    ONPM = "ONPM",
    AUTRE = "AUTRE"
}
export declare class Medecin {
    id: string;
    nom: string;
    prenom: string;
    initiales: string;
    role: RoleMedecin;
    numeroOrdre: string;
    ordre: OrdreProfessionnel;
    telephone: string;
    email: string;
    matricule: string;
    createdAt: Date;
    updatedAt: Date;
}
