import { State } from '../../store/state';
import { BcfTopicInterface } from '../../models/bcf.topic.model';
export declare function setTopics(state: State, topics: Array<BcfTopicInterface>, projectId: string): State;
export declare function setTopic(state: State, topic: BcfTopicInterface, projectId: string): State;
export declare function removeTopic(state: State, topicId: string): State;
export declare function registerTopicActions(): void;
