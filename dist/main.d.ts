interface debuggerConfig {
    debug: boolean;
    caseName?: string;
    cases?: {
        [caseName: string]: {
            [tagName: string]: any;
        };
    };
    hisLen?: number;
    data?: object;
}
export declare class DevDebugger {
    config: debuggerConfig;
    data: object;
    debugHistory: Array<{
        debugVal: any[];
    } | {
        debugCaseTag: any[];
    }>;
    private debug;
    private hisLen;
    private useCaseCheck;
    private usingCase;
    constructor(config: debuggerConfig);
    markAsHistory(item: {
        debugVal: any[];
    } | {
        debugCaseTag: any[];
    }): void;
    debugVal(realVal: any, replaceVal: any): any;
    debugCaseTag(realVal: any, tagName: string): any;
}
export {};
