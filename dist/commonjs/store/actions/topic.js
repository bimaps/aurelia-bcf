"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("../../store/store");
function setTopics(state, topics, projectId) {
    var newState = Object.assign({}, state);
    var index = newState.bcf.topics.length;
    while (index--) {
        if (newState.bcf.topics[index]._projectId === projectId) {
            newState.bcf.topics.splice(index, 1);
        }
    }
    for (var _i = 0, topics_1 = topics; _i < topics_1.length; _i++) {
        var topic = topics_1[_i];
        topic._projectId = projectId;
    }
    newState.bcf.topics = topics;
    return newState;
}
exports.setTopics = setTopics;
function setTopic(state, topic, projectId) {
    var newState = Object.assign({}, state);
    topic._projectId = projectId;
    var found = -1;
    for (var index in newState.bcf.topics) {
        if (newState.bcf.topics[index].guid === topic.guid) {
            found = parseInt(index, 10);
            break;
        }
    }
    if (found !== -1) {
        newState.bcf.topics.splice(found, 1, topic);
    }
    else {
        newState.bcf.topics.push(topic);
    }
    return newState;
}
exports.setTopic = setTopic;
function removeTopic(state, topicId) {
    var newState = Object.assign({}, state);
    var found = -1;
    for (var index in newState.bcf.topics) {
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
exports.removeTopic = removeTopic;
function registerTopicActions() {
    store_1.store().registerAction('setTopics', setTopics);
    store_1.store().registerAction('setTopic', setTopic);
    store_1.store().registerAction('removeTopic', removeTopic);
}
exports.registerTopicActions = registerTopicActions;

//# sourceMappingURL=topic.js.map
