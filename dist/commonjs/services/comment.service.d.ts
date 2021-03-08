import { BcfApi } from '../bcf-api';
import { AureliaBcf } from '../aurelia-bcf';
import { BcfCommentInterface } from '../models/index';
export declare class BcfCommentService {
    private api;
    private bcf;
    constructor(api: BcfApi, bcf: AureliaBcf);
    getComments(projectId: string, topicId: string): Promise<any>;
    getComment(projectId: string, topicId: string, commentId: string): Promise<any>;
    createComment(projectId: string, topicId: string, body: BcfCommentInterface): Promise<any>;
    editComment(projectId: string, topicId: string, commentId: string, body: BcfCommentInterface): Promise<any>;
    deleteComment(projectId: string, topicId: string, commentId: string): Promise<void>;
}
