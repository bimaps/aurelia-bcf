import { BcfViewpointInterface } from './../models/bcf.viewpoint.model';
import { BcfCommentInterface } from './../models/bcf.comment.model';
import { BcfTopicInterface, BcfProjectInterface } from '../models/index';
import { inject, bindable, computedFrom, customElement } from 'aurelia-framework';
import { AureliaBcf } from '../aurelia-bcf';
import { DOM } from 'aurelia-pal';

@customElement('bcf-comment')
@inject(AureliaBcf, Element)
export class Comment {
  
  @bindable projectId: string;
  @bindable topicId: string;
  @bindable commentId: string;

  constructor(private bcf: AureliaBcf, private element: HTMLElement) {}

  @computedFrom('projectId', 'bcf.state.bcf.projects', 'bcf.state.bcf.projects.length')
  get project(): BcfProjectInterface {
    if (!this.projectId) undefined;
    return this.bcf.state.bcf.projects.filter((project) => project.project_id === this.projectId)[0];
  }

  @computedFrom('projectId', 'topicId', 'bcf.state.bcf.topics', 'bcf.state.bcf.topics.length')
  get topic(): BcfTopicInterface {
    if (!this.projectId) return undefined;
    if (!this.topicId) return undefined;
    return this.bcf.state.bcf.topics.filter((topic) => topic.guid === this.topicId)[0];
  }

  @computedFrom('projectId', 'topicId', 'commentId', 'bcf.state.bcf.comments', 'bcf.state.bcf.comments.length')
  get comment(): BcfCommentInterface {
    if (!this.projectId) return undefined;
    if (!this.topicId) return undefined;
    if (!this.commentId) return undefined;
    return this.bcf.state.bcf.comments.filter((comment) => comment.guid === this.commentId)[0];
  }

  public viewpoint(viewpoint_guid: string): BcfViewpointInterface {
    return this.bcf.state.bcf.viewpoints.filter(viewpoint => viewpoint.guid === viewpoint_guid)[0];
  }

  public clickViewpoint(viewpoint_guid: string, event?) {
    if (event) event.stopPropagation();
    const viewpoint = this.bcf.state.bcf.viewpoints.filter(viewpoint => viewpoint.guid === viewpoint_guid)[0];
    const customEvent = DOM.createCustomEvent('viewpoint', {detail: viewpoint, bubbles: true});
    this.element.dispatchEvent(customEvent);
  }

  public clickEdit(viewpoint_guid: string, event?) {
    if (event) event.stopPropagation();
    const viewpoint = this.bcf.state.bcf.viewpoints.filter(viewpoint => viewpoint.guid === viewpoint_guid)[0];
    const customEvent = DOM.createCustomEvent('edit-comment', {detail: {comment: this.comment, viewpoint: viewpoint}, bubbles: true});
    this.element.dispatchEvent(customEvent);
  }

  
}
