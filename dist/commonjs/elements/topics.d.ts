import { BcfTopicInterface } from '../models/index';
import { AureliaBcf } from '../aurelia-bcf';
import { EventAggregator } from 'aurelia-event-aggregator';
export declare class Topics {
    private bcf;
    private element;
    private eventAggregator;
    projectId: string;
    constructor(bcf: AureliaBcf, element: HTMLElement, eventAggregator: EventAggregator);
    bind(): void;
    projectIdChanged(): void;
    private fetchTopics;
    get topics(): BcfTopicInterface[];
    projectName(projectId: string): string;
    clickTopic(topic: BcfTopicInterface, event?: any): void;
}
