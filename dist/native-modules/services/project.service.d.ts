import { BcfProjectExtensions } from './../models/bcf.project.model';
import { AureliaBcf } from '../aurelia-bcf';
import { BcfApi } from '../bcf-api';
import { BcfProjectInterface } from '../models/index';
export declare class BcfProjectService {
    private api;
    private bcf;
    constructor(api: BcfApi, bcf: AureliaBcf);
    getProjects(): Promise<BcfProjectInterface[]>;
    getProject(projectId: string): Promise<BcfProjectInterface>;
    getProjectExtensions(projectId: string): Promise<BcfProjectExtensions>;
    createProject(body: BcfProjectInterface): Promise<BcfProjectInterface>;
    editProject(projectId: string, body: BcfProjectInterface): Promise<BcfProjectInterface>;
    deleteProject(projectId: string): Promise<void>;
}
