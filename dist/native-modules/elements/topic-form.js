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
import { inject, bindable, bindingMode, computedFrom, customElement } from 'aurelia-framework';
import { AureliaBcf } from '../aurelia-bcf';
import { BcfServices } from '../services/index';
var TopicForm = (function () {
    function TopicForm(bcf) {
        this.bcf = bcf;
    }
    TopicForm.prototype.bind = function () {
        this.init();
    };
    TopicForm.prototype.projectIdChanged = function () {
        this.init();
    };
    TopicForm.prototype.topicIdChanged = function () {
        this.init();
    };
    TopicForm.prototype.init = function () {
        this.fetchProjectExtensions();
        if (this.topicId) {
            this.setInstanceFromState();
        }
        else {
            this.setNewInstance();
        }
    };
    TopicForm.prototype.fetchProjectExtensions = function (force) {
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
        BcfServices.project.getProjectExtensions(this.projectId);
    };
    TopicForm.prototype.setNewInstance = function () {
        this.instance = {
            guid: '',
            title: ''
        };
    };
    TopicForm.prototype.setInstanceFromState = function () {
        var _this = this;
        this.instance = this.bcf.state.bcf.topics.filter(function (topic) { return topic.guid === _this.topicId; })[0];
        if (!this.instance) {
            this.setInstanceFromApi();
        }
    };
    TopicForm.prototype.setInstanceFromApi = function () {
        return __awaiter(this, void 0, void 0, function () {
            var topic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, BcfServices.topic.getTopic(this.projectId, this.topicId)];
                    case 1:
                        topic = _a.sent();
                        if (!topic) {
                            this.bcf.warn('Topic not found, cannot display the form');
                        }
                        return [2];
                }
            });
        });
    };
    Object.defineProperty(TopicForm.prototype, "project", {
        get: function () {
            var _this = this;
            if (!this.projectId)
                return undefined;
            return this.bcf.state.bcf.projects.filter(function (project) { return project.project_id === _this.projectId; })[0];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], TopicForm.prototype, "projectId", void 0);
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], TopicForm.prototype, "topicId", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], TopicForm.prototype, "instance", void 0);
    __decorate([
        computedFrom('projectId', 'bcf.state.bcf.projects'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TopicForm.prototype, "project", null);
    TopicForm = __decorate([
        customElement('bcf-topic-form'),
        inject(AureliaBcf),
        __metadata("design:paramtypes", [AureliaBcf])
    ], TopicForm);
    return TopicForm;
}());
export { TopicForm };

//# sourceMappingURL=topic-form.js.map
