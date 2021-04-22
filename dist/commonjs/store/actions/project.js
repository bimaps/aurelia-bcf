"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerProjectActions = exports.removeProject = exports.setProjectExtensions = exports.setProject = exports.setProjects = void 0;
var store_1 = require("../../store/store");
function setProjects(state, projects) {
    var newState = Object.assign({}, state);
    newState.bcf.projects = projects;
    return newState;
}
exports.setProjects = setProjects;
function setProject(state, project) {
    var newState = Object.assign({}, state);
    var found = -1;
    for (var index in newState.bcf.projects) {
        if (newState.bcf.projects[index].project_id === project.project_id) {
            found = parseInt(index, 10);
            break;
        }
    }
    if (found !== -1) {
        newState.bcf.projects.splice(found, 1, project);
    }
    else {
        newState.bcf.projects.push(project);
    }
    return newState;
}
exports.setProject = setProject;
function setProjectExtensions(state, extensions, projectId) {
    var newState = Object.assign({}, state);
    for (var index in newState.bcf.projects) {
        if (newState.bcf.projects[index].project_id === projectId) {
            newState.bcf.projects[index].extensions = extensions;
            return newState;
        }
    }
    return newState;
}
exports.setProjectExtensions = setProjectExtensions;
function removeProject(state, projectId) {
    var newState = Object.assign({}, state);
    var found = -1;
    for (var index in newState.bcf.projects) {
        if (newState.bcf.projects[index].project_id === projectId) {
            found = parseInt(index, 10);
            break;
        }
    }
    if (found !== -1) {
        newState.bcf.projects.splice(found, 1);
    }
    return newState;
}
exports.removeProject = removeProject;
function registerProjectActions() {
    store_1.store().registerAction('setProjects', setProjects);
    store_1.store().registerAction('setProject', setProject);
    store_1.store().registerAction('setProjectExtensions', setProjectExtensions);
    store_1.store().registerAction('removeProject', removeProject);
}
exports.registerProjectActions = registerProjectActions;

//# sourceMappingURL=project.js.map
