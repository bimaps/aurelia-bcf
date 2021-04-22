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
exports.Topics = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_bcf_1 = require("../aurelia-bcf");
var aurelia_pal_1 = require("aurelia-pal");
var index_1 = require("../services/index");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var Topics = (function () {
    function Topics(bcf, element, eventAggregator) {
        this.bcf = bcf;
        this.element = element;
        this.eventAggregator = eventAggregator;
    }
    Topics.prototype.bind = function () {
        this.fetchTopics();
    };
    Topics.prototype.projectIdChanged = function () {
        this.fetchTopics();
    };
    Topics.prototype.fetchTopics = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.projectId)
                            return [2];
                        return [4, index_1.BcfServices.topic.getTopics(this.projectId)];
                    case 1:
                        _a.sent();
                        this.eventAggregator.publish('bcf:fetched-topics', { projectId: this.projectId, topics: this.topics });
                        return [2];
                }
            });
        });
    };
    Object.defineProperty(Topics.prototype, "topics", {
        get: function () {
            var _this = this;
            if (!this.projectId)
                return [];
            return this.bcf.state.bcf.topics.filter(function (topic) { return topic._projectId === _this.projectId; });
        },
        enumerable: false,
        configurable: true
    });
    Topics.prototype.projectName = function (projectId) {
        var _a;
        return (_a = this.bcf.state.bcf.projects.filter(function (project) { return project.project_id === projectId; })[0]) === null || _a === void 0 ? void 0 : _a.name;
    };
    Topics.prototype.clickTopic = function (topic, event) {
        this.bcf.debug('clickTopic', topic);
        if (event)
            event.stopPropagation();
        var customEvent = aurelia_pal_1.DOM.createCustomEvent('topic', { detail: topic, bubbles: true });
        this.bcf.debug('customEvent', customEvent);
        this.element.dispatchEvent(customEvent);
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Topics.prototype, "projectId", void 0);
    __decorate([
        aurelia_framework_1.computedFrom('projectId', 'bcf.state.bcf.topics', 'bcf.state.bcf.topics.length'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Topics.prototype, "topics", null);
    Topics = __decorate([
        aurelia_framework_1.customElement('bcf-topics'),
        aurelia_framework_1.inject(aurelia_bcf_1.AureliaBcf, Element, aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [aurelia_bcf_1.AureliaBcf, HTMLElement, aurelia_event_aggregator_1.EventAggregator])
    ], Topics);
    return Topics;
}());
exports.Topics = Topics;

//# sourceMappingURL=topics.js.map
