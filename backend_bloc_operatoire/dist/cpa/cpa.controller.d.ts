import { CPAService } from './cpa.service';
import { CreateCPADto } from './dto/create-cpa.dto';
import { UpdateCPADto } from './dto/update-cpa.dto';
export declare class CPAController {
    private readonly service;
    constructor(service: CPAService);
    create(d: CreateCPADto): Promise<import("../entities").CPA>;
    findAll(p?: number, l?: number): Promise<{
        data: import("../entities").CPA[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<import("../entities").CPA>;
    update(id: string, d: UpdateCPADto): Promise<import("../entities").CPA>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
