"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfServices = void 0;
__exportStar(require("./comment.service"), exports);
__exportStar(require("./project.service"), exports);
__exportStar(require("./topic.service"), exports);
__exportStar(require("./viewpoint.service"), exports);
var project_service_1 = require("./project.service");
var topic_service_1 = require("./topic.service");
var comment_service_1 = require("./comment.service");
var viewpoint_service_1 = require("./viewpoint.service");
var aurelia_framework_1 = require("aurelia-framework");
var BcfServices = {
    project: aurelia_framework_1.Container.instance.get(project_service_1.BcfProjectService),
    topic: aurelia_framework_1.Container.instance.get(topic_service_1.BcfTopicService),
    comment: aurelia_framework_1.Container.instance.get(comment_service_1.BcfCommentService),
    viewpoint: aurelia_framework_1.Container.instance.get(viewpoint_service_1.BcfViewpointService),
};
exports.BcfServices = BcfServices;

//# sourceMappingURL=index.js.map
