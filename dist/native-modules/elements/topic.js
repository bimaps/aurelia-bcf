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
import { inject, bindable, computedFrom, customElement } from 'aurelia-framework';
import { AureliaBcf } from '../aurelia-bcf';
import { BcfServices } from '../services/index';
import { EventAggregator } from 'aurelia-event-aggregator';
var Topic = (function () {
    function Topic(bcf, eventAggregator) {
        this.bcf = bcf;
        this.eventAggregator = eventAggregator;
        this.hideTitle = false;
    }
    Topic.prototype.bind = function () {
        this.fetchTopic();
        this.fetchComments();
    };
    Topic.prototype.projectIdChanged = function () {
        this.fetchTopic();
        this.fetchComments();
    };
    Topic.prototype.topicIdChanged = function () {
        this.fetchTopic();
        this.fetchComments();
    };
    Topic.prototype.fetchTopic = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.projectId || !this.topicId)
                            return [2];
                        return [4, BcfServices.topic.getTopic(this.projectId, this.topicId)];
                    case 1:
                        _a.sent();
                        this.eventAggregator.publish('bcf:fetched-topic', { projectId: this.projectId, topicId: this.topicId });
                        return [2];
                }
            });
        });
    };
    Topic.prototype.fetchComments = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.projectId || !this.topicId)
                            return [2];
                        return [4, BcfServices.viewpoint.getViewpoints(this.projectId, this.topicId)];
                    case 1:
                        _a.sent();
                        this.eventAggregator.publish('bcf:fetched-viewpoints', { projectId: this.projectId, topicId: this.topicId });
                        return [4, BcfServices.comment.getComments(this.projectId, this.topicId)];
                    case 2:
                        _a.sent();
                        this.eventAggregator.publish('bcf:fetched-comments', { projectId: this.projectId, topicId: this.topicId });
                        return [2];
                }
            });
        });
    };
    Object.defineProperty(Topic.prototype, "project", {
        get: function () {
            var _this = this;
            if (!this.projectId)
                undefined;
            return this.bcf.state.bcf.projects.filter(function (project) { return project.project_id === _this.projectId; })[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Topic.prototype, "topic", {
        get: function () {
            var _this = this;
            if (!this.topicId)
                return undefined;
            return this.bcf.state.bcf.topics.filter(function (topic) { return topic.guid === _this.topicId; })[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Topic.prototype, "comments", {
        get: function () {
            var _this = this;
            if (!this.topicId)
                return [];
            var comments = this.bcf.state.bcf.comments.filter(function (comment) { return comment._topicId === _this.topicId; });
            return comments;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], Topic.prototype, "projectId", void 0);
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], Topic.prototype, "topicId", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Boolean)
    ], Topic.prototype, "hideTitle", void 0);
    __decorate([
        computedFrom('projectId', 'bcf.state.bcf.projects', 'bcf.state.bcf.projects.length'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Topic.prototype, "project", null);
    __decorate([
        computedFrom('projectId', 'topicId', 'bcf.state.bcf.topics', 'bcf.state.bcf.topics.length'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Topic.prototype, "topic", null);
    __decorate([
        computedFrom('projectId', 'topicId', 'bcf.state.bcf.comments', 'bcf.state.bcf.comments.length', 'bcf.state.bcf.viewpoints.length'),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [])
    ], Topic.prototype, "comments", null);
    Topic = __decorate([
        customElement('bcf-topic'),
        inject(AureliaBcf, EventAggregator),
        __metadata("design:paramtypes", [AureliaBcf, EventAggregator])
    ], Topic);
    return Topic;
}());
export { Topic };

//# sourceMappingURL=topic.js.map
