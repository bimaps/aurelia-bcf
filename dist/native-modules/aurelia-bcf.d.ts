import { AureliaBcfConfig } from "./index";
import { State } from "./store";
export declare class AureliaBcf {
    host: string;
    extendEndpoint?: (endpoint: string) => string;
    state: State;
    topicCardTheme: {
        themeKey: string;
        background: string;
        foreground: string;
    };
    commentCardTheme: {
        themeKey: string;
        background: string;
        foreground: string;
    };
    private log;
    private ignoreDebugs;
    private ignoreInfos;
    getSnapshot?: () => string;
    constructor();
    configure(config: AureliaBcfConfig): void;
    initStore(): void;
    authenticate(token: string, refreshToken: string): Promise<void>;
    debug(key: string, ...params: any[]): void;
    info(key: string, ...params: any[]): void;
    warn(key: string, ...params: any[]): void;
    error(key: string, ...params: any[]): void;
}
