import { BcfTopicInterface, BcfProjectInterface } from '../models/index';
import { inject, bindable, bindingMode, computedFrom, customElement } from 'aurelia-framework';
import { AureliaBcf } from '../aurelia-bcf';
import { BcfServices } from '../services/index';

@customElement('bcf-topic-form')
@inject(AureliaBcf)
export class TopicForm {
  
  @bindable projectId: string;
  @bindable topicId: string; // if provided, the form is an edit form, otherwise create

  @bindable({defaultBindingMode: bindingMode.twoWay}) private instance: BcfTopicInterface;

  constructor(private bcf: AureliaBcf) {}

  public bind() {
    this.init()
  }

  public projectIdChanged() {
    this.init()
  }

  public topicIdChanged() {
    this.init()
  }

  private init() {
    this.fetchProjectExtensions();
    if (this.topicId) {
      this.setInstanceFromState();
    } else {
      this.setNewInstance();
    }
  }

  private fetchProjectExtensions(force: boolean = false) {
    if (!this.projectId) return;
    if (!force) {
      // check if we already have the extensions in state
      // if yes, then we don't fetch again
      for (let project of this.bcf.state.bcf.projects) {
        if (project.project_id === this.projectId && project.extensions !== undefined) return;
      }
    }
    BcfServices.project.getProjectExtensions(this.projectId);
  }

  private setNewInstance() {
    this.instance = {
      guid: '',
      title: ''
    };
  }

  private setInstanceFromState() {
    this.instance = this.bcf.state.bcf.topics.filter(topic => topic.guid === this.topicId)[0];
    if (!this.instance) {
      this.setInstanceFromApi();
    }
  }

  private async setInstanceFromApi() {
    const topic = await BcfServices.topic.getTopic(this.projectId, this.topicId);
    if (!topic) {
      this.bcf.warn('Topic not found, cannot display the form');
    }
  }

  @computedFrom('projectId', 'bcf.state.bcf.projects')
  get project(): BcfProjectInterface {
    if (!this.projectId) return undefined;
    return this.bcf.state.bcf.projects.filter((project) => project.project_id === this.projectId)[0];
  }

}
