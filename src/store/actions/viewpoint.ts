import { store } from '../../store/store';
import { State } from '../../store/state';
import { BcfViewpointInterface } from '../../models/bcf.viewpoint.model';

export function setViewpoints(state: State, viewpoints: Array<BcfViewpointInterface>, projectId: string, topicId: string) {
  const newState = Object.assign({}, state);

  for (let viewpoint of viewpoints) {
    viewpoint._projectId = projectId;
    viewpoint._topicId = topicId;
  }
  newState.bcf.viewpoints = viewpoints;

  return newState;
}


export function setViewpoint(state: State, viewpoint: BcfViewpointInterface, projectId: string, topicId: string) {
  const newState = Object.assign({}, state);

  viewpoint._projectId = projectId;
  viewpoint._topicId = topicId;

  let found = -1;
  for (let index in newState.bcf.viewpoints) {
    if (newState.bcf.viewpoints[index].guid === viewpoint.guid) {
      found = parseInt(index, 10);
      break;
    }
  }
  if (found !== -1) {
    newState.bcf.viewpoints.splice(found, 1, viewpoint);
  } else {
    newState.bcf.viewpoints.push(viewpoint);
  }

  return newState;
}


export function removeViewpoint(state: State, viewpointId: string) {
  const newState = Object.assign({}, state);

  let found = -1;
  for (let index in newState.bcf.viewpoints) {
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
