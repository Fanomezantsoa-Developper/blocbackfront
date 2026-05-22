import { Role } from '../roles.enum';
export declare class RegisterDto {
    nom: string;
    email: string;
    motDePasse: string;
    role?: Role;
}
