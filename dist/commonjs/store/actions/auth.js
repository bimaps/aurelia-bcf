"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuthActions = exports.logout = exports.login = void 0;
var store_1 = require("../../store/store");
function login(state, token, refreshToken) {
    var newState = Object.assign({}, state);
    newState.bcf.loggedIn = true;
    newState.bcf.token = token;
    newState.bcf.refreshToken = refreshToken;
    return newState;
}
exports.login = login;
function logout(state) {
    var newState = Object.assign({}, state);
    newState.bcf.loggedIn = false;
    newState.bcf.token = '';
    newState.bcf.refreshToken = '';
    return newState;
}
exports.logout = logout;
function registerAuthActions() {
    store_1.store().registerAction('login', login);
    store_1.store().registerAction('logout', logout);
}
exports.registerAuthActions = registerAuthActions;

//# sourceMappingURL=auth.js.map
