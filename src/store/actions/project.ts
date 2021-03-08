import { store } from '../../store/store';
import { State } from '../../store/state';
import { BcfProjectInterface } from '../../models/bcf.project.model';

export function setProjects(state: State, projects: Array<BcfProjectInterface>) {
  const newState = Object.assign({}, state);

  newState.bcf.projects = projects;

  return newState;
}

export function setProject(state: State, project: BcfProjectInterface) {
  const newState = Object.assign({}, state);
  
  let found = -1;
  for (let index in newState.bcf.projects) {
    if (newState.bcf.projects[index].project_id === project.project_id) {
      found = parseInt(index, 10);
      break;
    }
  }
  if (found !== -1) {
    newState.bcf.projects.splice(found, 1, project);
  } else {
    newState.bcf.projects.push(project);
  }
  
  return newState;
}

export function setProjectExtensions(state: State, extensions: any, projectId: string) {
  const newState = Object.assign({}, state);
  
  for (let index in newState.bcf.projects) {
    if (newState.bcf.projects[index].project_id === projectId) {
      newState.bcf.projects[index].extensions = extensions;
      return newState;
    }
  }
  
  return newState;
}

export function removeProject(state: State, projectId: string) {
  const newState = Object.assign({}, state);
  
  let found = -1;
  for (let index in newState.bcf.projects) {
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
