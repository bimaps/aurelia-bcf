import { BcfProjectInterface } from '../models/index';
import { AureliaBcf } from '../aurelia-bcf';
export declare class TopicForm {
    private bcf;
    projectId: string;
    topicId: string;
    private instance;
    constructor(bcf: AureliaBcf);
    bind(): void;
    projectIdChanged(): void;
    topicIdChanged(): void;
    private init;
    private fetchProjectExtensions;
    private setNewInstance;
    private setInstanceFromState;
    private setInstanceFromApi;
    get project(): BcfProjectInterface;
}
