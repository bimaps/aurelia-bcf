import { FrameworkConfiguration, Container } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { AureliaBcf } from './aurelia-bcf';

export interface AureliaBcfConfig {
  host: string;
  extendEndpoint?: (endpoint: string) => string;
  ignoreDebugs?: boolean;
  ignoreInfos?: boolean;
}

export function configure(aurelia: FrameworkConfiguration, config?: AureliaBcfConfig) {
  // if (!config) {
  //   throw new Error('Aurelia BCF requires config.host');
  // }
  if (config) {
    Container.instance.get(AureliaBcf).configure(config);
  }
  aurelia.globalResources([
    PLATFORM.moduleName('./elements/comment-form'),
    PLATFORM.moduleName('./elements/comment'),
    PLATFORM.moduleName('./elements/new-topic-form'),
    PLATFORM.moduleName('./elements/topic-form'),
    PLATFORM.moduleName('./elements/topic'),
    PLATFORM.moduleName('./elements/topics'),

    PLATFORM.moduleName('./value-converters/bcf-date'),
  ]);
}

export { AureliaBcf } from './aurelia-bcf';
export { BcfApi } from './bcf-api';
export * from './models';
export * from './services';
export * from './store';
export * from './elements';
export * from './value-converters';
