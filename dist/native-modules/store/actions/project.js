import { store } from '../../store/store';
export function setProjects(state, projects) {
    var newState = Object.assign({}, state);
    newState.bcf.projects = projects;
    return newState;
}
export function setProject(state, project) {
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
export function setProjectExtensions(state, extensions, projectId) {
    var newState = Object.assign({}, state);
    for (var index in newState.bcf.projects) {
        if (newState.bcf.projects[index].project_id === projectId) {
            newState.bcf.projects[index].extensions = extensions;
            return newState;
        }
    }
    return newState;
}
export function removeProject(state, projectId) {
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
export function registerProjectActions() {
    store().registerAction('setProjects', setProjects);
    store().registerAction('setProject', setProject);
    store().registerAction('setProjectExtensions', setProjectExtensions);
    store().registerAction('removeProject', removeProject);
}

//# sourceMappingURL=project.js.map
