"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommentActions = exports.removeComment = exports.setComment = exports.setComments = void 0;
var store_1 = require("../../store/store");
function setComments(state, comments, projectId, topicId) {
    var newState = Object.assign({}, state);
    var index = newState.bcf.comments.length;
    while (index--) {
        if (newState.bcf.comments[index]._projectId === projectId && newState.bcf.comments[index]._topicId === topicId) {
            newState.bcf.comments.splice(index, 1);
        }
    }
    for (var _i = 0, comments_1 = comments; _i < comments_1.length; _i++) {
        var comment = comments_1[_i];
        comment._projectId = projectId;
        comment._topicId = topicId;
    }
    newState.bcf.comments = comments;
    return newState;
}
exports.setComments = setComments;
function setComment(state, comment, projectId, topicId) {
    var newState = Object.assign({}, state);
    comment._projectId = projectId;
    comment._topicId = topicId;
    var found = -1;
    for (var index in newState.bcf.comments) {
        if (newState.bcf.comments[index].guid === comment.guid) {
            found = parseInt(index, 10);
            break;
        }
    }
    if (found !== -1) {
        newState.bcf.comments.splice(found, 1, comment);
    }
    else {
        newState.bcf.comments.push(comment);
    }
    return newState;
}
exports.setComment = setComment;
function removeComment(state, commentId) {
    var newState = Object.assign({}, state);
    var found = -1;
    for (var index in newState.bcf.comments) {
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
exports.removeComment = removeComment;
function registerCommentActions() {
    store_1.store().registerAction('setComments', setComments);
    store_1.store().registerAction('setComment', setComment);
    store_1.store().registerAction('removeComment', removeComment);
}
exports.registerCommentActions = registerCommentActions;

//# sourceMappingURL=comment.js.map
