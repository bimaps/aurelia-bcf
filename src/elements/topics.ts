import { BcfTopicInterface } from '../models/index';
import { inject, bindable, computedFrom, customElement } from 'aurelia-framework';
import { AureliaBcf } from '../aurelia-bcf';
import { DOM } from 'aurelia-pal';
import { BcfServices } from '../services/index';
import { EventAggregator } from 'aurelia-event-aggregator';

@customElement('bcf-topics')
@inject(AureliaBcf, Element, EventAggregator)
export class Topics {
  
  @bindable projectId: string;

  constructor(private bcf: AureliaBcf, private element: HTMLElement, private eventAggregator: EventAggregator) {}

  public bind() {
    this.fetchTopics();
  }

  public projectIdChanged() {
    this.fetchTopics();
  }

  private async fetchTopics() {
    if (!this.projectId) return;
    await BcfServices.topic.getTopics(this.projectId);
    this.eventAggregator.publish('bcf:fetched-topics', {projectId: this.projectId, topics: this.topics});
  }

  @computedFrom('projectId', 'bcf.state.bcf.topics', 'bcf.state.bcf.topics.length')
  get topics() {
    if (!this.projectId) return [];
    return this.bcf.state.bcf.topics.filter((topic) => topic._projectId === this.projectId);
  }

  public projectName(projectId: string) {
    return this.bcf.state.bcf.projects.filter((project) => project.project_id === projectId)[0]?.name;
  }

  public clickTopic(topic: BcfTopicInterface, event?) {
    this.bcf.debug('clickTopic', topic);
    if (event) event.stopPropagation();
    const customEvent = DOM.createCustomEvent('topic', {detail: topic, bubbles: true});
    this.bcf.debug('customEvent', customEvent);
    this.element.dispatchEvent(customEvent);
  }
}
