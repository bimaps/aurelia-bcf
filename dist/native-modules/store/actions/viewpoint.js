import { store } from '../../store/store';
export function setViewpoints(state, viewpoints, projectId, topicId) {
    var newState = Object.assign({}, state);
    for (var _i = 0, viewpoints_1 = viewpoints; _i < viewpoints_1.length; _i++) {
        var viewpoint = viewpoints_1[_i];
        viewpoint._projectId = projectId;
        viewpoint._topicId = topicId;
    }
    newState.bcf.viewpoints = viewpoints;
    return newState;
}
export function setViewpoint(state, viewpoint, projectId, topicId) {
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
export function removeViewpoint(state, viewpointId) {
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
export function registerViewpointActions() {
    store().registerAction('setViewpoints', setViewpoints);
    store().registerAction('setViewpoint', setViewpoint);
    store().registerAction('removeViewpoint', removeViewpoint);
}

//# sourceMappingURL=viewpoint.js.map
