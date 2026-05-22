import { RoleMedecin, OrdreProfessionnel } from '../../entities/medecin.entity';
export declare class CreateMedecinDto {
    nom: string;
    prenom: string;
    initiales: string;
    role: RoleMedecin;
    numeroOrdre: string;
    ordre: OrdreProfessionnel;
    telephone: string;
    email: string;
    matricule: string;
}
