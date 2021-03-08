import { State } from '../../store/state';
import { BcfCommentInterface } from '../../models/bcf.comment.model';
export declare function setComments(state: State, comments: Array<BcfCommentInterface>, projectId: string, topicId: string): State;
export declare function setComment(state: State, comment: BcfCommentInterface, projectId: string, topicId: string): State;
export declare function removeComment(state: State, commentId: string): State;
export declare function registerCommentActions(): void;
