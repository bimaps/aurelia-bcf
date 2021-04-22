"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerViewpointActions = exports.removeViewpoint = exports.setViewpoint = exports.setViewpoints = void 0;
var store_1 = require("../../store/store");
function setViewpoints(state, viewpoints, projectId, topicId) {
    var newState = Object.assign({}, state);
    for (var _i = 0, viewpoints_1 = viewpoints; _i < viewpoints_1.length; _i++) {
        var viewpoint = viewpoints_1[_i];
        viewpoint._projectId = projectId;
        viewpoint._topicId = topicId;
    }
    newState.bcf.viewpoints = viewpoints;
    return newState;
}
exports.setViewpoints = setViewpoints;
function setViewpoint(state, viewpoint, projectId, topicId) {
    var newState = Object.assign({}, state);
    viewpoint._projectId = projectId;
    viewpoint._topicId = topicId;
    var found = -1;
    for (var index in newState.bcf.viewpoints) {
        if (newState.bcf.viewpoints[index].guid === viewpoint.guid) {
            found = parseInt(index, 10);
            break;
        }
    }
    if (found !== -1) {
        newState.bcf.viewpoints.splice(found, 1, viewpoint);
    }
    else {
        newState.bcf.viewpoints.push(viewpoint);
    }
    return newState;
}
exports.setViewpoint = setViewpoint;
function removeViewpoint(state, viewpointId) {
    var newState = Object.assign({}, state);
    var found = -1;
    for (var index in newState.bcf.viewpoints) {
        if (newState.bcf.viewpoints[index].guid === viewpointId) {
            found = parseInt(index, 10);
            break;
        }
    }
    if (found !== -1) {
        newState.bcf.viewpoints.splice(found, 1);
    }
    return newState;
}
exports.removeViewpoint = removeViewpoint;
function registerViewpointActions() {
    store_1.store().registerAction('setViewpoints', setViewpoints);
    store_1.store().registerAction('setViewpoint', setViewpoint);
    store_1.store().registerAction('removeViewpoint', removeViewpoint);
}
exports.registerViewpointActions = registerViewpointActions;

//# sourceMappingURL=viewpoint.js.map
