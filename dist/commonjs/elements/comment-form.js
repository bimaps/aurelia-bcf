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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentForm = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_bcf_1 = require("../aurelia-bcf");
var index_1 = require("../services/index");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var aurelia_pal_1 = require("aurelia-pal");
var CommentForm = (function () {
    function CommentForm(bcf, eventAggregator, element) {
        this.bcf = bcf;
        this.eventAggregator = eventAggregator;
        this.element = element;
        this.subscriptions = [];
        this.isAttached = false;
        this.updateSnapshotWhenAttached = false;
    }
    CommentForm.prototype.bind = function () {
        this.fetchProjectExtensions();
        if (this.commentId) {
            this.setInstanceFromState();
        }
        else {
            this.setNewInstance();
        }
        this.setSnapshot();
    };
    CommentForm.prototype.attached = function () {
        var _this = this;
        this.subscriptions.push(this.eventAggregator.subscribe('three-selection:changed', function (data) {
            for (var _i = 0, _a = data.objects; _i < _a.length; _i++) {
                var object = _a[_i];
                if (object.userData.ifcId) {
                    _this.addIfcToViewpoint(object.userData.ifcId);
                }
            }
        }));
        this.subscriptions.push(this.eventAggregator.subscribe('three-camera:moved', function () {
            _this.setSnapshot();
        }));
        this.setSnapshot();
        if (this.updateSnapshotWhenAttached) {
            setTimeout(function () {
                _this.setSnapshot();
            }, 100);
            this.dispatchViewpoint();
            setTimeout(function () {
                _this.setSnapshot();
            }, 200);
            this.updateSnapshotWhenAttached = false;
        }
        this.isAttached = true;
    };
    CommentForm.prototype.setSnapshot = function () {
        if (!this.viewpointInstance) {
            return;
        }
        var data = this.bcf.getSnapshot ? this.bcf.getSnapshot() : '';
        this.viewpointInstance.snapshot = {
            snapshot_type: 'png',
            snapshot_data: data
        };
    };
    CommentForm.prototype.detached = function () {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.dispose();
        }
        this.subscriptions = [];
    };
    CommentForm.prototype.fetchProjectExtensions = function (force) {
        if (force === void 0) { force = false; }
        if (!this.projectId)
            return;
        if (!force) {
            for (var _i = 0, _a = this.bcf.state.bcf.projects; _i < _a.length; _i++) {
                var project = _a[_i];
                if (project.project_id === this.projectId && project.extensions !== undefined)
                    return;
            }
        }
        index_1.BcfServices.project.getProjectExtensions(this.projectId);
    };
    CommentForm.prototype.setNewInstance = function () {
        this.instance = {
            guid: '',
            comment: ''
        };
        this.setNewViewpointInstance();
    };
    CommentForm.prototype.setNewViewpointInstance = function () {
        this.viewpointInstance = { guid: '', components: { selection: [] }, saveComponents: true, saveSnapshot: true };
        this.setSnapshot();
    };
    CommentForm.prototype.setInstanceFromState = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var viewpointInstance, hasSnapshot, hasCompo;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.instance = this.bcf.state.bcf.comments.find(function (comment) { return comment.guid === _this.commentId; });
                        if (!!this.instance) return [3, 2];
                        return [4, this.setInstanceFromApi()];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        if (this.instance && this.instance.viewpoint_guid) {
                            viewpointInstance = this.bcf.state.bcf.viewpoints.find(function (viewpoint) { return viewpoint.guid === _this.instance.viewpoint_guid; });
                            if (viewpointInstance) {
                                this.viewpointInstance = viewpointInstance;
                            }
                            else {
                                this.setViewpointInstanceFromApi();
                            }
                            hasSnapshot = viewpointInstance !== undefined && viewpointInstance.snapshot !== undefined && viewpointInstance.snapshot.snapshot_data !== undefined;
                            hasCompo = viewpointInstance !== undefined && ((_b = (_a = viewpointInstance.components) === null || _a === void 0 ? void 0 : _a.selection) === null || _b === void 0 ? void 0 : _b.length) > 0;
                            this.viewpointInstance.saveSnapshot = hasSnapshot;
                            this.viewpointInstance.saveComponents = hasCompo;
                            if (this.isAttached) {
                                this.dispatchViewpoint();
                                setTimeout(function () {
                                    _this.setSnapshot();
                                }, 100);
                            }
                            else {
                                this.updateSnapshotWhenAttached = true;
                            }
                        }
                        else {
                            this.viewpointInstance = { guid: '', components: { selection: [] } };
                            this.setSnapshot();
                        }
                        return [2];
                }
            });
        });
    };
    CommentForm.prototype.setInstanceFromApi = function () {
        return __awaiter(this, void 0, void 0, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, index_1.BcfServices.comment.getComment(this.projectId, this.topicId, this.commentId)];
                    case 1:
                        comment = _a.sent();
                        if (!comment) {
                            this.bcf.warn('Comment not found, cannot display the form');
                        }
                        return [2];
                }
            });
        });
    };
    CommentForm.prototype.setViewpointInstanceFromApi = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, index_1.BcfServices.viewpoint.getViewpoint(this.projectId, this.topicId, this.instance.viewpoint_guid)];
                    case 1:
                        viewpoint = _a.sent();
                        if (!viewpoint) {
                            this.bcf.warn('Viewpoint not found, cannot display the form');
                        }
                        else {
                            this.setSnapshot();
                        }
                        return [2];
                }
            });
        });
    };
    Object.defineProperty(CommentForm.prototype, "project", {
        get: function () {
            var _this = this;
            if (!this.projectId)
                return undefined;
            return this.bcf.state.bcf.projects.filter(function (project) { return project.project_id === _this.projectId; })[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentForm.prototype, "topic", {
        get: function () {
            var _this = this;
            if (!this.topicId)
                return undefined;
            return this.bcf.state.bcf.topics.filter(function (topic) { return topic.guid === _this.topicId; })[0];
        },
        enumerable: false,
        configurable: true
    });
    CommentForm.prototype.dispatchViewpoint = function () {
        var customEvent = aurelia_pal_1.DOM.createCustomEvent('viewpoint', { detail: this.viewpointInstance, bubbles: true });
        this.element.dispatchEvent(customEvent);
    };
    CommentForm.prototype.addIfcToViewpoint = function (ifcGuid) {
        var _a, _b;
        if (!((_b = (_a = this.viewpointInstance) === null || _a === void 0 ? void 0 : _a.components) === null || _b === void 0 ? void 0 : _b.selection))
            return;
        for (var _i = 0, _c = this.viewpointInstance.components.selection; _i < _c.length; _i++) {
            var component = _c[_i];
            if (component.ifc_guid === ifcGuid) {
                return;
            }
        }
        this.viewpointInstance.components.selection.push({ ifc_guid: ifcGuid });
        var event = {
            detail: this.viewpointInstance
        };
        this.dispatchViewpoint();
        this.setSnapshot();
    };
    CommentForm.prototype.removeIfcFromViewpoint = function (ifcGuid) {
        var _a, _b;
        if (!((_b = (_a = this.viewpointInstance) === null || _a === void 0 ? void 0 : _a.components) === null || _b === void 0 ? void 0 : _b.selection))
            return;
        var index = -1;
        for (var i in this.viewpointInstance.components.selection) {
            if (this.viewpointInstance.components.selection[i].ifc_guid === ifcGuid) {
                index = parseInt(i, 10);
                break;
            }
        }
        if (index !== -1) {
            this.viewpointInstance.components.selection.splice(index, 1);
        }
        var event = {
            detail: this.viewpointInstance
        };
        this.dispatchViewpoint();
        this.setSnapshot();
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], CommentForm.prototype, "projectId", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], CommentForm.prototype, "topicId", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], CommentForm.prototype, "commentId", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], CommentForm.prototype, "instance", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], CommentForm.prototype, "viewpointInstance", void 0);
    __decorate([
        aurelia_framework_1.computedFrom('projectId', 'bcf.state.bcf.projects'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], CommentForm.prototype, "project", null);
    __decorate([
        aurelia_framework_1.computedFrom('projectId', 'bcf.state.bcf.projects'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], CommentForm.prototype, "topic", null);
    CommentForm = __decorate([
        aurelia_framework_1.customElement('bcf-comment-form'),
        aurelia_framework_1.inject(aurelia_bcf_1.AureliaBcf, aurelia_event_aggregator_1.EventAggregator, Element),
        __metadata("design:paramtypes", [aurelia_bcf_1.AureliaBcf, Object, HTMLElement])
    ], CommentForm);
    return CommentForm;
}());
exports.CommentForm = CommentForm;

//# sourceMappingURL=comment-form.js.map
