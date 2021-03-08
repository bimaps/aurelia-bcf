import { BcfViewpointInterface } from './../models/bcf.viewpoint.model';
import { BcfCommentInterface } from './../models/bcf.comment.model';
import { BcfTopicInterface, BcfProjectInterface } from '../models/index';
import { AureliaBcf } from '../aurelia-bcf';
export declare class Comment {
    private bcf;
    private element;
    projectId: string;
    topicId: string;
    commentId: string;
    constructor(bcf: AureliaBcf, element: HTMLElement);
    get project(): BcfProjectInterface;
    get topic(): BcfTopicInterface;
    get comment(): BcfCommentInterface;
    viewpoint(viewpoint_guid: string): BcfViewpointInterface;
    clickViewpoint(viewpoint_guid: string, event?: any): void;
    clickEdit(viewpoint_guid: string, event?: any): void;
}
