import { State } from '../../store/state';
import { BcfProjectInterface } from '../../models/bcf.project.model';
export declare function setProjects(state: State, projects: Array<BcfProjectInterface>): State;
export declare function setProject(state: State, project: BcfProjectInterface): State;
export declare function setProjectExtensions(state: State, extensions: any, projectId: string): State;
export declare function removeProject(state: State, projectId: string): State;
export declare function registerProjectActions(): void;
