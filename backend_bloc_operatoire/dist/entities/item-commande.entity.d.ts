import { BonCommandeAnesthesie } from './bon-commande-anesthesie.entity';
export declare class ItemCommande {
    id: string;
    nom: string;
    selectionne: boolean;
    quantite: string;
    dosage: string;
    observation: string;
    bonCommande: BonCommandeAnesthesie;
}
