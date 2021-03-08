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
import { setTopics, setTopic, removeTopic } from '../store/actions/index';
import { AureliaBcf } from '../aurelia-bcf';
var BcfTopicService = (function () {
    function BcfTopicService(api, bcf) {
        this.api = api;
        this.bcf = bcf;
    }
    BcfTopicService.prototype.getTopics = function (projectId) {
        this.bcf.debug('getTopics');
        return this.api.get("/projects/" + projectId + "/topics").then(jsonify).then(dispatcher(setTopics, projectId));
    };
    BcfTopicService.prototype.getTopic = function (projectId, topicId) {
        this.bcf.debug('getTopic', projectId);
        return this.api.get("/projects/" + projectId + "/topics/" + topicId).then(jsonify).then(dispatcher(setTopic, projectId));
    };
    BcfTopicService.prototype.createTopic = function (projectId, body) {
        this.bcf.debug('createTopic', projectId, body);
        return this.api.post("/projects/" + projectId + "/topics", body).then(jsonify).then(dispatcher(setTopic));
    };
    BcfTopicService.prototype.editTopic = function (projectId, topicId, body) {
        this.bcf.debug('editTopic', projectId);
        return this.api.put("/projects/" + projectId + "/topics/" + topicId, body).then(jsonify).then(dispatcher(setTopic, projectId));
    };
    BcfTopicService.prototype.deleteTopic = function (projectId, topicId) {
        this.bcf.debug('deleteTopic', projectId);
        return this.api.delete("/projects/" + projectId + "/topics/" + topicId).then(jsonify).then(function () {
            store().dispatch(removeTopic, topicId);
            return;
        });
    };
    BcfTopicService = __decorate([
        inject(BcfApi, AureliaBcf),
        __metadata("design:paramtypes", [BcfApi, AureliaBcf])
    ], BcfTopicService);
    return BcfTopicService;
}());
export { BcfTopicService };

//# sourceMappingURL=topic.service.js.map
