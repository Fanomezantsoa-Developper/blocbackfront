import { Role } from '../auth/roles.enum';
export declare class User {
    id: string;
    nom: string;
    email: string;
    motDePasse: string;
    role: Role;
    createdAt: Date;
    hashPassword(): Promise<void>;
}
