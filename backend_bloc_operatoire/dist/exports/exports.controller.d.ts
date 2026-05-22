import type { Response } from 'express';
import { ExportsService } from './exports.service';
export declare class ExportsController {
    private readonly exportsService;
    constructor(exportsService: ExportsService);
    exportPatientsExcel(res: Response): Promise<void>;
    exportPlanningExcel(date: string, res: Response): Promise<void>;
    exportPatientJSON(id: string, res: Response): Promise<void>;
}
