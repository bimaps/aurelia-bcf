import { inject } from 'aurelia-framework';
import { BcfApi, jsonify } from '../bcf-api';
import { store, dispatcher } from '../store/store';
import { setTopics, setTopic, removeTopic } from '../store/actions/index';
import { AureliaBcf } from '../aurelia-bcf';
import { BcfTopicInterface } from '../models/index';

@inject(BcfApi, AureliaBcf)
export class BcfTopicService {
  constructor(private api: BcfApi, private bcf: AureliaBcf) {}

  public getTopics(projectId: string): Promise<BcfTopicInterface[]> {
    this.bcf.debug('getTopics');
    return this.api.get(`/projects/${projectId}/topics`).then(jsonify).then(dispatcher(setTopics, projectId));
  }

  public getTopic(projectId: string, topicId: string): Promise<BcfTopicInterface> {
    this.bcf.debug('getTopic', projectId);
    return this.api.get(`/projects/${projectId}/topics/${topicId}`).then(jsonify).then(dispatcher(setTopic, projectId));
  }

  public createTopic(projectId: string, body: BcfTopicInterface): Promise<BcfTopicInterface> {
    this.bcf.debug('createTopic', projectId, body);
    return this.api.post(`/projects/${projectId}/topics`, body).then(jsonify).then(dispatcher(setTopic));
  }

  public editTopic(projectId: string, topicId: string, body: BcfTopicInterface): Promise<BcfTopicInterface> {
    this.bcf.debug('editTopic', projectId);
    return this.api.put(`/projects/${projectId}/topics/${topicId}`, body).then(jsonify).then(dispatcher(setTopic, projectId));
  }

  public deleteTopic(projectId: string, topicId: string): Promise<void> {
    this.bcf.debug('deleteTopic', projectId);
    return this.api.delete(`/projects/${projectId}/topics/${topicId}`).then(jsonify).then(() => {
      store().dispatch(removeTopic, topicId);
      return;
    });
  }
}
