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
var aurelia_framework_1 = require("aurelia-framework");
var bcf_api_1 = require("../bcf-api");
var store_1 = require("../store/store");
var index_1 = require("../store/actions/index");
var aurelia_bcf_1 = require("../aurelia-bcf");
var BcfViewpointService = (function () {
    function BcfViewpointService(api, bcf) {
        this.api = api;
        this.bcf = bcf;
    }
    BcfViewpointService.prototype.getViewpoints = function (projectId, topicId) {
        this.bcf.debug('getViewpoints');
        return this.api.get("/projects/" + projectId + "/topics/" + topicId + "/viewpoints").then(bcf_api_1.jsonify).then(store_1.dispatcher(index_1.setViewpoints, projectId, topicId));
    };
    BcfViewpointService.prototype.getViewpoint = function (projectId, topicId, viewpointId) {
        this.bcf.debug('getViewpoint', projectId);
        return this.api.get("/projects/" + projectId + "/topics/" + topicId + "/viewpoints/" + viewpointId).then(bcf_api_1.jsonify).then(store_1.dispatcher(index_1.setViewpoint, projectId, topicId));
    };
    BcfViewpointService.prototype.createViewpoint = function (projectId, topicId, body) {
        this.bcf.debug('createViewpoint', body);
        return this.api.post("/projects/" + projectId + "/topics/" + topicId + "/viewpoints", body).then(bcf_api_1.jsonify).then(store_1.dispatcher(index_1.setViewpoint, projectId, topicId));
    };
    BcfViewpointService.prototype.editViewpoint = function (projectId, topicId, viewpointId, body) {
        this.bcf.debug('editViewpoint', projectId);
        return this.api.put("/projects/" + projectId + "/topics/" + topicId + "/viewpoints/" + viewpointId, body).then(bcf_api_1.jsonify).then(store_1.dispatcher(index_1.setViewpoint, projectId, topicId));
    };
    BcfViewpointService.prototype.deleteViewpoint = function (projectId, topicId, viewpointId) {
        this.bcf.debug('deleteViewpoint', projectId);
        return this.api.delete("/projects/" + projectId + "/topics/" + topicId + "/viewpoints/" + viewpointId).then(bcf_api_1.jsonify).then(function () {
            store_1.store().dispatch(index_1.removeViewpoint, viewpointId);
        });
    };
    BcfViewpointService = __decorate([
        aurelia_framework_1.inject(bcf_api_1.BcfApi, aurelia_bcf_1.AureliaBcf),
        __metadata("design:paramtypes", [bcf_api_1.BcfApi, aurelia_bcf_1.AureliaBcf])
    ], BcfViewpointService);
    return BcfViewpointService;
}());
exports.BcfViewpointService = BcfViewpointService;

//# sourceMappingURL=viewpoint.service.js.map
