import { Repository } from 'typeorm';
import { ChecklistApresOp } from '../entities/checklist-apres-op.entity';
export declare class ChecklistApresOpController {
    private repo;
    constructor(repo: Repository<ChecklistApresOp>);
    create(dto: any): Promise<ChecklistApresOp[]>;
    findAll(patientId?: string): Promise<ChecklistApresOp[]>;
    findOne(id: string): Promise<ChecklistApresOp | null>;
    update(id: string, dto: any): Promise<import("typeorm").UpdateResult>;
}
