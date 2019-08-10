# dev-debugger
if you want to debug the code and don't want to change the real data, you would like to use the test data.  
it's a simple function to replace the real data with your test data in the development mode.


## Install

### Command-line executable

```bash
npm i dev-debugger -S
```

## Usage

### Data replace
```js
import DevDebugger from 'dev-debugger'

//if you rely on the enviroment, you can do it like this
let debug = process.env.NODE_ENV === "development" 

let devDebugger = new DevDebugger({ debug })
let _r = devDebugger.debugVal.bind(devDebugger)

/*
...some code

the real value of data is 1, the test value is 100 when debug is true
*/
var data = _r(1, 100)

/*
...do thing with data
*/
```

### Data replace By Tag
```js
import DevDebugger from 'dev-debugger'

//if you rely on the enviroment, you can do it like this
let debug = process.env.NODE_ENV === "development" 

let devDebugger = new DevDebugger({ 
        debug,
        caseName: 'testInit',  //you need to tell what case to debug
        cases: {  //case names
            'testInit': {
                'baseData': 100  //supply value to the tag you name
            },
            'testEnd': {
                'baseData': 0
            }
        }
    })
let _rt = devDebugger.debugCaseTag.bind(devDebugger)

/*
...some code

the real value of data is 1, the test value is 100 in case testInt and 0 in case testEnd 
*/
var data = _rt(1, 'baseData')

/*
...do thing with data
*/
```

### Get the replace history
```js
let history = devDebugger.debugHistory
```

## Build with babel plugin
if you don't want to remove the 'dev-debugger' code, you can use the babel plugin babel-plugin-dev-debugger

### install plugin
```bash
npm i babel-plugin-dev-debugger -D
```

### plugin usage
you can change your file babel.config.js just like this
```js
module.exports =  {
  "plugins": process.env.NODE_ENV === "production" ? ["babel-plugin-dev-debugger"] : []
}
```

### notice
use function debugVal or debugCaseTag just like the demo to avoid errors

