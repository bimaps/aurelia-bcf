import { store } from '../../store/store';
import { State } from '../../store/state';
import { BcfTopicInterface } from '../../models/bcf.topic.model';

export function setTopics(state: State, topics: Array<BcfTopicInterface>, projectId: string) {
  const newState = Object.assign({}, state);

  // first remove all topics from the project
  let index = newState.bcf.topics.length
  while (index--) {
      if (newState.bcf.topics[index]._projectId === projectId) { 
        newState.bcf.topics.splice(index, 1);
      } 
  }

  // then, add a _projectId value to each new topics
  for (let topic of topics) {
    topic._projectId = projectId;
  }

  // and set the topics in state
  newState.bcf.topics = topics;

  return newState;
}

export function setTopic(state: State, topic: BcfTopicInterface, projectId: string) {
  const newState = Object.assign({}, state);
  
  topic._projectId = projectId;
  
  let found = -1;
  for (let index in newState.bcf.topics) {
    if (newState.bcf.topics[index].guid === topic.guid) {
      found = parseInt(index, 10);
      break;
    }
  }
  if (found !== -1) {
    newState.bcf.topics.splice(found, 1, topic);
  } else {
    newState.bcf.topics.push(topic);
  }
  
  return newState;
}

export function removeTopic(state: State, topicId: string) {
  const newState = Object.assign({}, state);
  
  let found = -1;
  for (let index in newState.bcf.topics) {
    if (newState.bcf.topics[index].guid === topicId) {
      found = parseInt(index, 10);
      break;
    }
  }
  if (found !== -1) {
    newState.bcf.topics.splice(found, 1);
  }
  
  return newState;
}

export function registerTopicActions() {
  store().registerAction('setTopics', setTopics);
  store().registerAction('setTopic', setTopic);
  store().registerAction('removeTopic', removeTopic);
}
