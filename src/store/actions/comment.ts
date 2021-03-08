import { store } from '../../store/store';
import { State } from '../../store/state';
import { BcfCommentInterface } from '../../models/bcf.comment.model';

export function setComments(state: State, comments: Array<BcfCommentInterface>, projectId: string, topicId: string) {
  const newState = Object.assign({}, state);

  // first remove all commetns from the topic
  let index = newState.bcf.comments.length
  while (index--) {
      if (newState.bcf.comments[index]._projectId === projectId && newState.bcf.comments[index]._topicId === topicId) { 
        newState.bcf.comments.splice(index, 1);
      } 
  }

  // then, add a _projectId and _topicId value to each new topics
  for (let comment of comments) {
    comment._projectId = projectId;
    comment._topicId = topicId;
  }

  // and set the comments in state
  newState.bcf.comments = comments;

  return newState;
}

export function setComment(state: State, comment: BcfCommentInterface, projectId: string, topicId: string) {
  const newState = Object.assign({}, state);

  comment._projectId = projectId;
  comment._topicId = topicId;

  let found = -1;
  for (let index in newState.bcf.comments) {
    if (newState.bcf.comments[index].guid === comment.guid) {
      found = parseInt(index, 10);
      break;
    }
  }
  if (found !== -1) {
    newState.bcf.comments.splice(found, 1, comment);
  } else {
    newState.bcf.comments.push(comment);
  }

  return newState;
}


export function removeComment(state: State, commentId: string) {
  const newState = Object.assign({}, state);

  let found = -1;
  for (let index in newState.bcf.comments) {
    if (newState.bcf.comments[index].guid === commentId) {
      found = parseInt(index, 10);
      break;
    }
  }
  if (found !== -1) {
    newState.bcf.comments.splice(found, 1);
  }

  return newState;
}

export function registerCommentActions() {
  store().registerAction('setComments', setComments); 
  store().registerAction('setComment', setComment);
  store().registerAction('removeComment', removeComment);
}
