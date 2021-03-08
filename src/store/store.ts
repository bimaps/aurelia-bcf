import { Container } from 'aurelia-framework';
import { Store } from 'aurelia-store';
import { State } from './state';

const store = (): Store<State> => {
  let getAll = Container.instance.getAll(Store);
  if (getAll.length === 0) {
    console.warn('BCF Store can only be accessed once the Aurelia Store plugin has been configured');
    return undefined;
  }
  return Container.instance.get(Store) as Store<State>;
}

const dispatcher = (action: any, ...params: any[]) => {
  return async (data: any) => {
    await store().dispatch(action, data, ...params);
    return data;
  }
}


export { store, dispatcher };
