"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./comment.service"));
__export(require("./project.service"));
__export(require("./topic.service"));
__export(require("./viewpoint.service"));
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
