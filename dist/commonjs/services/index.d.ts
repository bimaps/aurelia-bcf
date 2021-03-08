export * from './comment.service';
export * from './project.service';
export * from './topic.service';
export * from './viewpoint.service';
import { BcfProjectService } from './project.service';
import { BcfTopicService } from './topic.service';
import { BcfCommentService } from './comment.service';
import { BcfViewpointService } from './viewpoint.service';
declare const BcfServices: {
    project: BcfProjectService;
    topic: BcfTopicService;
    comment: BcfCommentService;
    viewpoint: BcfViewpointService;
};
export { BcfServices };
