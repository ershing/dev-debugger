interface debuggerConfig {
    debug: boolean,
    caseName?: string,
    cases?: {
        [caseName: string]: { [tagName: string]: any }
    },
    historyLen?: number,
    data?: object
}
export default class DevDebugger {
    public data: object
    public debugHistory: Array<{ debugVal: any[] } | { debugCaseTag: any[] }> = []
    private debug: boolean
    private historyLen: number = 0
    private useCaseCheck: boolean = false
    private usingCase: { [tagName: string]: any } = {}
    constructor(public config: debuggerConfig) {
        this.debug = config.debug
        this.historyLen = config.historyLen || 10000
        this.data = config.data || {}
    }
    markAsHistory(item: { debugVal: any[] } | { debugCaseTag: any[] }) {
        let historyLen = this.debugHistory.length
        if (historyLen >= this.historyLen) {
            this.debugHistory.shift()
        }
        this.debugHistory.push(item)
    }
    debugVal(realVal: any, replaceVal: any) {
        this.markAsHistory({ 'debugVal': [].slice.call(arguments) })
        return this.debug ? replaceVal : realVal
    }
    debugCaseTag(realVal: any, tagName: string) {
        if (!this.useCaseCheck) {
            let caseName = this.config.caseName
            let cases = this.config.cases
            if (!caseName || !cases) {
                throw new Error('if using debugByTag, you need to pass caseName and cases!')
            }
            if (!(caseName in cases)) {
                throw new Error(`there is no cases about ${caseName}!`)
            }
            this.usingCase = cases[caseName]
            this.useCaseCheck = true
        }
        let replaceVal = this.usingCase[tagName]
        if (!(tagName in this.usingCase)) {
            throw new Error(`there is no tag name called ${tagName} in the degbug case!`)
        }
        this.markAsHistory({ 'debugCaseTag': [].slice.call(arguments) })
        return this.debug ? replaceVal : realVal
    }
}







