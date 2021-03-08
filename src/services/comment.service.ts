import { inject } from 'aurelia-framework';
import { BcfApi, jsonify } from '../bcf-api';
import { store, dispatcher } from '../store/store';
import { setComments, setComment, removeComment } from '../store/actions/index';
import { AureliaBcf } from '../aurelia-bcf';
import { BcfCommentInterface } from '../models/index';

@inject(BcfApi, AureliaBcf)
export class BcfCommentService {
  constructor(private api: BcfApi, private bcf: AureliaBcf) {}

  public getComments(projectId: string, topicId: string) {
    this.bcf.debug('getComments');
    return this.api.get(`/projects/${projectId}/topics/${topicId}/comments`).then(jsonify).then(dispatcher(setComments, projectId, topicId));
  }

  public getComment(projectId: string, topicId: string, commentId: string) {
    this.bcf.debug('getComment', projectId);
    return this.api.get(`/projects/${projectId}/topics/${topicId}/comments/${commentId}`).then(jsonify).then(dispatcher(setComment, projectId, topicId));
  }

  public createComment(projectId: string, topicId: string, body: BcfCommentInterface) {
    this.bcf.debug('createComment', projectId, body);
    return this.api.post(`/projects/${projectId}/topics/${topicId}/comments`, body).then(jsonify).then(dispatcher(setComment, projectId, topicId));
  }

  public editComment(projectId: string, topicId: string, commentId: string, body: BcfCommentInterface) {
    this.bcf.debug('editComment', projectId);
    return this.api.put(`/projects/${projectId}/topics/${topicId}/comments/${commentId}`, body).then(jsonify).then(dispatcher(setComment, projectId, topicId));
  }

  public deleteComment(projectId: string, topicId: string, commentId: string) {
    this.bcf.debug('deleteComment', projectId);
    return this.api.delete(`/projects/${projectId}/topics/${topicId}/comments/${commentId}`).then(jsonify).then(() => {
      store().dispatch(removeComment, commentId);
    });
  }
}
