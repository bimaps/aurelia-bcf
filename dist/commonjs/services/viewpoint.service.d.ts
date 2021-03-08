import { BcfApi } from '../bcf-api';
import { AureliaBcf } from '../aurelia-bcf';
import { BcfViewpointInterface } from '../models/index';
export declare class BcfViewpointService {
    private api;
    private bcf;
    constructor(api: BcfApi, bcf: AureliaBcf);
    getViewpoints(projectId: string, topicId: string): Promise<any>;
    getViewpoint(projectId: string, topicId: string, viewpointId: string): Promise<any>;
    createViewpoint(projectId: string, topicId: string, body: BcfViewpointInterface): Promise<any>;
    editViewpoint(projectId: string, topicId: string, viewpointId: string, body: BcfViewpointInterface): Promise<any>;
    deleteViewpoint(projectId: string, topicId: string, viewpointId: string): Promise<void>;
}
