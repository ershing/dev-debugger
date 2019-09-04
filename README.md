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

let dbg = new DevDebugger({ debug: true }) //if you don't want to test the data,set debug false
let _r = dbg.debugVal.bind(dbg)

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

let dbg = new DevDebugger({ 
        debug: true,
        caseName: 'testInit',  //you need to tell what case to debug
        cases: {  //cases include
            'testInit': {
                'baseData': 100  //supply value to the tag you name
            },
            'testEnd': {
                'baseData': 0
            }
        }
    })
let _rt = dbg.debugCaseTag.bind(dbg)

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
let history = dbg.debugHistory
```


## Build with babel plugin
if you want to remove the 'dev-debugger' code in production mode, you can use the babel plugin [babel-plugin-dev-debugger](https://github.com/ershing/babel-plugin-dev-debugger)

### install plugin
```bash
npm i babel-plugin-dev-debugger -D
```

### plugin usage
you can modify your file babel.config.js just like this
```js
module.exports =  {
  "plugins": process.env.NODE_ENV === "production" ? ["babel-plugin-dev-debugger"] : []
}
```

### notice
if you want to use the plugin, use the package 'dev-debugger' in single file and don't pass methods of the instance to other variables

