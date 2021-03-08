export * from './comment.service';
export * from './project.service';
export * from './topic.service';
export * from './viewpoint.service';

import { BcfProjectService } from './project.service'; 
import { BcfTopicService } from './topic.service'; 
import { BcfCommentService } from './comment.service'; 
import { BcfViewpointService } from './viewpoint.service'; 

import { Container } from 'aurelia-framework';

const BcfServices: {
  project: BcfProjectService,
  topic: BcfTopicService,
  comment: BcfCommentService,
  viewpoint: BcfViewpointService,
} = {
  project: Container.instance.get(BcfProjectService),
  topic: Container.instance.get(BcfTopicService),
  comment: Container.instance.get(BcfCommentService),
  viewpoint: Container.instance.get(BcfViewpointService),
}

export { BcfServices };
