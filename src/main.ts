interface debuggerConfig {
    debug: boolean,
    caseName?: string,
    cases?: {
        [caseName: string]: { [tagName: string]: any }
    },
    hisLen?: number,
    data?: object
}
export class DevDebugger {
    public data: object
    public debugHistory: Array<{ debugVal: any[] } | { debugCaseTag: any[] }> = []
    private debug: boolean
    private hisLen: number = 0
    private useCaseCheck: boolean = false
    private usingCase: { [tagName: string]: any } = {}
    constructor(public config: debuggerConfig) {
        this.debug = config.debug
        this.hisLen = config.hisLen || 10000
        this.data = config.data || {}
    }
    markAsHistory(item: { debugVal: any[] } | { debugCaseTag: any[] }) {
        let hisLen = this.debugHistory.length
        if (hisLen >= this.hisLen) {
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






