import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { ActivitePerOp } from '../entities/activite-per-op.entity';
import * as ExcelJS from 'exceljs';
export declare class ExportsService {
    private patientRepo;
    private activiteRepo;
    constructor(patientRepo: Repository<Patient>, activiteRepo: Repository<ActivitePerOp>);
    exportPatientsExcel(): Promise<ExcelJS.Buffer>;
    exportPlanningExcel(date: string): Promise<ExcelJS.Buffer>;
    exportPatientJSON(patientId: string): Promise<any>;
}
