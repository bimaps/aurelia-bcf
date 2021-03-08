import { FrameworkConfiguration } from 'aurelia-framework';
export interface AureliaBcfConfig {
    host: string;
    extendEndpoint?: (endpoint: string) => string;
    ignoreDebugs?: boolean;
    ignoreInfos?: boolean;
}
export declare function configure(aurelia: FrameworkConfiguration, config?: AureliaBcfConfig): void;
export { AureliaBcf } from './aurelia-bcf';
export { BcfApi } from './bcf-api';
export * from './models';
export * from './services';
export * from './store';
export * from './elements';
export * from './value-converters';
