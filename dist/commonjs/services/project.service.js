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
exports.BcfProjectService = void 0;
var aurelia_bcf_1 = require("../aurelia-bcf");
var aurelia_framework_1 = require("aurelia-framework");
var bcf_api_1 = require("../bcf-api");
var store_1 = require("../store/store");
var index_1 = require("../store/actions/index");
var BcfProjectService = (function () {
    function BcfProjectService(api, bcf) {
        this.api = api;
        this.bcf = bcf;
    }
    BcfProjectService.prototype.getProjects = function () {
        this.bcf.debug('getProjects');
        return this.api.get('/projects').then(bcf_api_1.jsonify).then(store_1.dispatcher(index_1.setProjects));
    };
    BcfProjectService.prototype.getProject = function (projectId) {
        this.bcf.debug('getProject', projectId);
        return this.api.get("/projects/" + projectId).then(bcf_api_1.jsonify).then(store_1.dispatcher(index_1.setProject));
    };
    BcfProjectService.prototype.getProjectExtensions = function (projectId) {
        this.bcf.debug('getProject', projectId);
        return this.api.get("/projects/" + projectId + "/extensions").then(bcf_api_1.jsonify).then(store_1.dispatcher(index_1.setProjectExtensions, projectId));
    };
    BcfProjectService.prototype.createProject = function (body) {
        this.bcf.debug('createProject', body);
        return this.api.post("/projects", body).then(bcf_api_1.jsonify).then(store_1.dispatcher(index_1.setProject));
    };
    BcfProjectService.prototype.editProject = function (projectId, body) {
        this.bcf.debug('editProject', projectId, body);
        return this.api.put("/projects/" + projectId, body).then(bcf_api_1.jsonify).then(store_1.dispatcher(index_1.setProject));
    };
    BcfProjectService.prototype.deleteProject = function (projectId) {
        this.bcf.debug('deleteProject', projectId);
        return this.api.delete("/projects/" + projectId).then(bcf_api_1.jsonify).then(function () {
            store_1.store().dispatch(index_1.removeProject, projectId);
            return;
        });
    };
    BcfProjectService = __decorate([
        aurelia_framework_1.inject(bcf_api_1.BcfApi, aurelia_bcf_1.AureliaBcf),
        __metadata("design:paramtypes", [bcf_api_1.BcfApi, aurelia_bcf_1.AureliaBcf])
    ], BcfProjectService);
    return BcfProjectService;
}());
exports.BcfProjectService = BcfProjectService;

//# sourceMappingURL=project.service.js.map
