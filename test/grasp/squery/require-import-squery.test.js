import test from 'ava'
import grasp from 'grasp'
import _ from 'lodash'
import path from 'path'

const reqCode = `var Abe = require('abe')`
const log = console.log

let processed = grasp.replace('squery', 'call[callee=#require]', (getRaw, node, query) => {
  let req = query('.args')[0]
  let importCode = 'import ' + _.camelCase(path.basename(req.value, '.js')) + ' from ' + getRaw(req)
  log('import code', importCode)
  return importCode
}, reqCode)

test('replace require with import', t => {
  log('code y', processed)
  t.is(processed, `var Abe = import abe from 'abe'`)
})
