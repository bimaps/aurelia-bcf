import { BcfApi } from '../bcf-api';
import { AureliaBcf } from '../aurelia-bcf';
import { BcfTopicInterface } from '../models/index';
export declare class BcfTopicService {
    private api;
    private bcf;
    constructor(api: BcfApi, bcf: AureliaBcf);
    getTopics(projectId: string): Promise<BcfTopicInterface[]>;
    getTopic(projectId: string, topicId: string): Promise<BcfTopicInterface>;
    createTopic(projectId: string, body: BcfTopicInterface): Promise<BcfTopicInterface>;
    editTopic(projectId: string, topicId: string, body: BcfTopicInterface): Promise<BcfTopicInterface>;
    deleteTopic(projectId: string, topicId: string): Promise<void>;
}
