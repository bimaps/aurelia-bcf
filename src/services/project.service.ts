import { BcfProjectExtensions } from './../models/bcf.project.model';
import { AureliaBcf } from '../aurelia-bcf';
import { inject } from 'aurelia-framework';
import { BcfApi, jsonify } from '../bcf-api';
import { store, dispatcher } from '../store/store';
import { setProjects, setProject, removeProject, setProjectExtensions } from '../store/actions/index';
import { BcfProjectInterface } from '../models/index';

@inject(BcfApi, AureliaBcf)
export class BcfProjectService {
  constructor(private api: BcfApi, private bcf: AureliaBcf) {
    
  }

  public getProjects(): Promise<BcfProjectInterface[]> {
    this.bcf.debug('getProjects');
    return this.api.get('/projects').then(jsonify).then(dispatcher(setProjects));
  }

  public getProject(projectId: string): Promise<BcfProjectInterface> {
    this.bcf.debug('getProject', projectId);
    return this.api.get(`/projects/${projectId}`).then(jsonify).then(dispatcher(setProject));
  }

  public getProjectExtensions(projectId: string): Promise<BcfProjectExtensions> {
    this.bcf.debug('getProject', projectId);
    return this.api.get(`/projects/${projectId}/extensions`).then(jsonify).then(dispatcher(setProjectExtensions, projectId));
  }

  public createProject(body: BcfProjectInterface): Promise<BcfProjectInterface> {
    this.bcf.debug('createProject', body);
    return this.api.post(`/projects`, body).then(jsonify).then(dispatcher(setProject));
  }

  public editProject(projectId: string, body: BcfProjectInterface): Promise<BcfProjectInterface> {
    this.bcf.debug('editProject', projectId, body);
    return this.api.put(`/projects/${projectId}`, body).then(jsonify).then(dispatcher(setProject));
  }

  public deleteProject(projectId: string): Promise<void> {
    this.bcf.debug('deleteProject', projectId);
    return this.api.delete(`/projects/${projectId}`).then(jsonify).then(() => {
      store().dispatch(removeProject, projectId);
      return;
    });
  }
}
