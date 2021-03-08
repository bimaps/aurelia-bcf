import { BcfTopicInterface, BcfProjectInterface, BcfCommentInterface } from '../models/index';
import { inject, bindable, computedFrom, customElement } from 'aurelia-framework';
import { AureliaBcf } from '../aurelia-bcf';
import { BcfServices } from '../services/index';
import { EventAggregator } from 'aurelia-event-aggregator';

@customElement('bcf-topic')
@inject(AureliaBcf, EventAggregator)
export class Topic {
  
  @bindable projectId: string;
  @bindable topicId: string;
  @bindable hideTitle: boolean = false;

  constructor(private bcf: AureliaBcf, private eventAggregator: EventAggregator) {}

  public bind() {
    this.fetchTopic();
    this.fetchComments();
  }

  public projectIdChanged() {
    this.fetchTopic();
    this.fetchComments();
  }

  public topicIdChanged() {
    this.fetchTopic();
    this.fetchComments();
  }

  private async fetchTopic() {
    if (!this.projectId || !this.topicId) return;
    await BcfServices.topic.getTopic(this.projectId, this.topicId);
    this.eventAggregator.publish('bcf:fetched-topic', {projectId: this.projectId, topicId: this.topicId});
  }

  private async fetchComments() {
    if (!this.projectId || !this.topicId) return;
    await BcfServices.viewpoint.getViewpoints(this.projectId, this.topicId);
    this.eventAggregator.publish('bcf:fetched-viewpoints', {projectId: this.projectId, topicId: this.topicId});
    await BcfServices.comment.getComments(this.projectId, this.topicId);
    this.eventAggregator.publish('bcf:fetched-comments', {projectId: this.projectId, topicId: this.topicId});

  }

  @computedFrom('projectId', 'bcf.state.bcf.projects', 'bcf.state.bcf.projects.length')
  get project(): BcfProjectInterface {
    if (!this.projectId) undefined;
    return this.bcf.state.bcf.projects.filter((project) => project.project_id === this.projectId)[0];
  }

  @computedFrom('projectId', 'topicId', 'bcf.state.bcf.topics', 'bcf.state.bcf.topics.length')
  get topic(): BcfTopicInterface {
    if (!this.topicId) return undefined;
    return this.bcf.state.bcf.topics.filter((topic) => topic.guid === this.topicId)[0];
  }

  @computedFrom('projectId', 'topicId', 'bcf.state.bcf.comments', 'bcf.state.bcf.comments.length', 'bcf.state.bcf.viewpoints.length')
  get comments(): Array<BcfCommentInterface> {
    if (!this.topicId) return [];
    const comments = this.bcf.state.bcf.comments.filter((comment) => comment._topicId === this.topicId);
    return comments;
  }



  
}
