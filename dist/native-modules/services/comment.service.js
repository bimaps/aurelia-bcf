var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-framework';
import { BcfApi, jsonify } from '../bcf-api';
import { store, dispatcher } from '../store/store';
import { setComments, setComment, removeComment } from '../store/actions/index';
import { AureliaBcf } from '../aurelia-bcf';
var BcfCommentService = (function () {
    function BcfCommentService(api, bcf) {
        this.api = api;
        this.bcf = bcf;
    }
    BcfCommentService.prototype.getComments = function (projectId, topicId) {
        this.bcf.debug('getComments');
        return this.api.get("/projects/" + projectId + "/topics/" + topicId + "/comments").then(jsonify).then(dispatcher(setComments, projectId, topicId));
    };
    BcfCommentService.prototype.getComment = function (projectId, topicId, commentId) {
        this.bcf.debug('getComment', projectId);
        return this.api.get("/projects/" + projectId + "/topics/" + topicId + "/comments/" + commentId).then(jsonify).then(dispatcher(setComment, projectId, topicId));
    };
    BcfCommentService.prototype.createComment = function (projectId, topicId, body) {
        this.bcf.debug('createComment', projectId, body);
        return this.api.post("/projects/" + projectId + "/topics/" + topicId + "/comments", body).then(jsonify).then(dispatcher(setComment, projectId, topicId));
    };
    BcfCommentService.prototype.editComment = function (projectId, topicId, commentId, body) {
        this.bcf.debug('editComment', projectId);
        return this.api.put("/projects/" + projectId + "/topics/" + topicId + "/comments/" + commentId, body).then(jsonify).then(dispatcher(setComment, projectId, topicId));
    };
    BcfCommentService.prototype.deleteComment = function (projectId, topicId, commentId) {
        this.bcf.debug('deleteComment', projectId);
        return this.api.delete("/projects/" + projectId + "/topics/" + topicId + "/comments/" + commentId).then(jsonify).then(function () {
            store().dispatch(removeComment, commentId);
        });
    };
    BcfCommentService = __decorate([
        inject(BcfApi, AureliaBcf),
        __metadata("design:paramtypes", [BcfApi, AureliaBcf])
    ], BcfCommentService);
    return BcfCommentService;
}());
export { BcfCommentService };

//# sourceMappingURL=comment.service.js.map
