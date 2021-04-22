"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfTopicService = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var bcf_api_1 = require("../bcf-api");
var store_1 = require("../store/store");
var index_1 = require("../store/actions/index");
var aurelia_bcf_1 = require("../aurelia-bcf");
var BcfTopicService = (function () {
    function BcfTopicService(api, bcf) {
        this.api = api;
        this.bcf = bcf;
    }
    BcfTopicService.prototype.getTopics = function (projectId) {
        this.bcf.debug('getTopics');
        return this.api.get("/projects/" + projectId + "/topics").then(bcf_api_1.jsonify).then(store_1.dispatcher(index_1.setTopics, projectId));
    };
    BcfTopicService.prototype.getTopic = function (projectId, topicId) {
        this.bcf.debug('getTopic', projectId);
        return this.api.get("/projects/" + projectId + "/topics/" + topicId).then(bcf_api_1.jsonify).then(store_1.dispatcher(index_1.setTopic, projectId));
    };
    BcfTopicService.prototype.createTopic = function (projectId, body) {
        this.bcf.debug('createTopic', projectId, body);
        return this.api.post("/projects/" + projectId + "/topics", body).then(bcf_api_1.jsonify).then(store_1.dispatcher(index_1.setTopic));
    };
    BcfTopicService.prototype.editTopic = function (projectId, topicId, body) {
        this.bcf.debug('editTopic', projectId);
        return this.api.put("/projects/" + projectId + "/topics/" + topicId, body).then(bcf_api_1.jsonify).then(store_1.dispatcher(index_1.setTopic, projectId));
    };
    BcfTopicService.prototype.deleteTopic = function (projectId, topicId) {
        this.bcf.debug('deleteTopic', projectId);
        return this.api.delete("/projects/" + projectId + "/topics/" + topicId).then(bcf_api_1.jsonify).then(function () {
            store_1.store().dispatch(index_1.removeTopic, topicId);
            return;
        });
    };
    BcfTopicService = __decorate([
        aurelia_framework_1.inject(bcf_api_1.BcfApi, aurelia_bcf_1.AureliaBcf),
        __metadata("design:paramtypes", [bcf_api_1.BcfApi, aurelia_bcf_1.AureliaBcf])
    ], BcfTopicService);
    return BcfTopicService;
}());
exports.BcfTopicService = BcfTopicService;

//# sourceMappingURL=topic.service.js.map
