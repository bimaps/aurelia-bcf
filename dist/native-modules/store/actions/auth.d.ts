import { State } from '../../store/state';
export declare function login(state: State, token: string, refreshToken: string): State;
export declare function logout(state: State): State;
export declare function registerAuthActions(): void;
