import { MedecinService } from './medecin.service';
import { CreateMedecinDto } from './dto/create-medecin.dto';
import { UpdateMedecinDto } from './dto/update-medecin.dto';
export declare class MedecinController {
    private readonly service;
    constructor(service: MedecinService);
    create(d: CreateMedecinDto): Promise<import("../entities").Medecin>;
    findAll(r?: string, s?: string): Promise<{
        data: import("../entities").Medecin[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<import("../entities").Medecin>;
    update(id: string, d: UpdateMedecinDto): Promise<import("../entities").Medecin>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
