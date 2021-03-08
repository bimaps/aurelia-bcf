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
import { setViewpoints, setViewpoint, removeViewpoint } from '../store/actions/index';
import { AureliaBcf } from '../aurelia-bcf';
var BcfViewpointService = (function () {
    function BcfViewpointService(api, bcf) {
        this.api = api;
        this.bcf = bcf;
    }
    BcfViewpointService.prototype.getViewpoints = function (projectId, topicId) {
        this.bcf.debug('getViewpoints');
        return this.api.get("/projects/" + projectId + "/topics/" + topicId + "/viewpoints").then(jsonify).then(dispatcher(setViewpoints, projectId, topicId));
    };
    BcfViewpointService.prototype.getViewpoint = function (projectId, topicId, viewpointId) {
        this.bcf.debug('getViewpoint', projectId);
        return this.api.get("/projects/" + projectId + "/topics/" + topicId + "/viewpoints/" + viewpointId).then(jsonify).then(dispatcher(setViewpoint, projectId, topicId));
    };
    BcfViewpointService.prototype.createViewpoint = function (projectId, topicId, body) {
        this.bcf.debug('createViewpoint', body);
        return this.api.post("/projects/" + projectId + "/topics/" + topicId + "/viewpoints", body).then(jsonify).then(dispatcher(setViewpoint, projectId, topicId));
    };
    BcfViewpointService.prototype.editViewpoint = function (projectId, topicId, viewpointId, body) {
        this.bcf.debug('editViewpoint', projectId);
        return this.api.put("/projects/" + projectId + "/topics/" + topicId + "/viewpoints/" + viewpointId, body).then(jsonify).then(dispatcher(setViewpoint, projectId, topicId));
    };
    BcfViewpointService.prototype.deleteViewpoint = function (projectId, topicId, viewpointId) {
        this.bcf.debug('deleteViewpoint', projectId);
        return this.api.delete("/projects/" + projectId + "/topics/" + topicId + "/viewpoints/" + viewpointId).then(jsonify).then(function () {
            store().dispatch(removeViewpoint, viewpointId);
        });
    };
    BcfViewpointService = __decorate([
        inject(BcfApi, AureliaBcf),
        __metadata("design:paramtypes", [BcfApi, AureliaBcf])
    ], BcfViewpointService);
    return BcfViewpointService;
}());
export { BcfViewpointService };

//# sourceMappingURL=viewpoint.service.js.map
