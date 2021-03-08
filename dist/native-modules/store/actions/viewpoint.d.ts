import { State } from '../../store/state';
import { BcfViewpointInterface } from '../../models/bcf.viewpoint.model';
export declare function setViewpoints(state: State, viewpoints: Array<BcfViewpointInterface>, projectId: string, topicId: string): State;
export declare function setViewpoint(state: State, viewpoint: BcfViewpointInterface, projectId: string, topicId: string): State;
export declare function removeViewpoint(state: State, viewpointId: string): State;
export declare function registerViewpointActions(): void;
