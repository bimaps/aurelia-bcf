import { inject } from 'aurelia-framework';
import { BcfApi, jsonify } from '../bcf-api';
import { store, dispatcher } from '../store/store';
import { setViewpoints, setViewpoint, removeViewpoint } from '../store/actions/index';
import { AureliaBcf } from '../aurelia-bcf';
import { BcfViewpointInterface } from '../models/index';

@inject(BcfApi, AureliaBcf)
export class BcfViewpointService {
  constructor(private api: BcfApi, private bcf: AureliaBcf) {}

  public getViewpoints(projectId: string, topicId: string) {
    this.bcf.debug('getViewpoints');
    return this.api.get(`/projects/${projectId}/topics/${topicId}/viewpoints`).then(jsonify).then(dispatcher(setViewpoints, projectId, topicId));
  }

  public getViewpoint(projectId: string, topicId: string, viewpointId: string) {
    this.bcf.debug('getViewpoint', projectId);
    return this.api.get(`/projects/${projectId}/topics/${topicId}/viewpoints/${viewpointId}`).then(jsonify).then(dispatcher(setViewpoint, projectId, topicId));
  }

  public createViewpoint(projectId: string, topicId: string, body: BcfViewpointInterface) {
    this.bcf.debug('createViewpoint', body);
    return this.api.post(`/projects/${projectId}/topics/${topicId}/viewpoints`, body).then(jsonify).then(dispatcher(setViewpoint, projectId, topicId));
  }

  public editViewpoint(projectId: string, topicId: string, viewpointId: string, body: BcfViewpointInterface) {
    this.bcf.debug('editViewpoint', projectId);
    return this.api.put(`/projects/${projectId}/topics/${topicId}/viewpoints/${viewpointId}`, body).then(jsonify).then(dispatcher(setViewpoint, projectId, topicId));
  }

  public deleteViewpoint(projectId: string, topicId: string, viewpointId: string) {
    this.bcf.debug('deleteViewpoint', projectId);
    return this.api.delete(`/projects/${projectId}/topics/${topicId}/viewpoints/${viewpointId}`).then(jsonify).then(() => {
      store().dispatch(removeViewpoint, viewpointId);
    });
  }
}
