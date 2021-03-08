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
var aurelia_bcf_1 = require("../aurelia-bcf");
var aurelia_pal_1 = require("aurelia-pal");
var Comment = (function () {
    function Comment(bcf, element) {
        this.bcf = bcf;
        this.element = element;
    }
    Object.defineProperty(Comment.prototype, "project", {
        get: function () {
            var _this = this;
            if (!this.projectId)
                undefined;
            return this.bcf.state.bcf.projects.filter(function (project) { return project.project_id === _this.projectId; })[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Comment.prototype, "topic", {
        get: function () {
            var _this = this;
            if (!this.projectId)
                return undefined;
            if (!this.topicId)
                return undefined;
            return this.bcf.state.bcf.topics.filter(function (topic) { return topic.guid === _this.topicId; })[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Comment.prototype, "comment", {
        get: function () {
            var _this = this;
            if (!this.projectId)
                return undefined;
            if (!this.topicId)
                return undefined;
            if (!this.commentId)
                return undefined;
            return this.bcf.state.bcf.comments.filter(function (comment) { return comment.guid === _this.commentId; })[0];
        },
        enumerable: true,
        configurable: true
    });
    Comment.prototype.viewpoint = function (viewpoint_guid) {
        return this.bcf.state.bcf.viewpoints.filter(function (viewpoint) { return viewpoint.guid === viewpoint_guid; })[0];
    };
    Comment.prototype.clickViewpoint = function (viewpoint_guid, event) {
        if (event)
            event.stopPropagation();
        var viewpoint = this.bcf.state.bcf.viewpoints.filter(function (viewpoint) { return viewpoint.guid === viewpoint_guid; })[0];
        var customEvent = aurelia_pal_1.DOM.createCustomEvent('viewpoint', { detail: viewpoint, bubbles: true });
        this.element.dispatchEvent(customEvent);
    };
    Comment.prototype.clickEdit = function (viewpoint_guid, event) {
        if (event)
            event.stopPropagation();
        var viewpoint = this.bcf.state.bcf.viewpoints.filter(function (viewpoint) { return viewpoint.guid === viewpoint_guid; })[0];
        var customEvent = aurelia_pal_1.DOM.createCustomEvent('edit-comment', { detail: { comment: this.comment, viewpoint: viewpoint }, bubbles: true });
        this.element.dispatchEvent(customEvent);
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Comment.prototype, "projectId", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Comment.prototype, "topicId", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Comment.prototype, "commentId", void 0);
    __decorate([
        aurelia_framework_1.computedFrom('projectId', 'bcf.state.bcf.projects', 'bcf.state.bcf.projects.length'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Comment.prototype, "project", null);
    __decorate([
        aurelia_framework_1.computedFrom('projectId', 'topicId', 'bcf.state.bcf.topics', 'bcf.state.bcf.topics.length'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Comment.prototype, "topic", null);
    __decorate([
        aurelia_framework_1.computedFrom('projectId', 'topicId', 'commentId', 'bcf.state.bcf.comments', 'bcf.state.bcf.comments.length'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Comment.prototype, "comment", null);
    Comment = __decorate([
        aurelia_framework_1.customElement('bcf-comment'),
        aurelia_framework_1.inject(aurelia_bcf_1.AureliaBcf, Element),
        __metadata("design:paramtypes", [aurelia_bcf_1.AureliaBcf, HTMLElement])
    ], Comment);
    return Comment;
}());
exports.Comment = Comment;

//# sourceMappingURL=comment.js.map
