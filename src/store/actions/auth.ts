import { store } from '../../store/store';
import { State } from '../../store/state';

export function login(state: State, token: string, refreshToken: string) {
  const newState = Object.assign({}, state);

  newState.bcf.loggedIn = true;
  newState.bcf.token = token;
  newState.bcf.refreshToken = refreshToken;

  return newState;
}

export function logout(state: State) {
  const newState = Object.assign({}, state);

  newState.bcf.loggedIn = false;
  newState.bcf.token = '';
  newState.bcf.refreshToken = '';

  return newState;
}

export function registerAuthActions() {
  store().registerAction('login', login);
  store().registerAction('logout', logout);
}
