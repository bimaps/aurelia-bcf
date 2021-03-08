import { Store } from 'aurelia-store';
import { State } from './state';
declare const store: () => Store<State>;
declare const dispatcher: (action: any, ...params: any[]) => (data: any) => Promise<any>;
export { store, dispatcher };
