var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AureliaBcf } from '../aurelia-bcf';
import { inject } from 'aurelia-framework';
import { BcfApi, jsonify } from '../bcf-api';
import { store, dispatcher } from '../store/store';
import { setProjects, setProject, removeProject, setProjectExtensions } from '../store/actions/index';
var BcfProjectService = (function () {
    function BcfProjectService(api, bcf) {
        this.api = api;
        this.bcf = bcf;
    }
    BcfProjectService.prototype.getProjects = function () {
        this.bcf.debug('getProjects');
        return this.api.get('/projects').then(jsonify).then(dispatcher(setProjects));
    };
    BcfProjectService.prototype.getProject = function (projectId) {
        this.bcf.debug('getProject', projectId);
        return this.api.get("/projects/" + projectId).then(jsonify).then(dispatcher(setProject));
    };
    BcfProjectService.prototype.getProjectExtensions = function (projectId) {
        this.bcf.debug('getProject', projectId);
        return this.api.get("/projects/" + projectId + "/extensions").then(jsonify).then(dispatcher(setProjectExtensions, projectId));
    };
    BcfProjectService.prototype.createProject = function (body) {
        this.bcf.debug('createProject', body);
        return this.api.post("/projects", body).then(jsonify).then(dispatcher(setProject));
    };
    BcfProjectService.prototype.editProject = function (projectId, body) {
        this.bcf.debug('editProject', projectId, body);
        return this.api.put("/projects/" + projectId, body).then(jsonify).then(dispatcher(setProject));
    };
    BcfProjectService.prototype.deleteProject = function (projectId) {
        this.bcf.debug('deleteProject', projectId);
        return this.api.delete("/projects/" + projectId).then(jsonify).then(function () {
            store().dispatch(removeProject, projectId);
            return;
        });
    };
    BcfProjectService = __decorate([
        inject(BcfApi, AureliaBcf),
        __metadata("design:paramtypes", [BcfApi, AureliaBcf])
    ], BcfProjectService);
    return BcfProjectService;
}());
export { BcfProjectService };

//# sourceMappingURL=project.service.js.map
