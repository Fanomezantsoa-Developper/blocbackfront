import { Repository } from 'typeorm';
import { ChecklistPendantOp } from '../entities/checklist-pendant-op.entity';
export declare class ChecklistPendantOpController {
    private repo;
    constructor(repo: Repository<ChecklistPendantOp>);
    create(dto: any): Promise<ChecklistPendantOp[]>;
    findAll(patientId?: string): Promise<ChecklistPendantOp[]>;
    findOne(id: string): Promise<ChecklistPendantOp | null>;
    update(id: string, dto: any): Promise<import("typeorm").UpdateResult>;
}
