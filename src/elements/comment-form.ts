import { BcfTopicInterface, BcfProjectInterface, BcfCommentInterface, BcfViewpointInterface } from '../models/index';
import { inject, bindable, bindingMode, computedFrom, customElement } from 'aurelia-framework';
import { AureliaBcf } from '../aurelia-bcf';
import { BcfServices } from '../services/index';
import { Subscription, EventAggregator } from 'aurelia-event-aggregator';
import { DOM } from 'aurelia-pal';

@customElement('bcf-comment-form')
@inject(AureliaBcf, EventAggregator, Element)
export class CommentForm {
  
  @bindable projectId: string;
  @bindable topicId: string; 
  @bindable commentId: string; // if provided, the form is an edit form, otherwise create

  @bindable({defaultBindingMode: bindingMode.twoWay}) private instance: BcfCommentInterface;
  @bindable({defaultBindingMode: bindingMode.twoWay}) private viewpointInstance: BcfViewpointInterface & {saveSnapshot?: boolean, saveComponents?: boolean};

  private subscriptions: Subscription[] = [];
  private isAttached = false;
  private updateSnapshotWhenAttached = false;

  constructor(private bcf: AureliaBcf, private eventAggregator, private element: HTMLElement) {}

  public bind() {
    this.fetchProjectExtensions();
    if (this.commentId) {
      this.setInstanceFromState();
    } else {
      this.setNewInstance();
    }
    this.setSnapshot();
  }

  public attached() {

    this.subscriptions.push(this.eventAggregator.subscribe('three-selection:changed', (data) => {
      // add to BCF viewpoint if necessary
      for (let object of data.objects) {
        if (object.userData.ifcId) {
          this.addIfcToViewpoint(object.userData.ifcId);
        }
      }
    }));

    this.subscriptions.push(this.eventAggregator.subscribe('three-camera:moved', () => {
      this.setSnapshot();
    }));
    this.setSnapshot();
    if (this.updateSnapshotWhenAttached) {
      setTimeout(() => {
        this.setSnapshot();
      }, 100);
      this.dispatchViewpoint();
      setTimeout(() => {
        this.setSnapshot();
      }, 200);
      this.updateSnapshotWhenAttached = false;
    }
    this.isAttached = true;
  }

  private setSnapshot() {
    if (!this.viewpointInstance) {
      return;
    }
    const data = this.bcf.getSnapshot ? this.bcf.getSnapshot() : '';
    this.viewpointInstance.snapshot = {
      snapshot_type: 'png',
      snapshot_data: data
    };
  }

  public detached() {
    for (const sub of this.subscriptions) {
      sub.dispose();
    }
    this.subscriptions = [];
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
      comment: ''
    };
    this.setNewViewpointInstance();
  }

  private setNewViewpointInstance() {
    this.viewpointInstance = {guid:'', components: {selection: []}, saveComponents: true, saveSnapshot: true};
    this.setSnapshot();
  }

  private async setInstanceFromState() {
    this.instance = this.bcf.state.bcf.comments.find(comment => comment.guid === this.commentId);
    if (!this.instance) {
      await this.setInstanceFromApi();
    }
    if (this.instance && this.instance.viewpoint_guid) {
      const viewpointInstance = this.bcf.state.bcf.viewpoints.find(viewpoint => viewpoint.guid === this.instance.viewpoint_guid);
      if (viewpointInstance) {
        this.viewpointInstance = viewpointInstance;
      } else {
        this.setViewpointInstanceFromApi();
      }
      const hasSnapshot = viewpointInstance !== undefined && viewpointInstance.snapshot !== undefined && viewpointInstance.snapshot.snapshot_data !== undefined;
      const hasCompo = viewpointInstance !== undefined && viewpointInstance.components?.selection?.length > 0;
      this.viewpointInstance.saveSnapshot = hasSnapshot;
      this.viewpointInstance.saveComponents = hasCompo;

      if (this.isAttached) {
        this.dispatchViewpoint();
        setTimeout(() => {
          this.setSnapshot();
        }, 100);
      } else {
        this.updateSnapshotWhenAttached = true;
      }
    } else {
      this.viewpointInstance = {guid:'', components: {selection: []}};
      this.setSnapshot();
    }
  }

  private async setInstanceFromApi() {
    const comment = await BcfServices.comment.getComment(this.projectId, this.topicId, this.commentId);
    if (!comment) {
      this.bcf.warn('Comment not found, cannot display the form');
    }
  }

  private async setViewpointInstanceFromApi() {
    const viewpoint = await BcfServices.viewpoint.getViewpoint(this.projectId, this.topicId, this.instance.viewpoint_guid);
    if (!viewpoint) {
      this.bcf.warn('Viewpoint not found, cannot display the form');
    } else {
      this.setSnapshot();
    }
  }

  @computedFrom('projectId', 'bcf.state.bcf.projects')
  get project(): BcfProjectInterface {
    if (!this.projectId) return undefined;
    return this.bcf.state.bcf.projects.filter((project) => project.project_id === this.projectId)[0];
  }

  @computedFrom('projectId', 'bcf.state.bcf.projects')
  get topic(): BcfTopicInterface {
    if (!this.topicId) return undefined;
    return this.bcf.state.bcf.topics.filter((topic) => topic.guid === this.topicId)[0];
  }

  private dispatchViewpoint() {
    const customEvent = DOM.createCustomEvent('viewpoint', {detail: this.viewpointInstance, bubbles: true});
    this.element.dispatchEvent(customEvent);
  }

  public addIfcToViewpoint(ifcGuid: string) {
    if (!this.viewpointInstance?.components?.selection) return;
    for (let component of this.viewpointInstance.components.selection) {
      if (component.ifc_guid === ifcGuid) {
        return; // prevent adding twice the same object
      }
    }
    this.viewpointInstance.components.selection.push({ifc_guid: ifcGuid});
    const event = {
      detail: this.viewpointInstance
    };
    this.dispatchViewpoint();
    this.setSnapshot();
  }

  public removeIfcFromViewpoint(ifcGuid: string) {
    if (!this.viewpointInstance?.components?.selection) return;
    let index = -1;
    for (let i in this.viewpointInstance.components.selection) {
      if (this.viewpointInstance.components.selection[i].ifc_guid === ifcGuid) {
        index = parseInt(i, 10);
        break;
      }
    }
    if (index !== -1) {
      this.viewpointInstance.components.selection.splice(index, 1);
    }
    const event = {
      detail: this.viewpointInstance
    };
    this.dispatchViewpoint();
    this.setSnapshot();
  }

}
