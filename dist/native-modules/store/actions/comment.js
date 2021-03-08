import { store } from '../../store/store';
export function setComments(state, comments, projectId, topicId) {
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
export function setComment(state, comment, projectId, topicId) {
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
export function removeComment(state, commentId) {
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
export function registerCommentActions() {
    store().registerAction('setComments', setComments);
    store().registerAction('setComment', setComment);
    store().registerAction('removeComment', removeComment);
}

//# sourceMappingURL=comment.js.map
