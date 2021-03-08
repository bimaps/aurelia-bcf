import { BcfTopicInterface, BcfProjectInterface, BcfCommentInterface } from '../models/index';
import { AureliaBcf } from '../aurelia-bcf';
import { EventAggregator } from 'aurelia-event-aggregator';
export declare class Topic {
    private bcf;
    private eventAggregator;
    projectId: string;
    topicId: string;
    hideTitle: boolean;
    constructor(bcf: AureliaBcf, eventAggregator: EventAggregator);
    bind(): void;
    projectIdChanged(): void;
    topicIdChanged(): void;
    private fetchTopic;
    private fetchComments;
    get project(): BcfProjectInterface;
    get topic(): BcfTopicInterface;
    get comments(): Array<BcfCommentInterface>;
}
