import { store } from '../../store/store';
export function login(state, token, refreshToken) {
    var newState = Object.assign({}, state);
    newState.bcf.loggedIn = true;
    newState.bcf.token = token;
    newState.bcf.refreshToken = refreshToken;
    return newState;
}
export function logout(state) {
    var newState = Object.assign({}, state);
    newState.bcf.loggedIn = false;
    newState.bcf.token = '';
    newState.bcf.refreshToken = '';
    return newState;
}
export function registerAuthActions() {
    store().registerAction('login', login);
    store().registerAction('logout', logout);
}

//# sourceMappingURL=auth.js.map
