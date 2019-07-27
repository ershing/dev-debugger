"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DevDebugger = /** @class */ (function () {
    function DevDebugger(config) {
        this.config = config;
        this.debugHistory = [];
        this.hisLen = 0;
        this.useCaseCheck = false;
        this.usingCase = {};
        this.debug = config.debug;
        this.hisLen = config.hisLen || 10000;
        this.data = config.data || {};
    }
    DevDebugger.prototype.markAsHistory = function (item) {
        var hisLen = this.debugHistory.length;
        if (hisLen >= this.hisLen) {
            this.debugHistory.shift();
        }
        this.debugHistory.push(item);
    };
    DevDebugger.prototype.debugVal = function (realVal, replaceVal) {
        this.markAsHistory({ 'debugVal': [].slice.call(arguments) });
        return this.debug ? replaceVal : realVal;
    };
    DevDebugger.prototype.debugCaseTag = function (realVal, tagName) {
        if (!this.useCaseCheck) {
            var caseName = this.config.caseName;
            var cases = this.config.cases;
            if (!caseName || !cases) {
                throw new Error('if using debugByTag, you need to pass caseName and cases!');
            }
            if (!(caseName in cases)) {
                throw new Error("there is no cases about " + caseName + "!");
            }
            this.usingCase = cases[caseName];
            this.useCaseCheck = true;
        }
        var replaceVal = this.usingCase[tagName];
        if (!(tagName in this.usingCase)) {
            throw new Error("there is no tag name called " + tagName + " in the degbug case!");
        }
        this.markAsHistory({ 'debugCaseTag': [].slice.call(arguments) });
        return this.debug ? replaceVal : realVal;
    };
    return DevDebugger;
}());
exports.default = DevDebugger;
