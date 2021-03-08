import { AureliaBcfConfig } from "./index";
import { State, store, login, registerAuthActions, registerCommentActions, registerProjectActions, registerViewpointActions, registerTopicActions } from "./store";
import { getLogger, Logger } from 'aurelia-logging';

export class AureliaBcf {

  public host: string = '';
  public extendEndpoint?: (endpoint: string) => string;
  public state: State;
  public topicCardTheme = {
    themeKey: 'card',
    background: '#fafafa',
    foreground: '#333'
  };
  public commentCardTheme = {
    themeKey: 'card',
    background: '#dfdfdf',
    foreground: '#333'
  };

  private log: Logger;
  private ignoreDebugs: boolean = true;
  private ignoreInfos: boolean = false;

  public getSnapshot?: () => string;

  constructor() {
    this.log = getLogger('aurelia-bcf');
  }

  public configure(config: AureliaBcfConfig) {
    this.debug('setConfig', config);
    if (config.host !== undefined) {
      this.host = config.host;
    }
    if (config.extendEndpoint !== undefined) {
      this.extendEndpoint = config.extendEndpoint;
    }
    if (config.ignoreDebugs !== undefined) {
      this.ignoreDebugs = config.ignoreDebugs;
    }
    if (config.ignoreInfos !== undefined) {
      this.ignoreInfos = config.ignoreInfos;
    }
    this.initStore();
  }

  public initStore() {
    if (!store()) {
      throw new Error('Aurelia BCF plugin must be configured AFTER Aurelia Store. Consider setting the aurelia-store plugin earlier.')
    }
    registerAuthActions();
    registerCommentActions();
    registerProjectActions();
    registerTopicActions();
    registerViewpointActions();

    store().state.subscribe((state) => {
      this.debug('state update', state);
      this.state = state;
    });
  }

  public authenticate(token: string, refreshToken: string) {
    return store().dispatch(login, token, refreshToken);
  }

  public debug(key: string, ...params: any[]) {
    if (!this.ignoreDebugs) {
      this.log.debug(key, ...params);
    }
  } 

  public info(key: string, ...params: any[]) {
    if (!this.ignoreInfos) {
      this.log.info(key, ...params);
    }
  } 

  public warn(key: string, ...params: any[]) {
    this.log.warn(key, ...params);
  } 

  public error(key: string, ...params: any[]) {
    this.log.error(key, ...params);
  } 
}
