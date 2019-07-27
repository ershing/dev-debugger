import DevDebugger from '../src/main'

test('use devDebug function to replace value', () => {
    var devDebug = new DevDebugger({ debug: true })
    var obj = {}
    var foo = function () { }
    expect(devDebug.debugVal(1, undefined)).toBe(undefined);
    expect(devDebug.debugVal(1, null)).toBe(null);
    expect(devDebug.debugVal(1, '')).toBe('');
    expect(devDebug.debugVal(1, 2)).toBe(2);
    expect(devDebug.debugVal(1, '2')).toBe('2');
    expect(devDebug.debugVal(1, obj)).toBe(obj);
    expect(devDebug.debugVal(1, foo)).toBe(foo);
    expect(devDebug.debugVal(undefined, 1)).toBe(1);
    expect(devDebug.debugVal(null, 1)).toBe(1);
    expect(devDebug.debugVal('', 1)).toBe(1);
    expect(devDebug.debugVal('2', 1)).toBe(1);
    expect(devDebug.debugVal(obj, 1)).toBe(1);
    expect(devDebug.debugVal(foo, 1)).toBe(1);
    expect(devDebug.debugVal(foo, obj)).toBe(obj);
})


test('need cases and caseName to use debugCaseTag', () => {
    expect(() => {
        var devDebug = new DevDebugger({ debug: true })
        return devDebug.debugCaseTag(1, 'tag1')
    }).toThrowError();

    expect(() => {
        var devDebug = new DevDebugger({ debug: true, caseName: 'debugCase1' })
        return devDebug.debugCaseTag(1, 'tag1')
    }).toThrowError();

    expect(() => {
        var devDebug = new DevDebugger({ debug: true, cases: {} })
        return devDebug.debugCaseTag(1, 'tag1')
    }).toThrowError();

    expect(() => {
        var devDebug = new DevDebugger({ debug: true, caseName: 'debugCase1', cases: {} })
        return devDebug.debugCaseTag(1, 'tag1')
    }).toThrowError();


    expect(() => {
        var devDebug = new DevDebugger({ debug: true, caseName: 'debugCase1', cases: { 'debugCase1': {} } })
        return devDebug.debugCaseTag(1, 'tag1')
    }).toThrowError();

    expect(() => {
        var devDebug = new DevDebugger({ debug: true, caseName: 'debugCase1', cases: { 'debugCase2': { tag1: 2 } } })
        return devDebug.debugCaseTag(1, 'tag1')
    }).toThrowError();

    expect(() => {
        var devDebug = new DevDebugger({ debug: true, caseName: 'debugCase1', cases: { 'debugCase1': { tag2: 2 } } })
        return devDebug.debugCaseTag(1, 'tag1')
    }).toThrowError();

})


test('need cases and caseName to use debugCaseTag', () => {
    var obj = {}
    var foo = function () { }
    var devDebug1 = new DevDebugger({ debug: true, caseName: 'debugCase1', cases: { 'debugCase1': { tag1: 2 } } })
    var devDebug2 = new DevDebugger({ debug: true, caseName: 'debugCase1', cases: { 'debugCase1': { tag1: '2' } } })
    var devDebug3 = new DevDebugger({ debug: true, caseName: 'debugCase1', cases: { 'debugCase1': { tag1: undefined } } })
    var devDebug4 = new DevDebugger({ debug: true, caseName: 'debugCase1', cases: { 'debugCase1': { tag1: null } } })
    var devDebug5 = new DevDebugger({ debug: true, caseName: 'debugCase1', cases: { 'debugCase1': { tag1: '' } } })
    var devDebug6 = new DevDebugger({ debug: true, caseName: 'debugCase1', cases: { 'debugCase1': { tag1: obj } } })
    var devDebug7 = new DevDebugger({ debug: true, caseName: 'debugCase1', cases: { 'debugCase1': { tag1: foo } } })
    expect(devDebug1.debugCaseTag(1, 'tag1')).toBe(2)
    expect(devDebug2.debugCaseTag(1, 'tag1')).toBe('2')
    expect(devDebug3.debugCaseTag(1, 'tag1')).toBe(undefined)
    expect(devDebug4.debugCaseTag(1, 'tag1')).toBe(null)
    expect(devDebug5.debugCaseTag(1, 'tag1')).toBe('')
    expect(devDebug6.debugCaseTag(1, 'tag1')).toBe(obj)
    expect(devDebug7.debugCaseTag(1, 'tag1')).toBe(foo)
    expect(devDebug7.debugCaseTag(obj, 'tag1')).toBe(foo)
})

test('check the replace history', () => {
    var devDebug1 = new DevDebugger({ debug: true })
    var devDebug2 = new DevDebugger({ debug: true, hisLen: 20000 })
    for (let i = 0; i < 999999; i++) {
        devDebug1.debugVal(1, 2);
        devDebug2.debugVal(1, 2);
    }
    expect(devDebug1.debugHistory[0]).toEqual(expect.objectContaining({ debugVal: [1, 2] }))
    expect(devDebug1.debugHistory.length).toBe(10000)
    expect(devDebug2.debugHistory.length).toBe(20000)
})